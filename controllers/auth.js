const passport = require('passport')
const bcrypt = require('bcrypt')

//importing data from dbHandler auth
const { createUserDb, getUserByEmailDb, getUserByIdDb } = require('../dbHandler/auth') 

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
    console.log(userName, password)
    const hashedPassword = await bcrypt.hash(password, 10);
   
    // res.status(200).json({success: true, data: await createUserDb(userName, email, hashedPassword)})
    await createUserDb(userName, email, hashedPassword);    
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
        return await getUserByEmailDb(email)
    }
    catch(e){
        return e;
    }
    // users.find(user => user.email === email)
}); 

const getUserById = asyncHandler( async (id) => {
  try{
      return await getUserByIdDb(id);
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
