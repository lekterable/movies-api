const app = require('./app')
const db = require('./db')

db.connect()
  .then(() =>
    app.listen(process.env.PORT || 3000, () => {
      console.log('server is running on port 3000')
    })
  )
  .catch(err => console.error(err))
