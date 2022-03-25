const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
require('colors');

const connectDb = require('./config/db')
dotenv.config({path: './.env'})

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
