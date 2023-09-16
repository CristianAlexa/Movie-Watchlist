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
  searchResultEl.innerHTML = moviesList
    .map((movie) => {
      const { imdbID, Title, Poster, imdbRating, Runtime, Genre, Plot } = movie;
      return `
  <li>
    <div class="movie-card" id="${imdbID}">
        <div class="movie-card-image">
            <img src="${Poster}" alt="${Title}">
        </div>
        <div class="movie-card-details">
            <div class="movie-card-title">
                ${Title}
                <span class="movie-card-rating">
                    <img src="./images/star.svg">
                    ${imdbRating}
            </div>
            <ul class="movie-card-hl">
                <li>${Runtime}</li>
                <li>${Genre}</li>
                <li>
                    <button class="movie-card-add-btn">
                        <img src="./images/add.svg">Watchlist
                    </button>    
                </li>
            </ul>
            <p class="movie-card-plot">${Plot}</p>
        </div>
    </div>
  </li>
  `;
    })
    .join("");
}

async function getMovieData() {
  const searchInput = searchInputEl.value.split(" ").join("+");
  const APIurl = `${API}?s=${searchInput}&${APIkey}`;
  const res = await fetch(APIurl);
  const movieData = await res.json();
  const movieListID = movieData.Search;
  return movieListID ? getMoviesHtml(movieListID) : getErrorHtml();

  console.log(movieData);
  //   searchInputEl.value = "";
}

searchBtn.addEventListener("click", getMovieData);
