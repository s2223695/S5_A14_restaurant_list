// Include modules
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

router.use(authenticated)

router.get('/', (req, res) => {
  res.redirect('/')
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save(err => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    res.render('show', { restaurant })
  })
})

router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    res.render('edit', { restaurant })
  })
})

router.put('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    Object.assign(restaurant, req.body)
    restaurant.save(err => {
      if (err) return console.log(err)
      res.redirect(`/restaurants/${restaurant.id}`)
    })
  })
})

router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })
})

module.exports = router