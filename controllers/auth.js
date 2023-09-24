const passport = require('passport')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('../schemas/auth')

mongoose.connect("mongodb://localhost/unisecEthiopia");

const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)


//route middlewares
const getHomePage = (req, res) => {
  res.render("index.ejs");
};

const getRegister = (req, res) => {
  res.render("register.ejs");
};

const register = asyncHandler(async (req, res) => {
  try {
    const { userName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName: userName,
      email: email,
      password : password
    });

    res.redirect("/auth/login");

  } catch (e) {
    // res.status(404).json({success: false, message: e.message})
    res.redirect("/auth/register");
  }
});

const getLogin = (req, res) => {
  res.render("login.ejs");
};

const login = passport.authenticate("local", {
  successRedirect: "/auth",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

const logOut = (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
};


//session authentication middle wares
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/auth");
  } else {
    next();
  }
}

//data fetching middlewares for now -- to be linked to db
const getUserByEmail = asyncHandler( async (email) => {
    try{
        return await User.findOne().where('email').equals(email);
    }
    catch(e){
        return e;
    }
    // users.find(user => user.email === email)
}); 

const getUserById = asyncHandler( async (id) => {
  try{
      return await User.findOne().where('_id').equals(id);
  }
  catch(e){
      return e;
  }
  // users.find(user => user.email === email)
}); 
// const getUserbyId = id => users.find(user => user.id === id);

module.exports = {
  getHomePage,
  getRegister,
  register,
  getLogin,
  login,
  logOut,
  checkAuthenticated,
  checkNotAuthenticated,
  getUserByEmail, 
  getUserById,
};
