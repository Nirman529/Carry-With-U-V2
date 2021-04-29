const User = require("../models/user");
const { check , validationResult } = require("express-validator");
const jwt =  require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err : "not saved"
            });
        }
        res.json({
            first_name : user.first_name,
            last_name : user.last_name,
            phone : user.phone,
            email : user.email,
            address : user.address,
            id : user._id,
            role : user.role
        });
    });
};

exports.signin = (req, res) => {

    const { email ,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }
    //const user = new User(req.body);    
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User does not exist"
            })
        }
        
        if(!user.authentication(password)) {
            return res.status(401).json({
                error : "Invalid login details in password"
            });
        }

        const token = jwt.sign({_id : user._id}, process.env.SECRETKEY);

        res.cookie("token", token, {expire : new Date() + 9999});

        const { _id, first_name, last_name,email,address, phone, role} = user;   
        return res.json({ token, user : { _id, first_name,address,  last_name, email, phone, role} });
    })
}


exports.signout = (req, res) => {
    res.clearCookie("token")
    res.send("sign out");
};

//protected routes

exports.isSignedIn =  expressJwt({
    secret : process.env.SECRETKEY,
    userProperty :  "auth"
});


//middlewares

exports.isAuthenticated = (req, res, next) => {
    let cheker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!cheker) {
        return res.status(403).json({
            error : "Access denied"
        }); 
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role===0) {
        return res.status(403).json({
            error : "You are not an admin so access denied"
        }); 
    }
    next();
};
