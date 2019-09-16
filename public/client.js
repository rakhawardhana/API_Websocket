var socket = new WebSocket('ws://localhost:2020/');
const messageInput = document.getElementById('message-input')


var log = function(text) {
  var h3 = document.createElement('h3');
  h3.innerHTML = text;
  document.getElementById('log').appendChild(h3);
}


socket.onopen = function(event) {
    // client first response after connection on from server
  log('Connection Start!');
  log('Client join connection');
}

socket.onerror = function(event) {
    // if connection error
  log('Error: ' + JSON.stringify(event));
}

socket.onmessage = function (event) {
    // render all message from server, 1. after client send a message, 2. as long as the connetion on.
  log(event.data);
}

socket.onclose = function(event) {
    // the response rendered after connection turn off from server (after client clicked close)
  log('Connection has stopped');
}

document.querySelector('#close').addEventListener('click', function(event) {
    // the response after client click close
  socket.close();
  log('Client Stop Connection');
});


document.querySelector('#send').addEventListener('click', function(event) {
    // API for input the message that have been written and sent by client
  const input = messageInput.value
  var json = JSON.stringify(input);
  socket.send(json);
  log('Client: ' + json);
});




window.addEventListener('beforeunload', function() {
  socket.close();
});