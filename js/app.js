import { movies, auth, highlights, wishlists } from "./data.js";
let users = JSON.parse(localStorage.getItem("users")) || null;
import { Wishlist } from "./class.js";

let searchInput = document.querySelector("#search");
let listContainer = document.querySelector("#list");
let bodyIndex = document.querySelector("#body-index");
let sectionStart = document.querySelector("#sectionStart");
let highlightDiv = document.querySelector("#highlightDiv");
let wishlistContainer = document.querySelector("#wishlistContainer");
let categories = document.querySelector("#categories");
let mainIndex = document.querySelector("#mainIndex");

const search = (event) => {
  event.preventDefault();

  if (searchInput.value) {
    let results = [];
    for (let index = 0; index < movies.length; index++) {
      results = movies.filter((result) => {
        return result.movieName
          .toLowerCase()
          .includes(searchInput.value.toLowerCase());
      });
    }

    let list = "<ul>";
    for (let i = 0; i < results.length; i++) {
      list +=
        `<li class='list-group-item'><div class="card text-bg-dark"><img  class="card-img" src="` +
        pageImage +
        `${results[i].movieImage}" alt="${results[i].movieName}>
        <div class="card-img-overlay"><div class="card-title"><b><a class='text-decoration-none text-light text-break' href="` +
        pageRedirection +
        `${movies.findIndex((movie) => movie.id == results[i].id)}">` +
        results[i].movieName +
        `</a></b></li>
        <br>`;
    }
    list += "</ul>";

    return (listContainer.innerHTML = list);
  } else {
    return (listContainer.innerHTML = "");
  }
};

searchInput.addEventListener("keyup", search);
try {
  if (auth && sectionStart) {
    sectionStart.innerHTML = "";
    sectionStart.classList = "row me-3 mb-0";

    let usernameP = document.createElement("p");
    let usernameText = `${auth.user}`;
    usernameP.classList = " text-white align-self-center mb-0 col-6";

    usernameP.append(usernameText);
    sectionStart.append(usernameP);

    let img = document.createElement("img");
    img.src = auth.avatar;
    img.alt = auth.user;
    img.classList = "bg-light rounded-1 user-avatar";

    let hiperlink = document.createElement("a");
    hiperlink.classList = "col-6";
    hiperlink.href = "/pages/admin.html";

    hiperlink.appendChild(img);
    sectionStart.append(hiperlink);
  } else if (users && sectionStart) {
    sectionStart.innerHTML = "";
    sectionStart.classList = "row me-3 mb-0";
    let usernameP = document.createElement("p");
    let usernameText = users.usernameReg;
    usernameP.classList = "text-white align-self-center mb-0 col-6";
    usernameP.append(usernameText);
    sectionStart.append(usernameP);
    let img = document.createElement("img");
    img.src = users.profileReg;
    img.alt = users.usernameReg;
    img.classList = "bg-light rounded-1 user-avatar";
    let hiperlink = document.createElement("a");
    hiperlink.classList = "col-6";
    hiperlink.href = "/pages/user.html";
    hiperlink.appendChild(img);
    sectionStart.append(hiperlink);
  }
} catch {
  sectionStart.innerHTML = `<li class="d-flex col-5 justify-content-center nav-item mx-1 rounded-2 p-2 target">
                  <a
                    class="nav-link text-white text-target"
                    href="./pages/login.html"
                    >Loguearse</a
                  >
                </li>
                <li
                  class="d-flex col-5 justify-content-center nav-item mx-1 rounded-2 bg-white border border-light p-2 target-2"
                >
                  <a
                    class="nav-link text-black text-target"
                    href="./pages/register.html"
                    >Registrarse</a
                  >
                </li>`;
}

