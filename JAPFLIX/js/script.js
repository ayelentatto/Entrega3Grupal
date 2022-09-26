/*
    Acualmente estan hechos los casos 1 y 2 ==> se obtuvo el arrays con la informacion de las peliculas y se muestran al momento de buscar
    Problema a soluionar: El buscador filtra por exactamente lo que se escriba ==> si pongo pan este me traera todas los textos que tengan pan, pero tambien los que tengan PANadero, PANda, etc

    A hacer: parte 3 y 4 (utilizar bootstrap ya que este tiene las soluciones ==> bootstrap 5.02 "necesidad" en google)
    RECUERDEN: cuando se filtra (se busca) una peli los datos de las filtradas se guardan en el local storage (buscar objetos en el local storage para entender como se suben y como se deben "descargar")
*/

const url = 'https://japceibal.github.io/japflix_api/movies-data.json';
let buscar = document.getElementById("btnBuscar");
let datosPeliculas = [];
let peliculasFiltradas = [];

//Obtener JSON de peliculas
const ObjetoPeliculas = async () => {
    const response = await fetch(url);
    datosPeliculas = await response.json();
    console.log(datosPeliculas);
}

ObjetoPeliculas();

buscar.addEventListener('click', () => {
    let pelicula = document.getElementById('inputBuscar').value;
    peliculasFiltradas = [];
    if(pelicula != "" && pelicula != " "){
        filtrar(pelicula.toLowerCase());
    } else {
        alert("Ingrese un dato valido");
    }
});

function filtrar(pelicula){
    datosPeliculas.forEach(peli => {
        if(peli.title.toLowerCase().search(pelicula) >= 0 || peli.tagline.toLowerCase().search(pelicula) >= 0 || peli.overview.toLowerCase().search(pelicula) >= 0){
            peliculasFiltradas.push(peli);
        }
        peli.genres.forEach(genero => {
            if(genero.name.toLowerCase().search(pelicula) >= 0 && !peliculasFiltradas.includes(pelicula)){
                peliculasFiltradas.push(peli);
            }
        })
    });

   mostrar(peliculasFiltradas);
}

function mostrar(peliculas){
    let cont = 0;
    localStorage.clear();
    document.getElementById("lista").innerHTML = ""; 
    peliculas.forEach(peli => {
        localStorage.setItem('p'+ cont, JSON.stringify(peli));
        let k = 1;
        let inicio = `<li class="list-group-item bg-dark unaPeli" onclick="alert('p${cont}')">${peli.title}`;
        estrellas = `<div class="float-end">`;
        while (k < 6) {
            if(k <= (Math.round(peli.vote_average))/2){
                estrellas += `<span class="fa fa-star checked"></span>`;
            } else {
                estrellas += `<span class="fa fa-star"></span>`;
            }
            k++;
        }
        estrellas += `</div>`
        let fin = `<br>${peli.tagline}</li>`;
        document.getElementById("lista").innerHTML += inicio + estrellas + fin;
        cont++;
    });
}