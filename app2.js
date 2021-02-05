
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


let audio = new Howl({
  html5: false,
  src: "drumkit",
  pool: 50
})

let streamDest = Howler.ctx.createMediaStreamDestination()
Howler.masterGain.connect(streamDest) // connect masterGain to destination

// set up media recorder to record output
let chunks = []
let mediaRecorder = new MediaRecorder(streamDest.stream, {
  mimeType: 'audio/webm'
})

//const audio = document.querySelector('drumkit');
const ctx = new window.AudioContext();
const streamer = ctx.createMediaStreamDestination();
const recorder = new MediaRecorder(streamer.stream);

const STATES = {
  empty: 'empty',
  recording: 'recording',
  prepared: 'prepared',
  idle: 'idle',
  cease: 'cease'
};
let recordHead = STATES.empty;


recorder.addEventListener('dataavailable', e => {
  audio.src = URL.createObjectURL(e.data);

  if (recordHead === STATES.cease) {
    recordHead = STATES.idle;
  
    return;
  }

  audio.play();
  
});


document.getElementById("grabar").onclick.addEventListener('ended', e => {
  if (recorder.state === 'recording') {
    recordHead = STATES.idle;
    recorder.stop();
  }

  if (recordHead === STATES.cease) {
    recordHead = STATES.idle;
    
    return;
  }

  if (recordHead === STATES.prepared) {
    recordHead = STATES.recording;
    recorder.start();
  }

  e.target.play();
  
    recordHead === STATES.recording ? 'overdubbing' : 'playing';
});

