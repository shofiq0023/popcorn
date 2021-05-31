const resultDiv = document.querySelector('.resultDiv');
const searchForm = document.querySelector('.search-form');
const modalBody = document.querySelector('.modal-body');
const appKey = 'e8cff2b4';
let inputValue;

const getMovie = (e) => {
    e.preventDefault();
    let loading = 
    `<div class="text-center col-12 my-5">
        <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>`;
    resultDiv.innerHTML = loading;
    inputValue = document.querySelector('input').value;
    fetchApi(inputValue);
}

const fetchApi = async (input) => {
    let baseUrl = `https://www.omdbapi.com/?s=${input}&apikey=${appKey}`;
    let response = await fetch(baseUrl);
    let data = await response.json();
    generateHtml(data.Search)
}

const movieInfo = async (movieId) => {
    let baseUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=${appKey}`;
    let response = await fetch(baseUrl);
    let data = await response.json();
    generateModal(data);
}

const generateHtml = (data) => {
    let html = '';
    data.map(result => {
        html += 
        `
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 my-4">
            <div class="item text-white">
                <img src="${result.Poster}" alt="movie poster" class="img-fluid rounded w-100">
                <h4 class="title my-2">${result.Title}</h4>
                <p><span class="text-secondary">Release Year: </span>${result.Year}</p>
                <p class="text-capitalize"><span class="text-secondary">Type: </span>${result.Type}</p>
                <a href="#movie-info-modal" data-toggle="modal" data-backdrop="static" data-keyboard="false" onclick="movieInfo('${result.imdbID}')" class="btn btn-danger btn-custom mt-4">View More</a>
            </div>
        </div>
        `
    });

    resultDiv.innerHTML = html;
}

const generateModal = (movieData) => {
    let rating = '';
    movieData.Ratings.forEach(element => rating += 
        `
        <span>${element.Source}:</span>
        <h5 class="mb-2">${element.Value}</h5>
        `);
    
    let html = '';
    html +=
        `
        <div class="container-fluid">
            <div class="row mb-4">
                <div class="col-md-6">
                    <img src="${movieData.Poster}" alt="movie poster" class="img-fluid text-center w-100">
                </div>
                <div class="col-md-6">
                    <span class="text-info">Title:</span>
                    <h5 class="mb-3">${movieData.Title}</h5>
                    <span class="text-info">Release Date:</span>
                    <h5 class="mb-3">${movieData.Released}</h5>
                    <span class="text-info">Genre:</span>
                    <h5 class="mb-3">${movieData.Genre}</h5>
                    <span class="text-info">Director:</span>
                    <h5 class="mb-3">${movieData.Director}</h5>
                </div>
            </div>
            <div>
                <hr>
                <h4 class="mb-4">More Details</h4>
                <span class="text-info">Writter:</span>
                <h5 class="mb-3">${movieData.Writer}</h5>
                <span class="text-info">Actors:</span>
                <h5 class="mb-3">${movieData.Actors}</h5>
                <span class="text-info">Plot:</span>
                <h5 class="mb-3">${movieData.Plot}</h5>
                <span class="text-info">Runtime:</span>
                <h5 class="mb-3">${movieData.Runtime}</h5>
                <div class="ratings">
                    <h4 class="mb-3 mt-5 text-warning">Ratings</h4>
                    ${rating}
                </div>
            </div>
        </div>
        `;
    modalBody.innerHTML = html;
}

const resetModal = () => {
    let modalLoading =
    `
    <div class="text-center py-4 mx-3">
        <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `;
    modalBody.innerHTML = modalLoading;
}

searchForm.addEventListener('submit', getMovie);