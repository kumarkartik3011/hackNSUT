const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const server = http.createServer(app)
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});
require('colors');
dotenv.config({path: './.env'})

const connectDb = require('./config/db')

const chats = require('./data/data')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

connectDb()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT}`.yellow.inverse);
})


io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    });

    socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  })
})