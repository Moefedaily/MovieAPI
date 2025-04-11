document.addEventListener("DOMContentLoaded", () => {
  loadGenres();
  loadPopularMovies();
});

function loadPopularMovies() {
  getPopularMovies(function (error, data) {
    if (error) {
      showError(
        "movie-list",
        "Failed to load popular movies. Please try again later."
      );
      console.error("Error fetching popular movies:", error);
      return;
    }

    if (data && data.results) {
      displayMovies(data.results);

      const movieCards = document.querySelectorAll(".movie-card");
      for (let i = 0; i < movieCards.length; i++) {
        movieCards[i].addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");

          getMovieDetails(movieId, function (error, movieData) {
            if (error || !movieData) {
              showError(
                "movie-detail",
                "Failed to load movie details. Please try again later."
              );
              return;
            }

            displayMovieDetails(movieData);
          });
        });
      }

      const likeButtons = document.querySelectorAll(".like-button");
      for (let i = 0; i < likeButtons.length; i++) {
        likeButtons[i].addEventListener("click", function (event) {
          event.stopPropagation();
          const movieId = this.getAttribute("data-movie-id");
          console.log("Like button clicked for movie:", movieId);

          this.classList.toggle("liked");
          this.textContent = this.classList.contains("liked")
            ? "Liked"
            : "Like";
        });
      }
    } else {
      showError("movie-list", "No movies available at this time.");
    }
  });
}

function loadGenres() {
  getGenres(function (error, data) {
    if (error || !data || !data.genres) {
      console.error("Failed to load genres:", error);
      return;
    }

    console.log("Genres loaded:", data.genres);
    const genreSelect = createGenreDropdown(data.genres);
    if (genreSelect) {
      genreSelect.addEventListener("change", handleGenreChange);
      console.log("Event listener attached to genre select");
    }
  });
}

function handleGenreChange(event) {
  const genreId = event.target.value;
  const genreName = event.target.options[event.target.selectedIndex].text;

  const sectionTitle = document.querySelector(".section-title");

  if (sectionTitle) {
    sectionTitle.textContent = genreId
      ? `${genreName} Movies`
      : "Popular Movies";
  }

  if (!genreId) {
    loadPopularMovies();
    return;
  }

  getMoviesByGenre(genreId, function (error, data) {
    if (error) {
      showError("movie-list", "Failed to load movies. Please try again later.");
      return;
    }

    if (data && data.results) {
      displayMovies(data.results);
      const movieCards = document.querySelectorAll(".movie-card");
      for (let i = 0; i < movieCards.length; i++) {
        movieCards[i].addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");

          getMovieDetails(movieId, function (error, movieData) {
            if (error || !movieData) {
              showError(
                "movie-detail",
                "Failed to load movie details. Please try again later."
              );
              return;
            }

            displayMovieDetails(movieData);
          });
        });
      }

      const likeButtons = document.querySelectorAll(".like-button");
      for (let i = 0; i < likeButtons.length; i++) {
        likeButtons[i].addEventListener("click", function (event) {
          event.stopPropagation();
          const movieId = this.getAttribute("data-movie-id");
          console.log("Like button clicked for movie:", movieId);

          this.classList.toggle("liked");
          this.textContent = this.classList.contains("liked")
            ? "Liked"
            : "Like";
        });
      }
    } else {
      showError("movie-list", "No movies available for this genre.");
    }
  });
}
