const mongoose = require('mongoose');
const User = require('../schemas/auth')

mongoose.connect("mongodb://localhost/unisecEthiopia");

const createUserDb = async (userName, email, password) => {
    const user = await User.create({
      userName: userName,
      email: email,
      password : password
    });
    console.log(user)
    return user;
};


const getUserByEmailDb = async (email) => {
    const user = await User.findOne().where('email').equals(email);
    return user;
}

const getUserByIdDb = async (id) => {
    const user = await User.findOne().where('_id').equals(id)
}
// createUserDb("Abebe", "abe@kebe", "54321");

module.exports = {createUserDb, getUserByEmailDb, getUserByIdDb}