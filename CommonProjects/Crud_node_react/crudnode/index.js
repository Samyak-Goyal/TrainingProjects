const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user", require("./routes/user"))

app.get("/", (req, res) => {
    res.send("<h1>Welcome to capstone project</h1>")
})

app.listen(3001, (e) => {
    console.log("connected")

    mongoose.connect("mongodb://localhost/capstone").then((result) => {
        console.log("Database Connected")
    }).catch((e) => {
        console.log("databse connection failed")
        console.log(e)
    })
})