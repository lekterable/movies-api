module.exports = {
  database_uri: process.env.MONGODB_URI || 'mongodb://localhost',
  database_name: process.env.MONGODB_DBNAME || 'netguru-movies',
  API_KEY: process.env.API_KEY
}
