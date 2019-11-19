const http = require('http');
const app = require('./app');


//const port = process.env.PORT || 3000;

//const server = http.createServer(app);
//server.listen(port);
var server = app.listen(3000);
//console.log("Serwer działa na porcie " + serverListen.address().port);

var io = require('socket.io').listen(server);
//io.set('origins', '*:*');
io.set('origins', 'http://192.168.1.48:8081');

io.on('connection', function(socket) {
  console.log("SOCKET.IO DZIAŁA");
  console.log(socket.id);

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('emit_method', function(data){
    io.emit('MESSAGE', data);
  })
});

//module.exports.serverListen = serverListen;

