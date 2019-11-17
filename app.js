// Include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

// Setting database connection
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// Import models
const Restaurant = require('./models/restaurant')

// Include data
const restList = require('./models/seeds/restaurant.json')

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Define server variables
const port = 3000

// Setting static files
app.use(express.static('public'))

// Setting routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restList.results })
})

app.get('/restaurants', (req, res) => {
  res.redirect('/')
})

app.get('/restaurants/new', (req, res) => {
  res.send('page for add new restaurant')
})

app.post('/restaurants/new', (req, res) => {
  res.send('add new restaurant')
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restList.results.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.get('/restaurants/:id/edit', (req, res) => {
  res.send('page for edit a restaurant')
})

app.post('/restaurants/:id/edit', (req, res) => {
  res.send('edit a restaurant')
})

app.post('/restaurants/:id/delete', (req, res) => {
  res.send('delete a restaurant')
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restList.results.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase()))

  res.render('index', { restaurants: restaurants, keyword: keyword })
})



// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
