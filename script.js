const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
// buttons
const prevBtn =  document.querySelector('#prev');
const playBtn =  document.querySelector('#play');
const nextBtn =  document.querySelector('#next');
const loopBtn  = document.querySelector("#loop");
// progress 
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

const songs = [{ 
    name : 'jacinto-1',
    title : 'Electric Chill',
    artist : 'Jacinto Design'
} , {
    name : 'jacinto-2',
    title : 'Seven Nation Army',
    artist : 'Jacinto Design'
} , {
    name : 'jacinto-3',
    title : 'Good night , Disco quen',
    artist : 'Jacinto Design'
} , {
    name : 'metric-1',
    title : 'Front Row (Remix)',
    artist : 'Metric/Jacinto Design'
}]

/// Check if playing
let isPlaying = false;


// Play 
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    music.play();

}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    music.pause();
}

/// keybord pause and play 
document.addEventListener('keydown', (e) => {
    if(e.keyCode == 32){
        isPlaying ? pauseSong() : playSong()
    }
})

let songIndex = 0;

// Next button
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}

// prev button
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong()
}

let isLooping = false;

/// looping functiions 

function startLooping(){
    isLooping = true;
    music.loop = true;
    loopBtn.classList.add('active');
    console.log('loop true')
}

function stopLooping(){
    isLooping = false;
    music.loop = false;
    loopBtn.classList.remove('active');
    console.log('loop false')
}


// Update Dom 
function loadSong(song){
    title.textContent = song.title;
    artist.textContent = song.artist;
    image.src = `img/${song.name}.jpg`
    music.src = `music/${song.name}.mp3`
}

// load Songs
loadSong(songs[songIndex]);

/// Update progress Bar and Time 

function updateProgressBar(e){
    if(isPlaying){
        const {currentTime,  duration} = e.srcElement;
        /// update progress with
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
            
        /// Calculate display for duration
        const durationMinutes  = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
             durationSeconds = `0${durationSeconds}`;
        }
        /// Display song duration
        if(duration){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        /// Calculate display for current time
        let currentMinutes  = Math.floor(currentTime / 60);
        let currentSeconds  = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
       }
        if(currentTime){
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

/// set progress bar 
function setProgressBar(e){
    // const { clientWidth } = e.srcElement;
    const clientWidth = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / clientWidth) * duration;
} 

/// Event listeners 
nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
loopBtn.addEventListener('click', () => (isLooping ? stopLooping() : startLooping()));
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgressBar);



const volume = document.querySelector('#volume-input');
const volume_progress = document.querySelector('.volume-progress');
const volume_icon = document.querySelector('.fa-volume-down');
const volume_off_icon = document.querySelector('.fa-volume-off');


volume.oninput = function(){

    let vol = volume.value / 100;
    music.volume = vol;

    volume_progress.style.width = `${volume.value}%`;
    
    // change volume icon if volume is 0 
    if(vol == 0) {
        volume_icon.classList.replace('on', 'off');
        volume_off_icon.classList.replace('off', 'on');
    } else {
        volume_icon.classList.replace('off', 'on');
        volume_off_icon.classList.replace('on', 'off');
    }
}


