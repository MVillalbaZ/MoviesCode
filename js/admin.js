import { movies, highlights, auth } from "./data.js";
import { Movie, Highlight } from "./class.js";

const buttonModal1 = document.querySelector("#buttonModal1");
const myModal1 = new bootstrap.Modal(document.querySelector("#addMovieModal"));
let id = document.querySelector("#input1");
let movieName = document.querySelector("#input2");
let category = document.querySelector("#input3");
let description = document.querySelector("#input4");
let published = document.querySelector("#input5");
let movieImage = document.querySelector("#input6");
let movieVideo = document.querySelector("#input7");
let addMovieForm = document.querySelector("#addMovieForm");
let tBody = document.querySelector("tbody");
let movieUpdate = document.querySelector("#movieUpdate");
let content = document.querySelector("#main");
let button = document.querySelector("#logOut");

const saveMovie = (event) => {
  event.preventDefault();
  const movie = new Movie(
    id.value,
    movieName.value,
    category.value,
    description.value,
    published.value,
    movieImage.value,
    movieVideo.value
  );
  movies.push(movie);
  localStorage.setItem("movies", JSON.stringify(movies));
  document.querySelector("form").reset();
  id.focus();
  loadTable();
};

const loadTable = () => {
  tBody.innerHTML = "";
  movies.map((movie, index) => {
    let tRow = document.createElement("tr");
    let cells = `<td class="text-break td${index}">${movie.id}</td>
        <td class="text-break td${index}">${movie.movieName}</td>
        <td class="text-break td${index}">${movie.category}</td>
        <td class="text-break td${index}">${movie.description}</td>
        <td class="text-break td${index}">${movie.published}</td>
        <td class="text-break td${index}">
        <button class="btn btn-danger" onclick="deleteMovie(${index})">X<button>
        <button class="btn btn-primary" onclick="showModal2(${index})">M<button>
        <button class="btn btn-warning buttonHighlight-${index}" onclick="highlightMovie(${index}); highlightCell(${index})">⭐<button>
        </td>`;
    tRow.innerHTML = cells;
    tBody.append(tRow);
  });
};

window.deleteMovie = (index) => {
  let confirmation = confirm(
    `Esta seguro que quiere eliminar a ${movies[index].movieName}`
  );
  if (confirmation) {
    movies.splice(index, 1);
    localStorage.setItem("movies", JSON.stringify(movies));
    alert("El registro fue eliminado");
    loadTable();
  }
};

let movieIndex = null;
const myModal2 = new bootstrap.Modal(document.querySelector("#updateModal"));

window.showModal2 = (index) => {
  document.querySelector("#inputModal1").value = movies[index].id;
  document.querySelector("#inputModal2").value = movies[index].movieName;
  document.querySelector("#inputModal3").value = movies[index].category;
  document.querySelector("#inputModal4").value = movies[index].description;
  document.querySelector("#inputModal5").value = movies[index].published;
  document.querySelector("#inputModal6").value = movies[index].movieImage;
  document.querySelector("#inputModal7").value = movies[index].movieVideo;
  movieIndex = index;
  myModal2.show();
};

const updateMovie = (event) => {
  event.preventDefault();
  movies[movieIndex].id = document.querySelector("#inputModal1").value;
  movies[movieIndex].movieName = document.querySelector("#inputModal2").value;
  movies[movieIndex].category = document.querySelector("#inputModal3").value;
  movies[movieIndex].description = document.querySelector("#inputModal4").value;
  movies[movieIndex].published = document.querySelector("#inputModal5").value;
  movies[movieIndex].movieImage = document.querySelector("#inputModal6").value;
  movies[movieIndex].movieVideo = document.querySelector("#inputModal7").value;
  localStorage.setItem("movies", JSON.stringify(movies));
  myModal2.hide();
  loadTable();
};

window.highlightMovie = (index) => {
  const highlight = new Highlight(
    movies[index].id,
    movies[index].movieName,
    movies[index].category,
    movies[index].description,
    movies[index].published,
    movies[index].movieImage,
    movies[index].movieVideo
  );
  highlights.splice(0);
  highlights.push(highlight);
  localStorage.setItem("highlights", JSON.stringify(highlights));
  loadTable();
};

window.highlightCell = (index) => {
  const buttonHighlight = document.querySelector(`.buttonHighlight-${index}`);
  const rowHighlights = document.querySelectorAll(`.td${index}`);
  buttonHighlight.classList = `btn btn-dark buttonHighlight-${index} buttonUnhighlight`;
  for (const cell of rowHighlights) {
    cell.classList.add("bg-warning", "tdUnhighlight");
  }
};

if (!auth) {
  button.classList = "d-none";
  content.innerHTML = "";
  let message = document.createElement("div");
  message.classList = "alert alert-danger";
  message.role = "alert";
  message.innerText =
    "Lo siento, no tiene permisos para acceder a esta sección";
  content.append(message);
}

const closeSession = () => {
  localStorage.removeItem("auth");
  location.replace("/");
};

button.addEventListener("click", closeSession);

buttonModal1.addEventListener("click", () => {
  myModal1.show();
});
addMovieForm.addEventListener("submit", () => {
  saveMovie(event);
});
if (movieUpdate) {
  movieUpdate.addEventListener("submit", () => {
    updateMovie(event);
  });
}

loadTable();
