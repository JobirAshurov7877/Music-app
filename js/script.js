
const musicContainer = document.querySelector('#audio-container')
const nextBtn = document.querySelector('#next')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev');


const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


const songs = ["Men edim" , "Kayf kayf" , "Gulim" , "Unstoppable" , "Tus Besos" , "Qizlarga tushunmayman"];
let songIndex = 0;

function loadSong(song) {
    title.textContent = song;
    audio.src = `./music/${song}.m4a`
    cover.src = `./img/${song}.jpg`
} 
loadSong(songs[songIndex])


function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play')
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause')
    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play')
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause')

    audio.pause()

}


function prevSong() {
    songIndex--;
    if (songIndex < 0 ) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}


function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex= 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration , currentTime}= e.srcElement;
    const progressPerent = (currentTime / duration) * 100;
    progress.style.width = `${progressPerent}%`;

}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime= (clickX / width)* duration;
}






playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong()
    }
    else{playSong()}
})



prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)


audio.addEventListener('timeupdate' , updateProgress)

progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended',nextSong)


