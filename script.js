document.addEventListener("DOMContentLoaded", () => {
    const directorForm = document.getElementById('director-form');
    const movieList = document.getElementById('movie-list');

    let directors = JSON.parse(localStorage.getItem('directors')) || {};

    // Function to display all directors and their movies with delete buttons
    function displayAllDirectors() {
        movieList.innerHTML = '';
        for (const director in directors) {
            const directorHeader = document.createElement('h3');
            directorHeader.textContent = director;
            movieList.appendChild(directorHeader);

            const movies = directors[director];
            movies.forEach((movieData, index) => {
                const li = document.createElement('li');
                li.textContent = `${movieData.movie} ${movieData.rating}/10`;

                // Create a delete button for each movie
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', () => deleteMovie(director, index));

                li.appendChild(deleteButton);
                movieList.appendChild(li);
            });
        }
    }

    // Function to save directors and movies to localStorage
    function saveDirector(directorName, movies) {
        directors[directorName] = movies;
        localStorage.setItem('directors', JSON.stringify(directors));
    }

    // Function to delete a movie from a director's list
    function deleteMovie(directorName, movieIndex) {
        directors[directorName].splice(movieIndex, 1);
        if (directors[directorName].length === 0) {
            delete directors[directorName]; // Delete director if no movies left
        }
        saveDirector(directorName, directors[directorName]);
        displayAllDirectors();
    }

    // Event listener for form submission
    directorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const directorInput = document.getElementById('director').value.trim();
        const movieInput = document.getElementById('movie').value.trim();
        const ratingInput = parseInt(document.getElementById('rating').value.trim());

        if (directorInput && movieInput && ratingInput >= 1 && ratingInput <= 10) {
            if (!directors[directorInput]) {
                directors[directorInput] = [];
            }

            const movieData = { movie: movieInput, rating: ratingInput };
            directors[directorInput].push(movieData);

            directors[directorInput].sort((a, b) => b.rating - a.rating);
            saveDirector(directorInput, directors[directorInput]);

            displayAllDirectors();

            document.getElementById('movie').value = '';
            document.getElementById('rating').value = '';
        }
    });

    // Initial display of all directors and their movies
    displayAllDirectors();
});
