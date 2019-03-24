const router = require('express').Router()
const { ObjectId } = require('mongodb')

router.get('/comments', async (req, res) => {
  const db = await require('../db').db()
  const query = {}
  if (req.query.movie_id) query.movie_id = req.query.movie_id
  db.collection('comments')
    .find(query)
    .toArray((err, comments) => {
      if (err) return res.status(400).json({ success: false, message: err })
      return res.status(200).json({ success: true, message: comments })
    })
})

router.post('/comments', async (req, res) => {
  if (!req.body.movie_id)
    return res
      .status(400)
      .json({ success: false, message: 'No movie id provided' })
  if (!req.body.body)
    return res
      .status(400)
      .json({ success: false, message: 'No comment body provided' })
  if (!ObjectId.isValid(req.body.movie_id))
    return res
      .status(400)
      .json({ success: false, message: 'Invalid movie id provided' })
  const db = await require('../db').db()
  db.collection('movies').findOne(ObjectId(req.body.movie_id), (err, doc) => {
    if (err) return res.status(400).json({ success: false, message: err })
    if (!doc)
      return res
        .status(400)
        .json({ success: false, message: 'Movie not found' })
    db.collection('comments').insertOne(
      { movie_id: req.body.movie_id, body: req.body.body },
      (err, doc) => {
        if (err) return res.status(400).json({ success: false, message: err })
        return res.status(201).json({ success: true, message: doc.ops[0] })
      }
    )
  })
})

module.exports = router
