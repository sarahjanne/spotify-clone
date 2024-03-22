//Vamos selecionar  todas as tags ou elementos  necessários

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next");


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
    nextMusic(); //calling next music function
});