class User{
    constructor (nombre, correo, usuario, contraseña, pais = ""){
        this.nombre = nombre;
        this.correo = correo;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.pais = pais
    }
};

//si hay algo en localStorage lo guarda, sino un arreglo vacio
const users = JSON.parse(localStorage.getItem ("users")) || []

//localStorage.removeItem("alumnos"), borrar la clave alumnos
//localStorage.clear (), borrar todo

let nombre = document.querySelector ("#input1");
let correo = document.querySelector ("#emailReg");
let usuario = document.querySelector ("#userReg");
let contraseña = document.querySelector ("#passwordReg");
let pais = document.querySelector ("#countryReg");

//Registro

const registerUser = (event) => {
    event.preventDefault();

    const user = new User (
        nombre.value, 
        correo.value, 
        usuario.value, 
        contraseña.value,
        pais.value
    );
    users.push (user);
    //Guardar en localStorage
    localStorage.setItem ("users",JSON.stringify (users)); 
};

//document.querySelector("registerForm").addEventListener("submit",registerUser);


