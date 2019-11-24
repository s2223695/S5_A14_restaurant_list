// Include modules
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')

// Setting database connection
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  const users = require('./user.json').results
  const restaurants = require('./restaurant.json').results

  users.forEach(user => {
    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(users[i].password, salt, (err, hash) => {
    //     const newUser = new User({
    //       name: users[i].name,
    //       email: users[i].email,
    //       password: hash
    //     })
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password
    })
    newUser.save().then(user => {
      // create restaurant data for each user
      const userRestaurants = restaurants.splice(0, 3)
      userRestaurants.forEach(restaurant => {
        Restaurant.create({
          name: restaurant.name,
          name_en: restaurant.name_en,
          category: restaurant.category,
          image: restaurant.image,
          location: restaurant.location,
          phone: restaurant.phone,
          google_map: restaurant.google_map,
          rating: restaurant.rating,
          description: restaurant.description,
          userId: user._id
        })
      })
    }).catch(err => {
      console.log(err)
    })
    //     })
    //   })
    // })

    console.log('done')
  })
})
