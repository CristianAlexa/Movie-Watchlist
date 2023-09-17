import { getErrorHtml, getMoviesHtml, addBtn } from "./utilities.js";

const APIkey = "apikey=a9af16cb";
const API = "https://www.omdbapi.com/";

const searchInputEl = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultEl = document.getElementById("search-results");
const savedMovies = JSON.parse(localStorage.getItem("savedMovies"))
  ? JSON.parse(localStorage.getItem("savedMovies"))
  : [];

const displaySearchResults = async (array) => {
  const moviesList = await getMovieDetails(array);
  searchResultEl.innerHTML = getMoviesHtml(moviesList, addBtn);
};

const getMovieToSave = async (id) => {
  const APIurl = `${API}?i=${id}&${APIkey}`;
  const res = await fetch(APIurl);
  const data = await res.json();
  savedMovies.push(data);
  localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
};

const getMoviesID = async () => {
  if (searchInputEl.value) {
    const searchInput = searchInputEl.value.split(" ").join("+");
    const APIurl = `${API}?s=${searchInput}&${APIkey}`;
    const res = await fetch(APIurl);
    const movieData = await res.json();
    const movieListID = movieData.Search;
    searchInputEl.value = "";
    return movieListID ? displaySearchResults(movieListID) : getErrorHtml();
  }
};

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

const saveToWatchlist = (e) => {
  if (e.target.dataset.id) {
    const movieID = e.target.dataset.id;
    getMovieToSave(movieID);
  }
};

searchBtn.addEventListener("click", getMoviesID);
searchResultEl.addEventListener("click", saveToWatchlist);
