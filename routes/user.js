// Include modules
const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => [
  res.send('register')
])

router.get('/logout', (res, req) => {
  res.send('logout')
})

module.exports = router