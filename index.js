const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const graphQLSchema = require('./graphql/schema/index')

const graphQLResolvers = require('./graphql/resolvers/index')

const isAuth = require('./middleware/auth')
const app = express()
const connectDB = require('./Connection')
app.use(bodyParser.json())

app.use(isAuth)

app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images/postpics')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images/avatars')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage }).single('file')

const upload2 = multer({ storage: storage2 }).single('file')

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})

app.post('/upload2', function (req, res) {
  upload2(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
  })
)
const PORT = process.env.PORT || 8000
mongoose
  .connect('mongodb://localhost:27017/instagramDB', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT} `)
    })
  })
  .catch((err) => {
    console.log(err)
  })
connectDB()
