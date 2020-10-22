const videoGrid = document.querySelector('.video-grid');
const socket = io('/');
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

// Elemento que ira exibir o video
const myVideo = document.createElement('video');
myVideo.muted = true;

// Captura os dados de video local
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
})
.then(stream => {
  addVideoStream(myVideo, stream)

  // Comunicação entre os utilizadores
  myPeer.on('call', call => {
    console.log("Em chamada")
    call.answer(stream)
    
 
/*     const remoteVideo = document.createElement('video');
    // Detecta que a chamada foi atendida
    call.on('stream', remoteStream => {
      addVideoStream(remoteVideo, remoteStream);
    }) */
  })

  // Ao detectar outro utilizador, faz uma chamada
  socket.on('user-connected', userId => {
    console.log("Connected: " + userId);
    connectToNewUser(userId, stream);
  })
})

socket.on('user-disconnected', remoteId => {
  console.log(remoteId);
});

// Conexão ao servidor informa
// aos usuarios que entrou na sala
myPeer.on('open', id =>{
  socket.emit('join-room', ROOM_ID, id);
})



// Faz a chamada para o outro utilizador
function connectToNewUser(userId, stream){
  console.log("Fazer chamada");
  const call = myPeer.call(userId, stream)

  const remoteVideo = document.createElement('video')
  
  // Processar dados recebidos
  call.on('stream', remoteStream => {
    addVideoStream(remoteVideo, remoteStream)
    console.log("Recebendo stream")
  })

  call.on('close', () => {
    remoteVideo.remove();
    console.log("Encerrando stream")
  })
}


// Atualiza o video local
function addVideoStream(video, stream){
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () =>{
    video.play();
  });
  videoGrid.append(video);
}
