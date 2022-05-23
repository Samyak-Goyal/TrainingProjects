const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    fullname: String,
    email: String,
    gender: String,
    phone: String,
    isDel: {
        type: Boolean,
        default: false
    },
    salt: String,
    hash: String
});

UserSchema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        fullname: this.fullname,
        email: this.email
    }, "ABCD")
}



UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 1000, "sha512").toString("hex");
}

UserSchema.methods.validatePassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 1000, "sha512").toString("hex");
    return this.hash === hash;
}


module.exports = UserSchema;