const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = mongoose.Schema({
        first_name : {
            type : String,
            required : true,
            trim : true
        },
        last_name : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        phone : {
            type : Number,
            required : true,
            trim : true,
            unique : true
        },
        encry_password : {
            type : String,
            required : true 
        },
        salt : String,
        role: {
            type: Number,
            default: 0
        },
        address : {
            type : String,
            required : true,
            trim : true
        },
        sells : {
            type : Array,
            default : []
        },
        purchases : {
            type : Array,
            default : []
        }
    }, 
    { timestamps : true}
);

userSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securepassword(password);
    })
    .get(function() {
        return this._password
    })

userSchema.methods = {

    authentication : function(simplepassword) {
        return this.securepassword(simplepassword) === this.encry_password
    },

    securepassword : function(simplepassword) {
        if(!simplepassword) return "";
        try {
            return crypto.createHmac("sha256", this.salt)
            .update(simplepassword)
            .digest("hex");
        } catch (err) {
            return "";
        }
    }
}


module.exports = mongoose.model("User", userSchema);