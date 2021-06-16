const authMiddleware = (req, res, next) => {
  if (req.session.user_id) {
    next()
  } else {
    let notif = `Mohon login terlebih dahulu`
    res.redirect(`/login?notif=${notif}`)
  }
}

module.exports = authMiddleware
