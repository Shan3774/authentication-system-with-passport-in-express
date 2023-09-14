const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //NB: most length and content validate should be done at the front end
    userName: {
        type: String,
        unique: true, 
        required: true,
        minLength: 1,
        maxLength: 60
    },
    email: {
        type: String, 
        required: true,
        lowercase: true,
        minlength: 3,
        maxlength: 320
        //make entries lowerCase by default
    },
    password: {
        type: String,
        required: true,
        // minLength: 8
    },
    joinDate : {
        type: Date,
        default: () => new Date(),
        immutable: true
    },
    updatedOn : {
        type: Date,
        default: () => new Date(),
        immutable: true
    }
})

// update the updated on time on save 
// newsSchema.pre('save', function(next){
//     this.updatedOn = () => new Date();
//     console.log(`the date is updated`)
//     next();
// })

module.exports = mongoose.model("User", userSchema)