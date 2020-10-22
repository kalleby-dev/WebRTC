const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {v4: uuidV4} = require('uuid');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) =>{
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) =>{
  res.render('room', { roomId: req.params.room});
});

// Quando alguem entrar na sala de outro user
io.on('connection', sock => {
  sock.on('join-room', (roomId, userId) =>{
    sock.join(roomId);
    sock.to(roomId).broadcast.emit('user-connected', userId);

    sock.on('disconnected', () => {
      sock.to(roomId).broadcast.emit('user-disconnected', userId);
    });

  });


});

server.listen(8000, () => console.log('Server is listening on port 8000'));
