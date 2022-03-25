const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
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
