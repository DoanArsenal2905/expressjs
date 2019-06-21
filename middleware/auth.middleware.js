module.exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login')
    }

    let user = db.get('users').find({ id: req.signedCookies.userId }).value()

    if (!user) {
        res.redirect('/auth/login')
    }

    res.locals.user = user

    next()
}