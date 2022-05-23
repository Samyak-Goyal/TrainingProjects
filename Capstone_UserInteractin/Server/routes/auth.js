const express = require("express");
// const { userById } = require("../controllers/user");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const router = express.Router();
const User = require("../models/user");

const _ = require("lodash");
const { sendEmail } = require("../helper/index");
// load env
// const dotenv = require("dotenv");
// dotenv.config();

const mailjet = require('node-mailjet');
const clientUrl = 'http://localhost:3000'
const serverUrl = 'http://localhost:3500'

// const {
//     signup,
//     signin,
//     signout,
//     forgotPassword,
//     resetPassword,
//     socialLogin
// } = require("../controller/auth");

// import password reset validator
const { userSignupValidator, passwordResetValidator } = require('../validator/index');

router.get("/", (req, res) => {
    res.send("hello")
})


router.get('/alluser/:id', async (req, res) => {

    const users = await User.find({ _id: {$ne: req.params.id} }).select([
        "email",
        "name",
        "photo",
        "_id",
    ]);
    return res.json(users);

}
)

// password forgot and reset routes
router.post("/forgot-password", (req, res) => {
    console.log(req.body);
    if (!req.body) return res.status(400).json({ message: "No request body" });
    if (!req.body.email)
        return res.status(400).json({ message: "No Email in request body" });

    console.log("forgot password finding user with that email");
    const { email } = req.body;
    console.log("signin req.body", email);

    // find the user based on email
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status("401").json({
                error: "User with that email does not exist!"
            });

        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id, iss: `${serverUrl}` },
            "mysecret"
        );

        //email data
        const emailData = {
            from: "noreply@userinteraction.com",
            to: email,
            Subject: "Password Reset Instructions",
            TextPart: `${clientUrl}/reset-password/${token}`,
            HTMLPart: `<p>Please use the following link to reset your password:</p> <p> ${clientUrl}/reset-password/${token}</p>`
        };



        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ message: err });
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
                });
            }
        });
    });
});
router.post("/reset-password", (req, res) => {
    passwordResetValidator
    const { resetPasswordLink, newPassword } = req.body;

    User.findOne({ resetPasswordLink }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status("401").json({
                error: "Invalid Link!"
            });

        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ""
        };

        user = _.extend(user, updatedFields);
        user.updated = Date.now();

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: "Password reset successful."
            });

        });
    });
});

// Login with google
router.post("/social-login", (req, res) => {
    let user = User.findOne({ email: req.body.email }, (err, user) => {

        if (err || !user) {
            // create a new user and login
            user = new User(req.body);
            req.profile = user;
            user.save();
            // generate a token with user id and secret
            const token = jwt.sign(
                { _id: user._id, iss: `${serverUrl}` },
                "mytokensecret"
            );

            console.log("Token : ", token);

            res.cookie("t", token, { expire: new Date() + 9999 });
            // return response with user and token to frontend client
            const { _id, name, email } = user;
            return res.json({ token, user: { _id, name, email } });
        }
        else {
            // update existing user with new social info and login
            req.profile = user;
            user = _.extend(user, req.body);
            user.updated = Date.now();
            user.save();
            // generate a token with user id and secret
            const token = jwt.sign(
                { _id: user._id, iss: `${serverUrl}` },
                "mysecrettoken"
            );
            res.cookie("t", token, { expire: new Date() + 9999 });
            // return response with user and token to frontend client
            const { _id, name, email } = user;
            return res.json({ token, user });
        }
    });
});

router.post("/signup", async (req, res) => {
    userSignupValidator
    // signup
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: "Email is taken!"
        });
    console.log(req.body);
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup success! Please login." });
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user._id)
    if (!user) {
        console.log("not found user")
        return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await user.authenticate(password)
    if (!isPasswordValid) {
        console.log("password invalid")
        return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    // delete user.password;
    const token = jwt.sign({ _id: user._id, role: user.role }, "secret");
    return res.json({ status: true, token, user });
});


router.get("/signout", (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success!" });
});

// any route containing :userId, our app will first execute userByID()
// router.param("userId", userById);

module.exports = router;