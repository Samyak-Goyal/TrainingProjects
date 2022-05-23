const express = require ('express')
const router = express.Router();
const postController = require('../controller/PostController');


router.use("/auth", require("./auth"))
router.use("/message", require("./messages"))
router.use('/post', require('./post'))

router.get("/", (req, res)=>{
    res.send("<h1>Welcome to the portal</h1>")
})


module.exports = router