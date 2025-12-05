var app = require('express')() ;
var http = require('http').createServer(app) ;
var io = require('socket.io')(http,{
     cors: { origin: "*" } 
}) ;

io.on('connection', (socket) => {
    console.log('a user Online  ') ;
    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data) ;
    })
}) 
var server_port = process.env.YOURPORT || process.env.PORT || 5000 ;
http.listen(server_port, () => {
    console.log("Start on :" + server_port) ;
}) 
