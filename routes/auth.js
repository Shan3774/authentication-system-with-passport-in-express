const express = require('express')
const passport = require('passport')
const router = express.Router();

const {
    getHomePage,
    getRegister,
    register,
    getLogin,
    login,
    logOut,
    checkAuthenticated,
    checkNotAuthenticated,
    getUserByEmail, 
    getUserById
  } = require('../controllers/auth')


const initializePassport = require('../passport-config');
initializePassport(passport, getUserByEmail, getUserById)

require('../pass-google')//change the path



//handle sub routes of /auth for local passport
router.get('/', checkAuthenticated, getHomePage)

router.get('/register',checkNotAuthenticated, getRegister)
router.post('/register', register)

router.get('/login',checkNotAuthenticated, getLogin)
router.post('/login', login)

router.delete('/login', checkAuthenticated, logOut)

//handle for google passport
function isLoggedIn(req, res, next){
  req.user ? next() : res.sendStatus(401)
}


// router.get('/', (req, res) => {
//   res.send('')
// })

router.get('/google', 
  passport.authenticate('google', {scope: ['email', 'profile']})
  //scope refers to what kind of info we are looking for about the user
)

router.get('/google/callback', 
  passport.authenticate('google', {
       successRedirect: '/auth',
       failureRedirect: '/auth/failure'
  })
)

router.get('/failure', (req, res) => {
  res.send('something went wrong')
})

// router.get('/', isLoggedIn, (req, res) => {
//   res.send(`<p>Hello ${req.user.displayName}</p><a href="/logout">LogOut</a>`)
//   // console.log(req.user)
// })

router.get('/logout', (req, res)=> {
  req.logout(function(err) {
      if (err) { return next(err); }
      else{
          res.redirect('/')
      }
  })
})

module.exports = router;