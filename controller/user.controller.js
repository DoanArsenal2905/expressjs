const db = require('../db')
const shortid = require('shortid')

// view users page
module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

// search users
module.exports.search = (req, res) => {
    let q = req.query.q
    let matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index', {
        users: matchedUsers
    })
}

//create users
module.exports.create = (req, res) => {
    res.render('users/create')
} 
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate()
    let errors = []

    if (!req.body.name) {
        errors.push('Name is required!')
    }
    if (!req.body.phone) {
        errors.push('Phone is required!')
    }
    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        })
        return
    }

    db.get('users').push(req.body).write()
    res.redirect('/users')
}

// view users page
module.exports.get = (req, res) => {
    let id = req.params.id
    let user = db.get('users').find({ id: id }).value()
    res.render('users/view', {
        user: user
    })
}