//DRUMKIT
const drums = new Howl({
  "src": [
    "./drums/audio/drums.webm",
    "./drums/audio/drums.mp3"
  ],
  "sprite": {
    "china": [
      0,
      2229.229024943311
    ],
    "clap": [
      4000,
      360.5668934240365
    ],
    "closed-hh": [
      6000,
      52.789115646258544
    ],
    "kick": [
      8000,
      701.6326530612247
    ],
    "open_hh": [
      10000,
      597.5510204081634
    ],
    "snare": [
      12000,
      92.69841269841272
    ]
  }
});

const drumkit = document.querySelector('.drumkit');
drumkit.addEventListener('click', () => {
  if (event.target.classList.contains('pad')) {
    let soundToPlat = event.target.dataset.sound;
    drums.play(soundToPlat);
  }
});
// DRUMKIT









// example of recording one sound looping for 3 seconds
let sound = new Howl({
  html5: false,
  src: "drumkit",
  //pool: 50
})

// connect MediaStreamDestination to Howler.masterGain 
let streamDest = Howler.ctx.createMediaStreamDestination()
Howler.masterGain.connect(streamDest) // connect masterGain to destination

// set up media recorder to record output
let chunks = []
let mediaRecorder = new MediaRecorder(streamDest.stream, { mimeType: 'audio/webm' })


mediaRecorder.onstart = () => {
  console.log('Started recording Howl output...')
}
mediaRecorder.ondataavailable = (e) => {
  chunks.push(e.data)
  sound.src = URL.createObjectURL(event.data);
}



// var recordedAudio = document.getElementById("recordedAudio");

// navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//   handlerFunction(stream);
// });
// function handlerFunction(stream) {
//   rec = new MediaRecorder(stream);
//   rec.ondataavailable = (e) => {
//     audioChunks.push(e.data);
//     if (rec.state == "inactive") {
//       let blob = new Blob(audioChunks, { type: "audio/mpeg-3" });
//       recordedAudio.src = URL.createObjectURL(blob);
//       recordedAudio.controls = true;
//       recordedAudio.autoplay = true;
//       sendData(blob);
//     }
//   };
// }
// function sendData(data) {}











//Declaracion del Howler donde guardar el blob url

var graba = [];
var i = 0;
var sonido = [];

mediaRecorder.onstop = () => {
  console.log("Done recording. Now let's try playback...")
  let fileReader = new FileReader() // to convert blob to data url
  fileReader.onload = (e) => {
    sonido[i] = new Howl({ src: e.target.result, format: ['webm']})
    leep(sonido[i]);
  }
  fileReader.readAsDataURL(new Blob(chunks)) // sends url to onLoad
}

function leep(nuevo) {
  graba[i] = nuevo;
  graba[i]._loop = true;
  graba[i].play();

  i = i + 1;
  console.log(i);
}



//FUNCIONES
//Declaracion de botones
const grabar_btn = document.getElementById("grabar");
const stop_btn = document.getElementById("stop");
const play_btn = document.getElementById("play");

function grabar() {
  mediaRecorder.start()
}
function stop() {
  mediaRecorder.stop();
}
function play() {
  sonido.play();
}

grabar_btn.addEventListener('click', function () {

  grabar();
})

stop_btn.addEventListener('click', function () {
  stop();
})
play_btn.addEventListener('click', function () {
  play();
})





const STATES = {
  empty: 'empty',
  recording: 'recording',
  prepared: 'prepared',
  idle: 'idle',
  cease: 'cease'
};
let recordHead = STATES.empty;

