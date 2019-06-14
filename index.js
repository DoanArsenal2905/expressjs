const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user.route')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/users', userRoute)

//view home page
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Doan'
    })
})

app.listen(3000, () => {
    console.log(`Project is running on port 3000...`)
})
