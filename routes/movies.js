const router = require('express').Router()
const request = require('request')
const API_KEY = require('../config').API_KEY

router.get('/movies', async (req, res) => {
  const db = await require('../db').db()
  const query = {}
  if (req.query.title) query.Title = req.query.title
  db.collection('movies')
    .find(query)
    .toArray((err, doc) => {
      if (err) return res.status(400).json({ success: true, message: err })
      return res.status(200).json({ success: true, message: doc })
    })
})

router.post('/movies', (req, res) => {
  if (!req.body.title)
    return res
      .status(400)
      .json({ success: false, message: 'No title provided' })
  request.get(
    {
      url: `http://www.omdbapi.com/?apikey=${API_KEY}&t=${req.body.title}`,
      json: true
    },
    async (err, response, body) => {
      if (err || response.statusCode != 200)
        return res
          .status(response.statusCode)
          .json({ success: false, message: err })
      if (body.Response != 'True')
        return res
          .status(400)
          .json({ success: false, message: 'Movie not found' })
      const { Response, ...newMovie } = body
      const db = await require('../db').db()
      db.collection('movies').findOneAndUpdate(
        { imdbID: newMovie.imdbID },
        { $set: newMovie },
        { upsert: true, returnOriginal: false },
        (err, doc) => {
          if (err) return res.status(400).json({ success: false, message: err })
          return res.status(201).json({ success: true, message: doc.value })
        }
      )
    }
  )
})

module.exports = router
