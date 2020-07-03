const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { ADMIN_PASSWORD, DataResponse } = require('../config');


const userIsLoggedIn = (req, res, next) => {

  console.log('::: checking if user is logged in', req.user)

  if (req.user) {
    next();
  } else {
    res.send( new DataResponse(
      success=false,
      data=null,
      message='Forbidden',
      error='Forbidden'
    ) )
  }
}

passport.use(new LocalStrategy( (username, password, done) => {
  if (!username || password !== ADMIN_PASSWORD) return done('Invalid credentials', null);

  let adminUser = { id: 0, username }
  return done(null, adminUser);
}));


passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  let adminUser = { id, username: 'admin' }
  done(null, adminUser);
});



module.exports = { passport, userIsLoggedIn }