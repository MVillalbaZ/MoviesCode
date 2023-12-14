import {peliculas} from "../data/peliculas.js";

let parametros = location.search.split("?posicion=");

let posicion = parametros[1];

console.log(posicion);

document.querySelector("h1").innerText=peliculas[posicion].titulo;
document.querySelector("#portada").src=peliculas[posicion].imagen;
document.querySelector("#portada").alt=peliculas[posicion].titulo;
document.querySelector("#sinopsis").innerText=peliculas[posicion].sinopsis;
document.querySelector("#estreno").innerText=peliculas[posicion].fecha_estreno;
document.querySelector("#director").innerText=peliculas[posicion].director;
document.querySelector("#recaudacion").innerText=peliculas[posicion].recaudacion;
document.querySelector("#iframe").src=peliculas[posicion].trailer;











