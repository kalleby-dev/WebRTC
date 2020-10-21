// Receber dados locais - Audio/Video
navigator.mediaDevices.getUserMedia({
  video: true, 
  audio: true
})
.then(stream => {
  const localVideo = document.querySelector('#local-video');
  
})
.catch(error => console.warn(error));

/* const data = window.constraints = 

const button = document.querySelector('#btn-start');
button.addEventListener('click', (ev) =>{
  console.log('clicou');
  console.log(data);
});


// Armazena os dados locais
const gotLocalMidia = (mediaStream) => {
  let localStream = mediaStream;
  console.log(localStream);
} */