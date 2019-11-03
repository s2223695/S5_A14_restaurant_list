// Include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// Include data
const restList = require('./restaurant.json')

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

app.get('/restaurants/:rest_id', (req, res) => {
  const restaurant = restList.results.find(item => item.id.toString() === req.params.rest_id)
  res.render('show', { restaurant: restaurant })
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

