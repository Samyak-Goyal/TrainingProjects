const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const auth = require("./auth");

router.get("/",  async (req, res) => {
    const userService = new UserService();
    const result = await userService.getUser();
    res.send(result);
})

router.post("/",async (req, res) => {
    const userService = new UserService();
    const result = await userService.setUser(req.body);
    res.send(result)
})

router.post("/edit/:id", async (req, res) => {
    const userService = new UserService();
    const result = await userService.editUser(req.params.id, req.body);
    res.send(result)
})

router.get("/:id", async (req, res) => {
    const userService = new UserService();
    const result = await userService.getUserById(req.params.id);
    res.send(result);
})


router.post("/login", async (req, res) => {
    const userService = new UserService();
    const result = await userService.loginUser(req.body.email, req.body.password);
    res.send(result)
})


router.delete("/:id",  async (req, res) => {
    const userService = new UserService();
    const result = await userService.removeUser(req.params.id);
    res.send(result)
})


module.exports = router;