const addBtn = `<img src="./images/add.svg">Watchlist`;
const removeBtn = `<img src="./images/remove.svg">Remove`;

const getErrorHtml = () => {
  searchResultEl.innerHTML = `
          <div class="start display-middle">
            <p class="error">Unable to find what you’re looking for. Please try another search.</p>
          </div>`;
};

const getMoviesHtml = (movieList, btn) => {
  return movieList
    .map((movie) => {
      const { imdbID, Title, Poster, imdbRating, Runtime, Genre, Plot } = movie;
      return `
                <li class="movie-item">
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
                                <button class="movie-card-add-btn" data-id="${imdbID}">
                                    ${btn}
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
};

export { getErrorHtml, getMoviesHtml, addBtn, removeBtn };
