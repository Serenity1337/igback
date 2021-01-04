const mongoose = require('mongoose')

const uri = require('./config/keys_dev')

const connectDB = async () => {
  await mongoose
    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((response) => {
      console.log('its running!')
    })
    .catch((err) => console.log(err))
}

module.exports = connectDB
