function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.setAttribute("data-id", movie.id);

  let posterUrl = `${IMAGE_BASE_URL}w500${movie.poster_path}`;

  let relaeaseDate = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  card.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h2 class="movie-title">${movie.title}</h2>
            <p class="movie-release-date">Release Date: ${relaeaseDate}</p>
            <button class="like-button"data-movie-id="${movie.id}">Like</button>
        </div>
    `;

  return card;
}

function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");

  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    movieList.appendChild(movieCard);
  });
}

/************************************************************************************/

function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.innerHTML = `<div class="error">${message || "An error occurred"}</div>`;
}

/************************************************************************************/

function createGenreDropdown(genres) {
  const searchContainer = document.getElementById("search-container");

  if (!searchContainer) {
    console.error("Container not found:", containerId);
    return null;
  }
  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "genre-dropdown-container";

  const label = document.createElement("label");
  label.setAttribute("for", "genre-select");
  label.textContent = "Filter by Genre:";

  const select = document.createElement("select");
  select.id = "genre-select";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "All Genres";
  select.appendChild(defaultOption);

  for (let i = 0; i < genres.length; i++) {
    const option = document.createElement("option");
    console.log(genres[i].id);
    option.value = genres[i].id;
    option.textContent = genres[i].name;
    select.appendChild(option);
  }

  dropdownContainer.appendChild(label);
  dropdownContainer.appendChild(select);
  searchContainer.appendChild(dropdownContainer);

  return select;
}

/************************************************************************************/

function displayMovieDetails(movie) {
  const searchContainer = document.getElementById("search-container");
  const movieListSection = document.getElementById("movie-list");
  const movieDetailSection = document.getElementById("movie-detail");
  const sectionTitle = document.querySelector(".section-title");

  searchContainer.classList.add("hidden");
  movieListSection.classList.add("hidden");
  sectionTitle.classList.add("hidden");
  movieDetailSection.classList.remove("hidden");

  let backdropUrl = `${IMAGE_BASE_URL}w1280${movie.backdrop_path}`;

  let posterUrl = `${IMAGE_BASE_URL}w500${movie.poster_path}`;
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  runtimeText = `${hours}h ${minutes}m`;

  let genreHtml = "";
  genreHtml = movie.genres
    .map((genre) => `<span class="genre-tag">${genre.name}</span>`)
    .join("");

  releaseYear = new Date(movie.release_date).getFullYear();

  let ratingHtml = "";
  const rating = movie.vote_average.toFixed(1);
  ratingHtml = `
            <div class="movie-rating">
                <span class="rating-value">${rating}</span>/10
            </div>
        `;

  const detailsHtml = `
        <div class="backdrop-container">
            <div class="backdrop" style="background-image: url('${backdropUrl}')">
                <div class="backdrop-overlay"></div>
            </div>
        </div>
        
        <button class="back-button" id="back-to-movies"><i class="fa-solid fa-hand-point-left"></i> Back to Movies</button>
        
        <div class="container">
        <div class="movie-detail-content">
            <div class="movie-poster-container">
                <img src="${posterUrl}" alt="${movie.title}" class="detail-poster">
            </div>
            
            <div class="movie-info-container">
                <div class="movie-header">
                    <h1 class="movie-title">${movie.title}</h1>
                    <div class="movie-meta">
                        <span class="release-year">${releaseYear}</span>
                        <span class="separator">•</span>
                        <span class="runtime">${runtimeText}</span>
                    </div>
                    ${ratingHtml}
                </div>
                
                <div class="genre-container">
                    ${genreHtml}
                </div>
                
                <div class="movie-overview">
                    <h3>Overview</h3>
                    <p>${movie.overview || "No overview available."}</p>
                </div>
            </div>
        </div>
        
        <div class="cast-section">
            <h3>Cast</h3>
            <div class="cast-list" id="cast-list">
                ${displayCastMembers(movie.credits.cast)}
            </div>
        </div>
        </div>
    `;

  movieDetailSection.innerHTML = detailsHtml;

  document
    .getElementById("back-to-movies")
    .addEventListener("click", function () {
      movieDetailSection.classList.add("hidden");
      movieListSection.classList.remove("hidden");
      searchContainer.classList.remove("hidden");
      sectionTitle.classList.remove("hidden");
    });
}

/************************************************************************************/

function displayCastMembers(cast, limit = 10) {
  if (!cast || cast.length === 0) {
    return '<p class="no-cast">No cast information available.</p>';
  }

  const mainCast = cast.slice(0, limit);

  return mainCast
    .map((person) => {
      let profileUrl = "https://via.placeholder.com/185x278?text=No+Image";
      if (person.profile_path) {
        profileUrl = `${IMAGE_BASE_URL}w185${person.profile_path}`;
      }

      return `
            <div class="cast-member" data-id="${person.id}">
                <img src="${profileUrl}" alt="${person.name}" class="cast-photo">
                <div class="cast-info">
                    <p class="cast-name">${person.name}</p>
                    <p class="character">${person.character}</p>
                </div>
            </div>
        `;
    })
    .join("");
}
