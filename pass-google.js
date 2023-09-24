const passport =require ('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = "436360998706-2vfn0hiq2d82tqkcqeigqk5opi6s141c.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID:   GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done (null, profile);
    }
));

passport.serializeUser(function(user, done){
    done(null , user)
})

passport.deserializeUser(function(user, done){
    done(null , user)
})