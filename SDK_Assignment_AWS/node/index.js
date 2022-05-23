const express = require("express")
const app = express()

const helmet = require("helmet") 
const cors = require("cors")

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use(helmet())
app.use(cors())

app.use("/ec2", require("./Routes/ec2"))
app.use("/s3", require("./Routes/s3"))

app.get("/", (req, res) => { 
    res.send("<h1>Home</h1>")
})

app.listen(3030, () => {
    console.log("Started the server")
})