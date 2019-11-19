const http = require('http');
const app = require('./app');


const port = process.env.PORT || 3000;

const server = http.createServer(app);
//server.listen(port);
server.listen(port);
//console.log("Serwer działa na porcie " + serverListen.address().port);

var io = require('socket.io').listen(server);
//io.set('origins', '*:*');
//io.set('origins', 'http://192.168.1.48:8081');

io.on('connection', function(socket) {
  console.log("SOCKET.IO DZIAŁA");
  console.log(socket.id);

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('emit_method', function(data){
    io.emit('MESSAGE', data);
    console.log(data);
  });
  socket.on('BH1750', function(data){
      io.emit('BH1750_BROADCAST', data);
      console.log("BH1750 BROADCAST DZIAŁA!" + data.light);
  });
  socket.on('DS18B20', function(data){
      io.emit('DS18B20_BROADCAST', data);
      console.log("DS18B20 EMIT FROM SERVER: " + data.temp);
  })
});

//module.exports.serverListen = serverListen;

