const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");



app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const uri = "mongodb+srv://daksh:daksh%402001@cluster0.hphbc.mongodb.net/user-interaction?retryWrites=true&w=majority"

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

app.use('/', require('./routes/routes'))



// app.get('/', (req,res)=>{
//     res.send("<h1>Hello there</h1>")
// })

const server=app.listen(3500, (e) => {
    console.log("Server listening at 3500")
    const connectionParams = {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    }

    mongoose.connect(uri, connectionParams)
        .then(() => {
            console.log('Connected to the database ')
        })
        .catch((err) => {
            console.error(`Error connecting to the database. ${err}`);
        })
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });  