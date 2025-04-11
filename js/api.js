const API_KEY = "b62d7b017c134440c87a5cf9ebbe0215";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function getPopularMovies(callback) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      callback(null, data);
    })
    .catch(function (error) {
      console.error("Error fetching popular movies:", error);
      callback(error, null);
    });
}

function getGenres(callback) {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      callback(null, data);
    })
    .catch(function (error) {
      console.error("Error fetching genres:", error);
      callback(error, null);
    });
}

function getMoviesByGenre(genreId, callback) {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log("Movie details:", data);

      callback(null, data);
    })
    .catch(function (error) {
      console.error("Error fetching movies by genre:", error);
      callback(error, null);
    });
}

function getMovieDetails(movieId, callback) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log("Movie details:", data);
      callback(null, data);
    })
    .catch(function (error) {
      console.error("Error fetching movie details:", error);
      callback(error, null);
    });
}
