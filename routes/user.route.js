const express = require('express')
const multer = require('multer')

const controller = require('../controller/user.controller')
const validate = require('../validate/user.validate')
const authMiddleware = require('../middleware/auth.middleware')

const upload = multer({ dest: './public/uploads/' })

const router = express.Router()

router.get('/', authMiddleware.requireAuth, controller.index)

router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345)
    res.send('Hello')
})

router.get('/search', controller.search)

router.get('/create', controller.create)

router.post('/create', 
    upload.single('avatar'), 
    validate.postCreate, 
    controller.postCreate
)

router.get('/:id', controller.get)

module.exports = router