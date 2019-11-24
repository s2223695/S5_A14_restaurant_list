// Include modules
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id }, (err, restaurants) => {
    if (err) return console.log(err)
    res.render('index', { restaurants })
  })
})

router.get('/search', authenticated, (req, res) => {
  let keyword = req.query.keyword
  let sortType = req.query.sort

  if (keyword === undefined) {
    keyword = ''
  }
  if (sortType === undefined) {
    sortType = 'name'
  }

  let sort = {}
  sort[sortType] = 'asc'

  Restaurant.find({ userId: req.user._id })
    .sort(sort)
    .exec((err, restaurants) => {
      if (err) console.log(err)
      const filteredRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: filteredRestaurants, keyword })
    })
})

module.exports = router