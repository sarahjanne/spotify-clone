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
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
liAudioTag = wrapper.querySelector("#audio-duration"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex); //chamando a função load music assim que a janela(window) for carregado
    playingSong(); 
});

// Função load music 
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb -1].artist;
    musicImg.src = `./src/assets/images-areas/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `./src/assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//Função play music 
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//Função pause music 
// Agora no segundo clique o isMusicPused retornará verdadeiro porque está pausado.
// A classe é adcionada no wrapper para que a função chame o pauseMusic.
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}


//Função prev music
function prevMusic(){
    //aqui vamos apenas decrementar o índice em 1
    musicIndex--;
    //Se o musicIndex for menor que 1, o musicIndex será 1 , então a última música do array length será reproduzida
    musicIndex < 1 ? musicIndex = allMusic.length  : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong(); 
}

//Função next music 
function nextMusic(){
    //aqui vamos apenas incrementar o índice em 1
    musicIndex++;
    //Se o musicIndex for maior que o array length, o musicIndex será 1 , então a primeira música será reproduzida
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong(); 
}


//evento de botão de reprodução ou música

//Se isMusicPaused é true então interligue pauseMusic com playMusic, 
// No primeiro clique, ele retornará flaso porque não há classe
// pausada no wrapper, então a função de reprodução de música será chamada e add a classe
// pausada dentro da função plauMusic
playPauseBtn.addEventListener("click",()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong(); 
});


// prev music btn event
prevBtn.addEventListener("click",()=>{
    prevMusic(); //chamando a próxima função de música
});


// next music btn event
nextBtn.addEventListener("click",()=>{
    nextMusic(); //calling next music function
});

//atualizar barra de progresso com de acordo com a música que está tocanto (atual)
mainAudio.addEventListener("timeupdate", (e)=>{
// console.log(e); ( usado para mostrar o "erro" que está retornando, no caso a falta do currentTime e duração do audio)
    const currentTime = e.target.currentTime; //obtendo a tempo atual da canção
    const duration = e.target.duration; //obtendo  duração total da canção
    let progressWidth = (currentTime / duration) * 100; 
    progressBar.style.width = `${progressWidth}%`;

        
    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", ()=>{
//atualiza a duração total da música
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //adicionando 0 se sec for menor que 10
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
});

//atualiza o horário atual da música que está sendo reproduzida
let currentMin = Math.floor(currentTime / 60);
let currentSec = Math.floor(currentTime % 60);
if(currentSec < 10){ // adding 0 if sec is less than 10
    currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


//vamos atualizar o horário atual da música de acordo com a largura da barra de progresso

progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth; //obtendo largura da barra de progresso
    let clickedOffSetX = e.offsetX; //obtendo offset x value
    let songDuration = mainAudio.duration; //obtendo duração total da música

    mainAudio.currentTime = (clickedOffSetX / progressWidth) * songDuration;
    playMusic();   // se a música estiver pausada e o usuário clicar no progressBar 
    playingSong();  //a música continuará tocando. Por isso o uso o play music no final.
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
            playMusic();//chamando a função playMusic
            break;
        case "shuffle": // se o ícone for repeat_one altere para repeat
            //gerando índice aleatório entre o intervalo máximo de comprimento da matriz(array length)
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex); //este loop é executado até que o próximo número aleatório não seja o mesmo do índice de música atual
            musicIndex = randIndex;//passing ramdomIndex to musicIndex to musicIndex so the random song will play
            loadMusic(musicIndex);//calling loadMusic function
            playMusic();//calling playMusic function
            playingSong();
            break;
    }
});


moreMusicBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

closemoreMusic.addEventListener("click", ()=>{
    moreMusicBtn.click();
});



const ulTag  = wrapper.querySelector("ul");

//vamos passar o nome da música, artista do array para li

for (let i = 0; i < allMusic.length; i++) {
  //let's pass the song name, artist from the array


  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="./src/assets/songs/${allMusic[i].src}.mp3"></audio>
                </li>`;

            ulTag.insertAdjacentHTML("beforeend", liTag);

            let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
            let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  
            liAudioTag.addEventListener("loadeddata", ()=>{
                let duration = liAudioTag.duration;
                let totalMin = Math.floor(duration / 60);
                let totalSec = Math.floor(duration % 60);
                if(totalSec < 10){ //se sec for menor que 10 então adicione 0 antes dele
                totalSec = `0${totalSec}`;
                };
                liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passando a duração total da música
                liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adicionando o atributo t-duration com o valor da duração total
            });
            
                        
            }
                
//toca uma música específica da lista onclick da tag li
function playingSong(){
    const allLiTag = ulTag.querySelectorAll("li");
    
    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".audio-duration");
      
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }
  
      //se o índice da tag li for igual ao musicIndex então adicione a classe de reprodução nele
      if(allLiTag[j].getAttribute("li-index") == musicIndex){
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "Playing";
      }
  
      allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
  }
  
  //função li clicada específica
  function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //atualizando o índice da música atual com o índice li clicado
    loadMusic(musicIndex);
    playMusic();
    playingSong();
  }