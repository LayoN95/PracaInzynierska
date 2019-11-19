const http = require('http');
const app = require('./app');


const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port);

/*
//SOCKET.IO
var io = require('socket.io')(server);


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

  //======= 
  */