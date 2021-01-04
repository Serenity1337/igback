const router = require('express').Router()
const userController = require('../User/userController')
const queryController = require('../Query/queryController')
const middleware = require('../middleware/middleware')
const multer = require('multer')

router.get('/', (req, res) => {
  res.json('Api is working')
})

//file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadedFiles/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})
const upload = multer({
  storage: storage,
})

// user routes
router.post('/user/register', userController.registerUser)
router.post('/user/login', userController.login)
router.get(`/user/getSingleUser/:username`, userController.getSingleUser)
router.get(
  '/user/authenticate',
  middleware.authenticate,
  userController.getSingleUser
)
// query routes
router.post('/query/create', queryController.createQuery)
router.get('/query/getAll', queryController.getAll)
router.delete(`/query/:id/delete`, queryController.deleteQuery)
router.put('/query/edit/:id', queryController.edit)
module.exports = router
