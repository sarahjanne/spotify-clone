
/*console.log('Funcionou!')  > código pra ver se rodou*/

const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
/* mostrar a playlist*/
const resultPlaylist = document.getElementById('result-playlists');


function requestApi(searchTerm){
    /* fazer requisições da api*/
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
    /* método de promises, programação assíncrona*/
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result){
    /* vai ocultar e pegar o nome do artista*/
        resultPlaylist.classList.add("hidden")
        const artistName = document.getElementById('artist-name');
        const artistImage = document.getElementById('artist-img');

        //O que vamos receber do rersultado, o nome do artista e a imagem dele 
        result.forEach(element => {
            artistName.innerText = element.name;
            artistImage.src = element.urlImg;
        });

        /* Usar o result for do display para exibir, vai tirar o que ta lá e colocar o card*/
        resultArtist.classList.remove('hidden');
}



/* Um evento são interações*/
document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }

    requestApi(searchTerm);
})


