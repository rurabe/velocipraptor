const passport = require('passport');
const Users = require('../models/users');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST+"auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      return done(null,Users.authorize(profile.id));
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, Users.authorize(id));
});


const Passport = {
  routes: function(app){
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/auth/google', passport.authenticate('google',{scope:['https://www.googleapis.com/auth/plus.login']}),function(req,res){});
    app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),function(req,res){ res.redirect('/') });
    app.post('/logout',function(req,res){req.logout(); res.redirect('/')})
  }
};

module.exports = Passport;