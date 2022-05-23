const { addMessage, getMessages } = require("../controller/messageController");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("hello")
})
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;