const express = require('express')
const router = express.Router();

const passport = require('passport')

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


//handle sub routes of /auth
router.get('/',checkAuthenticated, getHomePage)

router.get('/register',checkNotAuthenticated, getRegister)
router.post('/register', register)

router.get('/login',checkNotAuthenticated, getLogin)
router.post('/login', login)

router.delete('/login', checkAuthenticated, logOut)


module.exports = router;