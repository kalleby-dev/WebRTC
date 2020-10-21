const express = require('express');
// const sockio = require('socket.io');

const app = express();
const server = require('http').createServer(app);
// const socket = sockio(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

server.listen(8000, () => console.log('Server is listening on port 8000'));