if (!movies) {
  mainIndex.innerHTML = `
  <div class="container">
  <div class="row">
  <div class="col">
  <h1 class=" mt-5 pt-5 d-flex align-items-center justify-content-center">No hay películas registradas</h1>
  <div><p class="d-flex align-items-center justify-content-center">Si es administrador, acceda a su cuenta para añadirlas</p></div>
  </div>
  </div>
  </div>`;
}
const highlightIndex = () => {
  let divContent = document.createElement("div");
  divContent.classList = "slide-content";
  let highlightTitle = document.createElement("h1");
  highlightTitle.classList = "movie-title d-flex mt-xl-0";
  highlightTitle.innerText = highlights[0].movieName;
  let highlightDesc = document.createElement("p");
  highlightDesc.classList = "movie-des d-none d-xl-flex";
  highlightDesc.innerText = highlights[0].description;
  let buttonMore = document.createElement("a");
  buttonMore.id = "boton";
  buttonMore.role = "button";
  buttonMore.href = `${pageRedirection}${movies.findIndex(
    (movie) => movie.id == highlights[0].id
  )}`;
  buttonMore.classList = "btn btn-dark";
  buttonMore.innerText = "Ver más";
  let highlightImg = document.createElement("img");
  highlightImg.src = `${pageImage}${highlights[0].movieImage}`;
  highlightImg.alt = highlights[0].movieName;
  divContent.append(highlightTitle, highlightDesc, buttonMore);
  if (highlightDiv) {
    highlightDiv.append(divContent, highlightImg);
  }
};

let pageRedirection = "";
let pageImage = "";
let preImage = "";
let nxtImage = "";
if (bodyIndex) {
  pageRedirection = "/pages/movie.html?v=";
  pageImage = "./assets/";
  preImage = "";
  nxtImage = "";
} else {
  pageRedirection = "./movie.html?v=";
  pageImage = "../assets/";
  preImage = "..";
  nxtImage = "..";
}
const wishlistMovieList = () => {
  if (wishlistContainer) {
    wishlistContainer.innerHTML = "";

    wishlists.map((wishlist, index) => {
      let wishlistCard =
        `<div id="card" class="card">
       <img
       id="card-img"
         src="` +
        pageImage +
        `${wishlist.movieImage}"
         class="card-img"
         alt="${wishlist.movieName}"
       />
       <div id="card-body" class="card-body">
         <a href="` +
        pageRedirection +
        `${movies.findIndex(
          (movie) => movie.id == wishlists[index].id
        )}"><h2 class="name mt-0">${wishlist.movieName}</h2></a>
         <button class="watchlist-btn" onclick="unwishlistMovie(${index})">Quitar de Mi Lista</button>
       </div>
      </div>
      `;

      wishlistContainer.innerHTML += wishlistCard;
    });
  }
};

let categoriesUnique = [];
const removeDuplicates = () => {
  movies.forEach((movie) => {
    if (!categoriesUnique.includes(movie.category)) {
      categoriesUnique.push(movie.category);
    }
  });
  return categoriesUnique;
};

const categoriesList = () => {
  categoriesUnique.map((movieCategory) => {
    let categoryCard =
      `<h1 class="title">${movieCategory}</h1>
    <div class="movies-list">
      <button class="pre-btn"><img src="` +
      preImage +
      `/assets/pre.png"/></button>
      <button class="nxt-btn"><img src="` +
      nxtImage +
      `/assets/nxt.png"/></button>
      <div class="card-container">` +
      movies
        .map((movie, index) => {
          if (movie.category == movieCategory) {
            return (
              `<div id="card" class="card">
           <img
           id="card-img"
             src="` +
              pageImage +
              `${movie.movieImage}"
             class="card-img"
             alt="${movie.movieName}"
           />
           <div id="card-body" class="card-body">
             <a href="` +
              pageRedirection +
              `${index}"><h2 class="name mt-0">${movie.movieName}</h2></a>
             <button class="watchlist-btn" onclick="wishlistMovie(${index})">Añadir a Mi Lista</button>
           </div>
          </div>`
            );
          }
        })
        .join("") +
      `</div></div>`;
    if (categories) {
      categories.innerHTML += categoryCard;
    }
  });
};

window.wishlistMovie = (index) => {
  const wishlist = new Wishlist(
    movies[index].id,
    movies[index].movieName,
    movies[index].category,
    movies[index].description,
    movies[index].published,
    movies[index].movieImage,
    movies[index].movieVideo
  );
  if (!wishlists.includes(wishlist)) {
    wishlists.push(wishlist);
  }
  localStorage.setItem("wishlists", JSON.stringify(wishlists));
  wishlistMovieList();
};
window.unwishlistMovie = (index) => {
  wishlists.splice(index, 1);
  localStorage.setItem("wishlists", JSON.stringify(wishlists));
  wishlistMovieList();
};

highlightIndex();
wishlistMovieList();
removeDuplicates();
categoriesList();
