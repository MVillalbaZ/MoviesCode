let cuerpoTabla = document.querySelector ("tbody");
const myModal = new bootstrap.Modal(document.getElementById('updateModal'));

const cargarTabla = () => {
    cuerpoTabla.innerHTML = "";
    /*recorrer el arreglo de alumnos
    por cada alumno crear una fila
    crear celdas con los datos de usuario
    agregar esos datos al contenedor*/
    alumnos.map ((alumno,index) =>{
        let fila = document.createElement ("tr");
        let celdas = `<td>${pelicula.ID}</td>
        <td>${pelicula.nombre}</td>
        <td>${pelicula.director}</td>
        <td>${pelicula.recaudacion}</td>
        <td>
        <button class= "btn btn-danger btn-sm" onclick="borrarPelicula(${index})">X<button>
        </td>
        <td>
        <button class= "btn btn-warning btn-sm" onclick="mostrarModal(${index})">M<button>
        </td>`;

        fila.innerHTML = celdas;

        cuerpoTabla.append (fila);
    });
};

const borrarPelicula = (index) => {
    let validar = confirm (`Esta seguro que quiere eliminar a ${alumnos[index].nombre}`);

    if (validar){
        alumnos.splice (index,1);
        localStorage.setItem ("alumnos",JSON.stringify (alumnos));
        alert ("El registro fue eliminado");
        cargarTabla ();
    }
};

let posicionPelicula = null 

const mostrarModal = (index) => {
    document.querySelector("#inputModal1").value = peliculas[index].ID;
    document.querySelector("#inputModal2").value = peliculas[index].nombre;
    document.querySelector("#inputModal3").value = peliculas[index].director;
    document.querySelector("#inputModal4").value = peliculas[index].recaudacion;
    posicionPelicula=index;
    myModal.show();
};

const actualizarPelicula =(event)=>{
    event.preventDefault()
        peliculas[posicionPelicula].ID = document.getElementById ("inputModal1").value;
        peliculas[posicionPelicula].nombre = document.getElementById ("inputModal2").value;
        peliculas[posicionPelicula].director = document.getElementById ("inputModal3").value;
        peliculas[posicionPelicula].recaudacion = document.getElementById ("inputModal4").value;

        localStorage.setItem ("peliculas", JSON.stringify (peliculas));

        myModal.hide();
 
        cargarTabla();
};