// Include modules
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

// Setting database connection
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  const data = require('./restaurant.json')

  data.results.forEach(element => {
    delete element.id
    Restaurant.create(element)
  });

  console.log('done')
})
