const MongoClient = require('mongodb').MongoClient
const { database_uri, database_name } = require('./config')
let db
let mongoClient

module.exports = {
  connect: (db_name = database_name) =>
    new Promise((resolve, reject) => {
      MongoClient.connect(
        database_uri,
        { useNewUrlParser: true },
        (err, client) => {
          if (err) return reject(err)
          mongoClient = client
          db = client.db(db_name)
          return resolve(db)
        }
      )
    }),
  disconnect: () =>
    new Promise((resolve, reject) => {
      mongoClient.close((err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    }),
  clean: () =>
    new Promise((resolve, reject) => {
      db.dropDatabase((err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    }),
  db: () => Promise.resolve(db),
  client: () => Promise.resolve(mongoClient)
}
