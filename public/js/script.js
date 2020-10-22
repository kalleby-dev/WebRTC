const videoGrid = document.querySelector('.video-grid');
const socket = io('/');
const peer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

// Capturar video local
const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream =>{
  addVideoStream(myVideo, stream)
});


// Conexão ao servidor - notificação aos usuarios da sala
peer.on('open', id =>{
  socket.emit('join-room', ROOM_ID, id);
})

socket.on('user-connected', (userId) =>{
  console.log("A new user has connected: " + userId);
});



// Atualiza o video local
function addVideoStream(video, stream){
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () =>{
    video.play();
  });
  videoGrid.append(video);
}