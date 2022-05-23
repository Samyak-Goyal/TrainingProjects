const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (request, response) => {
    response.send("<h2>Welcome to express demo</h2>")
})

app.get("/home", (req, res) => {
    let fullname = req.query.fullname
    res.send("<b>Home Page</b>" + fullname)
})

// app.get("/login/:email/:password", (req, res) => {
//     let email= req.params.email
//     let pwd= req.params.password
//     res.send("login " + email+" "+ pwd)
// })

app.get("/form",(req,res)=>{
    res.sendFile(__dirname + "/form.html")
})

app.post("/register",(req,res) =>{
    let first_name=req.body.first_name
    let email= req.body.email
    res.send("Welcome: <br> Name: "+first_name + "<br>" + "Email: "+email)
})
app.listen(3200, () => {
    console.log("Server Started")
})