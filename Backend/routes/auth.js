const express = require("express");
const router = express.Router();
const { signout , signup , signin, isSignedIn} = require("../controllers/auth");
const { check , validationResult } = require("express-validator");

router.get("/signout", signout);

router.post("/signup",[
    check("email", "email is required").isEmail(),
    check("password", "password shuld be contains atleast 3 char").isLength({min : 3})
], signup);

router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password", "password shuld be contains atleast 3 char").isLength({min : 3})
], signin);

router.get("/testauth", isSignedIn, (req, res) => {
    res.send("auth part");
})

module.exports = router;