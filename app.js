// Include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

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

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting body parser
app.use(bodyParser.urlencoded({ extended: true }))

// Define server variables
const port = 3000

// Setting static files
app.use(express.static('public'))

// Setting routes
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err)
    res.render('index', { restaurants })
  })
})

app.get('/restaurants', (req, res) => {
  res.redirect('/')
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants/new', (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save(err => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    res.render('show', { restaurant })
  })
})

app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    res.render('edit', { restaurant })
  })
})

app.post('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    Object.assign(restaurant, req.body)
    restaurant.save(err => {
      if (err) return console.log(err)
      res.redirect(`/restaurants/${restaurant.id}`)
    })
  })
})

app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find((err, restaurants) => {
    if (err) console.log(err)
    const filteredRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase()))

    res.render('index', { restaurants: filteredRestaurants, keyword })
  })
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

