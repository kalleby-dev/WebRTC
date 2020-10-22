const socket = io('/');

socket.emit('join-room', ROOM_ID, 10);

socket.on('user-connected', (userId) =>{
  console.log("A new user has connected: " + userId);
});