const jwt = require("jsonwebtoken");
//require("dotenv").config();
const expressjwt = require("express-jwt"); // for protected routes
const User = require("../models/user");

const _ = require("lodash");
const { sendEmail } = require("../helper/index");
// load env
// const dotenv = require("dotenv");
// dotenv.config();

const mailjet = require('node-mailjet');
const clientUrl=  'http://localhost:3000'
const serverUrl = 'http://localhost:3500'
// const { clientUrl, serverUrl } = require("../../client/src/variables");

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: "Email is taken!"
        });
    console.log(req.body);
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup success! Please login." });
};

exports.signin = async (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    await User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist. Please signup."
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }
        // generate a token with user id and secret
        // const token = jwt.sign({ _id: user._id  }, process.env.JWT_SECRET);
        const token = jwt.sign({ _id: user._id, role: user.role }, "secret");
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        // const { _id, name, email } = user;
        // return res.json({ token, user: { _id, email, name } });
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success!" });
};

exports.requireSignin = expressjwt({
    //only when sign in access the post routes
    secret: "secret",
    userProperty: "auth"
});
// if user is signed in, it checks the secret key and token,so this should match with our requireSignin function



//Password reset
exports.forgotPassword = (req, res) => {
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
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
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
};


exports.socialLogin = (req, res) => {
    // try signup by finding user with req.email
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
            return res.json({ token, user: { _id, name, email } });
        }
    });
};