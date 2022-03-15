const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');

const prevBtn =  document.querySelector('#prev');
const playBtn =  document.querySelector('#play');
const nextBtn =  document.querySelector('#next');

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

nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)


playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


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
    music.loop = true;
} 
music.addEventListener('timeupdate', updateProgressBar )
// music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

