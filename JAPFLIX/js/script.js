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
    }
});

function filtrar(pelicula){
   peliculasFiltradas = datosPeliculas.filter(({title, genres, tagline, overview}) => title.toLowerCase().includes(pelicula) || genres.some(generos => generos.name.toLowerCase().includes(pelicula)) || tagline.toLowerCase().includes(pelicula) || overview.toLowerCase().includes(pelicula));
   mostrar(peliculasFiltradas);
}

function mostrar(peliculas){
    document.getElementById("lista").innerHTML = ""; 
    peliculas.forEach(peli => {
        let k = 1;
        let inicio = 
        `<li class="d-flex mx-5 justify-content-between text-white unaPeli" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onclick="alert(${peli.id})">
            <div>
                <h5>${peli.title}</h5>
                <p class="text-secondary fst-italic">${peli.tagline}</p>
            </div>
        `;
        inicio += `<div>`;
        while (k < 6) {
            if(k <= (Math.round(peli.vote_average))/2){
                inicio += `<span class="fa fa-star checked"></span>`;
            } else {
                inicio += `<span class="fa fa-star"></span>`;
            }
            k++;
        }
        inicio += `</div> </li>`;
        document.getElementById("lista").innerHTML += inicio;
    });
}

function alert(idPeli){
    let gen = [];
    let movie = datosPeliculas.find(({id}) => id === idPeli);
    movie.genres.forEach(genero => {
        gen.push(genero.name);
    })
    let anio = movie.release_date.split('-');

    document.getElementById("tituloCanvas").innerHTML = `<h3 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h3>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>`;
    document.getElementById("overviewCanvas").innerHTML = movie.overview;
    document.getElementById("generosCanvas").innerHTML = gen.join(' - ');
    document.getElementById("anioCanvas").innerHTML = `Año: ${anio[0]}`;
    document.getElementById("runtimeCanvas").innerHTML = `Duración: ${movie.runtime} min.`;
    document.getElementById("budgetCanvas").innerHTML = `Presupuesto: $${movie.budget}`;
    document.getElementById("revenueCanvas").innerHTML = `Ganacias: $${movie.revenue}`;

}