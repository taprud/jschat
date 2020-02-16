module.exports = {
  checkAuth: function(req, res, next) {
    if(req.isAuthenticated()) {
      res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      return next();
    }

    req.flash('error', 'You need to login first.');
    res.redirect('/login');
  },
  checkNoAuth: function(req, res, next){
    if(!req.isAuthenticated())
      return next();

    res.redirect('/chat');
  }
}