let locationEl = document.getElementById("location");
let searchFormEl = document.getElementById("search-form");
let currentDateEl = document.getElementById("current-date");
let iconEl = document.getElementById("icon");
let tempEl = document.getElementById("temp");
let weatherDetailsEl = document.getElementById("weather-details");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let uviEl = document.getElementById("uv-index");
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
  searchHistory.splice(8);
	localStorage.searchHistory=JSON.stringify(searchHistory)
	showSearchHistory()
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63a94d459d52f9c7cb3b910e98b67749&units=imperial`;
  fetch(requestUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);

        iconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>`;

        tempEl.innerHTML = `${data.main.temp} ° <span>F</span>`;

        weatherDetailsEl.innerHTML = `${data.weather[0].description}`;

        locationEl.innerHTML = `${data.name}`;

        humidityEl.innerHTML = `Humidity: ${data.main.humidity}%`;
        windSpeedEl.innerHTML = `Wind Speed: ${data.wind.speed}mph`


        let { lat, lon } = data.coord;
        let coordUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=13e949235d9719a223ffce12e0abda18`;
        fetch(coordUrl).then(function (response) {
          if (response.ok) {
            return response
              .json()

              .then(function (data) {
              console.log(data);
              uviEl.innerHTML = `UV index: ${data.current.uvi}`


          
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



currentDateEl = moment().format('LL');
