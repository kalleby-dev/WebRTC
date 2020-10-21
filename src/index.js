const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);
const {v4: uuidV4} = require('uuid');

app.set('view engine', 'ejs');
app.set('views', './client/views');
app.use(express.static('public'));

app.get('/', (req, res) =>{
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) =>{
  res.render('room', { roomId: req.params.room});
});

server.listen(8000, () => console.log('Server is listening on port 8000'));
