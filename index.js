const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')

const authMiddleware = require('./middleware/auth.middleware')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('a65sf36ba5b'))

app.use(express.static('public'))

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)
app.use('/products', productRoute)

//view home page
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Doan'
    })
})

app.listen(3000, () => {
    console.log(`Project is running on port 3000...`)
})
