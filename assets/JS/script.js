let locationEl = document.getElementById("location");
let searchFormEl = document.getElementById("search-form");
let currentDateEl = document.getElementById("current-date");
let iconEl = document.getElementById("icon");
let tempEl = document.getElementById("temp");
let weatherDetailsEl = document.getElementById("weather-details");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let pastSearches = document.getElementsByClassName("cities-holder");
let searchHistory = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : []

function showSearchHistory () {
	document.querySelector('.cities-holder').innerHTML=''
	for( i=0; i<searchHistory.length; i++ )
	document.querySelector('.cities-holder').innerHTML+=`
	<li onclick="weatherResults('${searchHistory[i]}')"class="btn btn-secondary mb-1">${searchHistory[i]}</li>`
}

showSearchHistory();


function getCity() {
  const newInput = document.getElementById("search-input");
  return newInput.value;
}

function getWeather() {
  const city = getCity();
  console.log(city);
  searchHistory.push(city)
	localStorage.searchHistory=JSON.stringify(searchHistory)
	showSearchHistory()
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63a94d459d52f9c7cb3b910e98b67749&units=imperial`;
  fetch(requestUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);

        let { lat, lon } = data.coord;
        let coordUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=13e949235d9719a223ffce12e0abda18`;
        fetch(coordUrl).then(function (response) {
          if (response.ok) {
            return response
              .json()

              .then(function (data) {
                console.log(data);
              });
          }
        });
      });
    }
  });
}

searchFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  getWeather();
});

iconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}.png"/>`;

tempEl.innerHTML = `${weather.temperature.value} ° <span>F</span>`;

descriptionEl.innerHTML = weather.description;

locationEl.innerHTML = `${weather.city}, ${weather.country}`;

currentDateEl = moment().format('LL');
