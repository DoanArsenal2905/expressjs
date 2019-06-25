const User = require('../models/user.model')
const shortid = require('shortid')

// view users page
module.exports.index = async (req, res) => {
    let users = await User.find()
    res.render('users/index', {
        users: users
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

// create users
module.exports.create = (req, res) => {
    res.render('users/create')
} 
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate()
    req.body.avatar = req.file.path.split('\\').slice(1).join('/')

    db.get('users').push(req.body).write()
    res.redirect('/users')
}

// view users info
module.exports.get = async (req, res) => {
    let users = await User.find()
    res.render('users/view', {
      users: users
    })
}