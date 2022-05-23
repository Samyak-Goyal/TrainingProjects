const mongoose = require("mongoose");
const { obj } = require("../models/User");
const UserSchema = require("../models/User");

const User = mongoose.model("User", UserSchema); //getting the collection out of the database (capstone)

class UserService {


    async setUser(user) {

        if (user["_id"] !== undefined) {
            return await User.updateOne({ "_id": user["_id"] }, { $set: user })
        }
        else {
            const userObj = new User(user);
            userObj.setPassword(user.password);
            const result = await userObj.save();
            result["salt"] = "";
            result["hash"] = "";
            return result;
        }

    }

    async getUser() {
        return await User.find({ isDel: false }).select(["-salt", "-hash"])
    }

    async getUserById(id) {
        return await User.findOne({ "_id": id }).select(["-salt", "-hash"])
    }

    async removeUser(_id) {
        return await User.updateOne({ "_id": _id }, { $set: { isDel: true } })
    }

    async editUser(_id, user) {
        return await User.updateOne({ "_id": _id }, { $set: user })
    }

    async loginUser(email, password) {
        const result = await User.find({ "email": email });
        if (result) {
            if (result.length > 0) {
                const user = result[0];

                if (user.validatePassword(password)) {
                    // SUCCESS
                    user["hash"] = "";
                    user["salt"] = "";


                    const objUser = user.toObject();

                    objUser.token = user.generateToken();
                    return objUser;
                }
                else {
                    // FAILURE
                    return;
                }
            }
        }
    }


}


module.exports = UserService;