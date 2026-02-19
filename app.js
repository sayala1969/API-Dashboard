const dogOutput = document.getElementById('dog-output');
const catOutput = document.getElementById('cat-output');
const weatherOutput = document.getElementById('weather-output');
const currencyOutput = document.getElementById('currency-output');
const moviesOutput = document.getElementById('movies-output');
const gitHubOutput = document.getElementById('github-output');
const jokeOutput = document.getElementById('joke-output');
const publicApiOutput = document.getElementById('publicapi-output');

async function getDogImage() {

    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    const img = document.createElement('img');
    img.src = data.message;
    document.getElementById('dog-output').appendChild(img);}


async function getCatImage() {

        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        data.forEach((imageObject) => {

        const img = document.createElement('img');
        img.src = imageObject.url;

        document.getElementById('cat-output').appendChild(img);
    });
}       


async function getWeather() {

        const city = prompt('Enter a city name:');
        if (!city) return;

        const apiKey = '77c0b2ffa5ccc2b1c41b5031f8c64005';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherInfo = `
                <h3>Weather in ${data.name}</h3>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById('weather-output').innerHTML = weatherInfo;
        } else {
            document.getElementById('weather-output').innerHTML = `<p>${data.message}</p>`;
        }
    } 


async function getExchangeRate() { 
     
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const exchangeRateInfo = `
            <h3>Exchange Rates (Base: ${data.base})</h3>
            <p>EUR: ${data.rates.EUR}</p>
            <p>GBP: ${data.rates.GBP}</p>
            <p>JPY: ${data.rates.JPY}</p>
        `;
        document.getElementById('currency-output').innerHTML = exchangeRateInfo;
    } 

async function getMovies() {

        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=4bcf6977ecb553fb1c34778771175ef2');
        const data = await response.json();
        const moviesList = data.results.map(movie => `<li>${movie.title}</li>`).join('');
        document.getElementById('movies-output').innerHTML = `<h3>Popular Movies</h3><ul>${moviesList}</ul>`;
    } 

async function getGitHubUser() {

        const username = prompt('Enter a GitHub username:');
        if (!username) return;

        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
console.log(data);
        if (data.message !== 'Not Found') {
            const userInfo = `
                <h3>${data.login}</h3>
                <img src="${data.avatar_url}" alt="${data.login}'s avatar" class="github-avatar">
                <p>Public Repos: ${data.public_repos}</p>
                <p>Followers: ${data.followers}</p>
            `;
            document.getElementById('github-output').innerHTML = userInfo;
        } else {
            document.getElementById('github-output').innerHTML = `<p>User not found</p>`;
        }
    } 

    
async function getJoke() {

        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        const joke = `
            <h3>Here's a joke for you:</h3>
            <p>${data.setup}</p>
            <p><em>${data.punchline}</em></p>
        `;
        document.getElementById('joke-output').innerHTML = joke;
    } 


async function getPublicApiInfo() {
        try{
            const response = await fetch('https://api.publicapis.org/entries');
            const data = await response.json();
            const apiList = data.entries.slice(0, 10).map(api => `<li>${api.API} - ${api.Description}</li>`).join('');
            document.getElementById('publicapi-output').innerHTML = `<h3>Public APIs</h3><ul>${apiList}</ul>`;
        }catch(error){
            document.getElementById('publicapi-output').innerHTML = `<p>Error fetching public APIs: ${error.message}</p>`;
        }
    } 