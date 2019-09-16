var http = require('http');
var express = require('express');
var WSS = require('ws').Server;


var app = express().use(express.static('public'));
var server = http.createServer(app);
server.listen(2019, '127.0.0.1');


var wss = new WSS({ port: 2020 });

wss.on('connection', function(socket) {
  //connection on

  var json = JSON.stringify('Server: Dear Client, Text the Message please! Click Stop when you want to end this conversation.');
  socket.send(json);
  //send json variabel to client, after connection on

  socket.on('message', function(message) {
    // send json string to client, after client send a message

    wss.clients.forEach(function each(client) {
      var json = JSON.stringify('Server: You have just send a message' );
      client.send(json);
      //s
    });
  });

  socket.on('close', function() {
    // connection closed 
  });

});

var broadcast = function() {
    // send json string as long as the connection turn on
  var json = JSON.stringify('In connection!');

  wss.clients.forEach(function each(client) {
    client.send(json);
    
  });
}


setInterval(broadcast, 3000);
