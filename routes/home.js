// Include modules
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err)
    res.render('index', { restaurants })
  })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find((err, restaurants) => {
    if (err) console.log(err)
    const filteredRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase()))

    res.render('index', { restaurants: filteredRestaurants, keyword })
  })
})

module.exports = router