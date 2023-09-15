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
      (item) => `
  <li>${item.Title}</li>
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
