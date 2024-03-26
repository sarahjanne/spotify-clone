//Vamos selecionar  todas as tags ou elementos  necessários

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector (".progress-bar"),
progressArea = wrapper.querySelector (".progress-area");

let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex); //calling load music function once windows loaded
})

//load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb -1].artist;
    musicImg.src = `./src/assets/images-areas/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `./src/assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//pause music function

// Agora no segundo clique o isMusicPused retornará verdadeiro porque está pausado.
// Aclasse é adcionada no wrapper para que a função chame o pauseMusic.

function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//next music function
function nextMusic(){
    //here we'll just increment of index by 1
    musicIndex++;

    //Se o musicIndex for maior que o array length, o musicIndex será 1 , então a primeira música será reproduzida

    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//prev music function
function prevMusic(){
    //here we'll just decrement of index by 1
    musicIndex--;

    //Se o musicIndex for menor que 1, o musicIndex será 1 , então a última música do array length será reproduzida

    musicIndex < 1 ? musicIndex = allMusic.length  : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//play or music button event
playPauseBtn.addEventListener("click",()=>{
    const isMusicPaused = wrapper.classList.contains("paused");

//Se isMusicPaused é true então interligue pauseMusic com playMusic, 
// No primeiro clique, ele retornará flaso porque não há classe
// pausada no wrapper, então a função de reprodução de música será chamada e add a classe
// pausada dentro da função plauMusic

    isMusicPaused ? pauseMusic() : playMusic();
});

// next music btn event
nextBtn.addEventListener("click",()=>{
    nextMusic(); //calling next music function
});

// prev music btn event
prevBtn.addEventListener("click",()=>{
    prevMusic(); //calling next music function
});


//atualizar barra de progresso com de acordo com a música que está tocanto (atual)
mainAudio.addEventListener("timeupdate", (e)=>{

// console.log(e); ( usado para mostrar o "erro" que está retornando, no caso a falta do currentTime e duração do audio)
const currentTime = e.target.currentTime; //obtendo a tempo atual da canção
const duration = e.target.duration; //obtendo  duração total da canção
let progressWidth = (currentTime / duration) * 100; 
   progressBar.style.width = `${progressWidth}%`;

        
let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

mainAudio.addEventListener("loadeddata", ()=>{
    //update song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec <10){ // adding 0 if sec is less than 10
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
});

    //update playing song current time
let currentMin = Math.floor(currentTime / 60);
let currentSec = Math.floor(currentTime % 60);
if(currentSec <10){ // adding 0 if sec is less than 10
    currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
   
});

//let´s update playing song current time on according to the progress bar width 

progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth; //getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting son total duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic(); // se a música estiver pausada e o usuário clicar no progressBar 
                //a música continuará tocando. Por isso o uso o play music no final.

});

//let's work on repeat, suffle song according to the icon

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    //first we get the innerText of the icon then we'll change accordingly
    let getText = repeatBtn.innerText; //getting innerText of icon

    //let's do different changes on different icon click using switch
    switch(getText){
        case "repeat": //if this icon is repeat the change it to repeat_one
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one": // if icon is repeat_one the change it to shuffle
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle": // if icon is repeat_one the change it to repeat
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Repetir playlist");
            break;
    }
});


