const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
            name:{
                type : String,
                required : true,
            },
            email:{
                type : String,
                required : true,
                unique: [true, "Account already exists"],
            },
            password:{
                type : String,
                required: [true, "Please enter your Password"],
                minLength: [6, "Your password must be at least 6 characters long"],
            },
            profileImage : {
                type : String
            }
        });

const User = mongoose.models.User || mongoose.model("User",userSchema);
module.exports = User;
