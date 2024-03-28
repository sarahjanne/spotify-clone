//Vamos selecionar  todas as tags ou elementos  necessários

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar");
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");


let musicIndex = 2;

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

//vamos atualizar o horário atual da música de acordo com a largura da barra de progresso

progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth; //obtendo largura da barra de progresso
    let clickedOffSetX = e.offsetX; //obtendo offset x value
    let songDuration = mainAudio.duration; //obtendo duração total da música

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic(); // se a música estiver pausada e o usuário clicar no progressBar 
                //a música continuará tocando. Por isso o uso o play music no final.

});

//vamos trabalhar na repetição, embaralhe a música de acordo com o ícone

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    //primeiro obtemos o innerText do ícone e então mudaremos de acordo
    let getText = repeatBtn.innerText; //Obtendo innerText do icone

    //vamos fazer alterações diferentes em cliques de ícones diferentes usando o switch
    switch(getText){
        case "repeat": //Se o ícone for repeat altere - o para repeat_one
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Música em loop");
            break;
        case "repeat_one": //Se o ícone for repeat_one alter-o para shuffle
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Reprodução aleatória");
            break;
        case "shuffle": //Se o ícone for repeat_one altere-o para repeat
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Repetir playlist");
            break;
    }
});

//Acima apenas mudamos o ícone, agora vamos trabalhar no que fazer
//depois que a música acabou

mainAudio.addEventListener("ended", ()=>{
    //De acordo com o ícone significa que se o usuário configurou o ícone para repetir a música, repetiremos
    //a música atual(current) e fará mais de acordo

    let getText = repeatBtn.innerText; //obtendo innerText do ícone

     //vamos fazer alterações diferentes em cliques de ícones diferentes usando o switch
     switch(getText){
        case "repeat": //se este ícone for repeat, simplesmente chamamos a função nextMusic para que a próxima música seja reproduzida
            nextMusic();
            break;
        case "repeat_one": // se o ícone repeat_one então mudaremos o tempo atual para 0 para que a música toque desde o início
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();//calling playMusic function
            break;
        case "shuffle": // se o ícone for repeat_one altere para repeat
            //gerando índice aleatório entre o intervalo máximo de comprimento da matriz(array length)
            let randIndex = Math.floor((Math.random()* allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random()* allMusic.length) + 1);
            }while(musicIndex == randIndex); //este loop é executado até que o próximo número aleatório não seja o mesmo do índice de música atual
            musicIndex = randIndex;//passing ramdomIndex to musicIndex to musicIndex so the random song will play
            loadMusic(musicIndex);//calling loadMusic function
            playMusic();//calling playMusic function
            break;
    }
});


showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
});

const ulTag  = wrapper.querySelector("ul");

//vamos passar o nome da música, artista do array para li

for (let i = 0; i<allMusic.length; i++){
    //le'ts pass the song name, artist from the array to li 

    let liTag = `<li>
                  <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                  </div>
                  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                  <span id="${allMusic[i].src}" class="audio-duration">7:57</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", ()=>{
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec <10){ // adding 0 if sec is less than 10
        totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    });
}