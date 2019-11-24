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
  const userInput = req.body
  let errors = []
  if (!userInput.name) {
    errors.push({ message: '請輸入名稱' })
  }
  if (isNaN(userInput.rating)) {
    errors.push({ message: '評分須為數字' })
  }

  if (errors.length > 0) {
    res.render('new', {
      errors,
      name: userInput.name,
      name_en: userInput.name_en,
      category: userInput.category,
      image: userInput.image,
      location: userInput.location,
      phone: userInput.phone,
      google_map: userInput.google_map,
      rating: userInput.rating,
      description: userInput.description
    })
  } else {
    const restaurant = new Restaurant(req.body)
    restaurant.userId = req.user._id
    restaurant.save(err => {
      if (err) return console.log(err)
      res.redirect('/')
    })
  }
})

router.get('/:id', (req, res) => {
  Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    res.render('show', { restaurant })
  })
})

router.get('/:id/edit', (req, res) => {
  Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    res.render('edit', { restaurant })
  })
})

router.put('/:id/edit', (req, res) => {
  const userInput = req.body
  userInput.id = req.params.id
  let errors = []
  if (!userInput.name) {
    errors.push({ message: '請輸入名稱' })
  }
  if (isNaN(userInput.rating)) {
    errors.push({ message: '評分須為數字' })
  }

  if (errors.length > 0) {
    res.render('edit', {
      errors,
      restaurant: userInput
    })
  } else {
    console.log(req.params.id)
    Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
      if (err) return console.log(err)
      Object.assign(restaurant, req.body)
      restaurant.save(err => {
        if (err) return console.log(err)
        res.redirect(`/restaurants/${restaurant.id}`)
      })
    })
  }
})

router.delete('/:id/delete', (req, res) => {
  Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })
})

module.exports = router