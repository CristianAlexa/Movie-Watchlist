import { getMoviesHtml, removeBtn } from "./utilities.js";

const savedListEl = document.getElementById("saved-list");
const noSavedMovies = `<li class="display-middle">Your watchlist is looking a little empty...</li>
<li>
  <a href="./index.html" class="add-movies">
    <img src="./images/add.svg" alt="" />Let’s add some movies!
  </a>
</li>
`;

const displaySavedMovies = () => {
  const savedMoviesFromLS = JSON.parse(localStorage.getItem("savedMovies"));
  savedListEl.innerHTML =
    savedMoviesFromLS.length === 0
      ? noSavedMovies
      : getMoviesHtml(savedMoviesFromLS, removeBtn);
  console.log(savedMoviesFromLS);
};

const removeFromLS = (e) => {
  if (e.target.dataset.id) {
    const movieID = e.target.dataset.id;
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    savedMovies = savedMovies.filter((movie) => movie.imdbID !== movieID);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    displaySavedMovies();
  }
};

savedListEl.addEventListener("click", removeFromLS);

displaySavedMovies();
