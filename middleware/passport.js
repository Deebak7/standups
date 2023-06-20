const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth2').Strategy;
const facebookStrategy=require('passport-facebook').Strategy;

// passport.serializeUser(function(user,done){
//   done(null,user);
// })

// passport.deserializeUser(function(user,done){
//   done(null,user);
// })

passport.use(new GoogleStrategy({
  clientID:CONFIG.google_client_id,
  clientSecret:CONFIG.google_client_secret,
  callbackURL:CONFIG.google_callback_url,
  passReqToCallback:true,
  scope:['profile','email','https://www.googleapis.com/auth/calendar']
},function(request,accessToken,refreshToken,profile,done){
  console.log(profile)
  return done(null,profile)
}
))


passport.serializeUser(function(user,done){
  done(null,user);
})

passport.deserializeUser(function(id,done){
  return (null,id)
})

passport.use(new facebookStrategy({
  clientID:CONFIG.facebook_client_id,
  clientSecret:CONFIG.facebook_client_secret,
  callbackURL:CONFIG.facebook_callback_url,
  profileFields:['id','displayName','name','gender','picture.type(large)','email']
},function(request,accesstoken,refreshToken,profile,done){
  console.log(profile)
  return done(null,profile)
}
))



const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;
  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    if (jwt_payload) {
      return done(null, jwt_payload);
    } else {
      return done(null, false);
    }
  }));
}