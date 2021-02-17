const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({    
    name : {
        type : String, 
        required : true,
        trim : true 
    },
 
    email : {
        type : String,
        unique : true,
        required : true,
    },

    password : {
        type : String,
        required : true,              
    },

    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
},
{
    timestamps : true
})

userSchema.statics.buildUser = async function(name, email, password) {
    const user = await User.findOne({email});

    if(!user){
        throw new Error("Unable to login");
    }
    return user;
}

userSchema.methods.generateJWTToken = async function(){
    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token});
}

const User = mongoose.model('User', userSchema);

module.exports = User;