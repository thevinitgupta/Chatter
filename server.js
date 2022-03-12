const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users = {};

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/static/index.html")
})

//checking for Socket connection
io.on('connection',(socket)=>{
    socket.on('new-user',(user)=>{
        console.log(user);
        users[socket.id] = user;
        socket.broadcast.emit('user-joined',users[socket.id]);
    })

    socket.on('new-message',(msg)=>{
        socket.broadcast.emit('display-message',{
            message : msg,
            name : users[socket.id]
        });
    })
})

server.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})