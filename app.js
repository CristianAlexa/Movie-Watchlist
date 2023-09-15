const APIkey = "apikey=a9af16cb";
const API = "https://www.omdbapi.com/";

const searchInputEl = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultEl = document.getElementById("search-results");
const savedListEl = document.getElementById("saved-list");

function getErrorHtml() {
  searchResultEl.innerHTML = `
        <div class="start">
          <p>Unable to find what you’re looking for. Please try another search.</p>
        </div>`;
}

const getMovieDetails = async (array) => {
  const movieAllDetails = [];
  for (const movie of array) {
    const movieID = movie.imdbID;
    const APIurl = `${API}?i=${movieID}&${APIkey}`;
    const res = await fetch(APIurl);
    const data = await res.json();
    movieAllDetails.push(data);
  }
  return movieAllDetails;
};

async function getMoviesHtml(array) {
  const moviesList = await getMovieDetails(array);
  console.log(moviesList);
  searchResultEl.innerHTML = moviesList
    .map(
      (movie) => `
  <li>
    <div class="movie-card" id="${movie.imdbID}">
        <div class="movie-card-image">
            <img src="${movie.Poster}" alt="${movie.Title}">
        </div>
        <div class="movie-card-details">
            <div class="movie-card-title">
                ${movie.Title}
                <span class="movie-card-rating">
                    <img src="./images/star.svg">
                    ${movie.imdbRating}
            </div>
            <ul class="movie-card-hl">
                <li>${movie.Runtime}</li>
                <li>${movie.Genre}</li>
                <li>
                    <button class="movie-card-add-btn">
                        <img src="./images/add.svg">Watchlist
                    </button>    
                </li>
            </ul>
            <p class="movie-card-plot">${movie.Plot}</p>
        </div>
    </div>
  </li>
  `
    )
    .join("");
}

async function getMovieData() {
  const searchInput = searchInputEl.value.split(" ").join("+");
  const APIurl = `${API}?s=${searchInput}&${APIkey}`;
  const res = await fetch(APIurl);
  const movieData = await res.json();
  const movieList = movieData.Search;
  return movieList ? getMoviesHtml(movieList) : getErrorHtml();

  console.log(movieData);
  //   searchInputEl.value = "";
}

searchBtn.addEventListener("click", getMovieData);
