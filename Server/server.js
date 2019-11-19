const http = require('http');
const app = require('./app');


const port = process.env.PORT || 3000;

const server = http.createServer(app);
//server.listen(port);
var serverListen = app.listen(port);
console.log("Serwer działa na porcie " + server.address().address);

module.exports.serverListen = serverListen;