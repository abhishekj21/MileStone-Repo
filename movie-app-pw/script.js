// OMDB API Key (Replace with your own API key)
const apiKey = "93978407";
// Selecting necessary elements
const searchInput = document.getElementById("searchInput");
const movieList = document.getElementById("movieList");

// Function to fetch and display movies
async function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  // Check if the movie is found
  if (data.Response === "True") {
    displayMovies(data.Search);
  } else {
    displayError();
  }
}

// Function to display movie cards
function displayMovies(movies) {
  movieList.innerHTML = ""; // Clear previous results

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${
        movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
      }" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <button>Watch Now</button>
    `;

    movieList.appendChild(movieCard);
  });
}

// Function to display error if no movie is found
function displayError() {
  movieList.innerHTML = `<p>No movie found. Please try again!</p>`;
}

// Event listener for input field
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value;
  if (query.length > 2) {
    searchMovies(query);
  }
});
