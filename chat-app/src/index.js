const express = require('express');
const http = require('http');
const path = require('path');
const app = express()
const socketio = require('socket.io');

const server = http.createServer(app)
const io = socketio(server)
const publicDirPath = path.join(__dirname, '../public')

const port = process.env.PORT || 3000

app.use(express.static(publicDirPath))

// app.get('',(req,res)=>{
//     res.render('index')
// })
let count = 0
// connecting our web socket to the server side
// socket is an object that contains information  about our the new connection
io.on('connection', (socket)=>{
    console.log('new websocket connection')
    // sending data from the server to the client
    // it takes in an event parameter to emit the data from the server to the client
    socket.emit('message', 'welcome')

    socket.broadcast.emit('message', 'A new user has joined') // emmit a message to new users
    
    // recieving data from the client side
    socket.on('messageSent',(msg)=>{
        // send data to all users connected to a server
        io.emit('message', msg)
    })

    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left!')
    })
})


server.listen(port, ()=>{
    console.log('Server is up on port '+ port);
})