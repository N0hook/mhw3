

//client id e client secret forniti dal sito:
const client_id_spotify = "123f96ba7bd24a1993af2da4199d44c3";
const client_secret_spotify = "8f91ae39665748ac9efb2006e6ea9e9c";
let token; //salva qui il token restituito da spotify

//event listener per spotify
const button_cerca = document.querySelector('form');
button_cerca.addEventListener('submit', cerca_classifiche);

//event listener per la mail
const button_registrazione = document.querySelector('#button');
button_registrazione.addEventListener("click", verifica_mail);

// VALIDAZIONE MAIL

function verifica_mail()
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
      fetch("https://api.eva.pingutil.com/email?email=test@mail7.io", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}


//SPOTIFY
function onTokenResponse(response){
    return response.json();
}

function onTokenJson(json){
    console.log(json);
    token = json;
}

//richiede il token a spotify
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id_spotify + ':' + client_secret_spotify)
    }
}
).then(onTokenResponse).then(onTokenJson);


function onResult(response)
{
    return response.json();
}

//si fa restituire dall'api i dati
function onJson_risultati(json)
{
    const spotify_view = document.querySelector('#visualizza_classifica');
    spotify_view.innerHTML = ''; //inizialmente vuoto

    console.log(json);

    for (let i = 0; i < 10; i++ )
    {
        let nome_album = json.albums.items[i].name;
        let copertina_album = json.albums.items[i].images[0].url;
        let num_tracce = json.albums.items[i].total_tracks;
        let uscita = json.albums.items[i].release_date;
        let uri = json.albums.items[i].uri;

        let visualizza_album = document.createElement('div');
        visualizza_album.classList.add('visualizza_album');
        let visualizza_copertina = document.createElement('img');
        visualizza_copertina.src=copertina_album;
        let nome=document.createElement('span');
        nome.textContent=nome_album;
        let visualizza_tracce = document.createElement('h1');
        visualizza_tracce.textContent=num_tracce;
        visualizza_tracce.classList.add('visualizza_tracce');
        let visualizza_data = document.createElement('h2');
        visualizza_data.textContent=uscita;
        visualizza_data.classList.add('visualizza_data');
        let visualizza_uri = document.createElement('h3');
        visualizza_uri.textContent=uri;
        visualizza_uri.classList.add('visualizza_uri');
        visualizza_album.appendChild(nome);
        visualizza_album.appendChild(visualizza_copertina);
        visualizza_album.appendChild(visualizza_tracce);
        visualizza_album.appendChild(visualizza_data);
        visualizza_album.appendChild(visualizza_data);
        visualizza_album.appendChild(visualizza_uri);

        visualizza_classifica.appendChild(visualizza_album);
    }
}


// utilizza il token di accesso
function cerca_classifiche(event)
{
    event.preventDefault();

    fetch("https://api.spotify.com/v1/browse/new-releases/" ,
        {
            headers:
            {
                'Authorization': 'Bearer ' + token.access_token 
            }
        }

    ).then(onResult).then(onJson_risultati);
}



























