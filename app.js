'use strict'

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();


const http = require('http').Server(app);
const io = require('socket.io')(http);

let manNum = 0;


app.use(express.static(path.join(__dirname, 'public')))
// app.use(cors());


app.get('/', function(req, res){
  res.send('hello ');
})

io.on('connection', function(socket){
  console.log('a user connected')
  manNum++;
  io.emit('manNum', manNum);

  socket.on('roomMass', function(data){
    console.log(data);
    io.emit('roomMass', data);
  })

  socket.on('disconnect', function(){
    console.log('disconnection');
    manNum--;
    io.emit('manNum', manNum);
  })
})





// app.use()
http.listen(80, function(){
  console.log('listening on *:3000');
});
