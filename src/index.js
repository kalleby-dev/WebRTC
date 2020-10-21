const express = require('express');
// const sockio = require('socket.io');

const app = express();
const server = require('http').createServer(app);
// const socket = sockio(server);

app.set('view engine', 'ejs');
app.set('views', './client/views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(8000, () => console.log('Server is listening on port 8000'));
