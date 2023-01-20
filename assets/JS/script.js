let locationEl = document.getElementById("location");
let searchFormEl = document.getElementById("search-form");
let currentDateEl = document.getElementById("current-date");
let iconEl = document.getElementById("icon");
let tempEl = document.getElementById("temp");
let weatherDetailsEl = document.getElementById("weather-details");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let uviEl = document.getElementById("uv-index");
let extendedForecastEl = document.getElementsByClassName("five-day");
let pastSearches = document.getElementsByClassName("cities-holder");
let date1 = document.getElementById('date1');

// Checks if there's a previous search history and assigns it to the searchHistory variable. If there's no previous searchHistory array, it creates one with a list a cities
let searchHistory = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : ["New York","Chicago","Seattle", "Philadelphia", "Los Angeles", "San Francisco", "Austin", "Tampa"]

// Sets the dates using Moment
currentDateEl.innerHTML = moment().format("MMMM Do, YYYY")
date1.innerHTML = moment().add(1, 'days').format('dddd, MM/DD')
date2.innerHTML = moment().add(2, 'days').format('dddd, MM/DD')
date3.innerHTML = moment().add(3, 'days').format('dddd, MM/DD')
date4.innerHTML = moment().add(4, 'days').format('dddd, MM/DD')
date5.innerHTML = moment().add(5, 'days').format('dddd, MM/DD')

// Creates the function to use the searchHistory array to create buttons in the history section.
// TODO: The buttons aren't working. Examine the getWeather function to figure out the correct code.
function showSearchHistory () {  
	document.querySelector('.cities-holder').innerHTML=''
	for( i=0; i<searchHistory.length; i++ )
	document.querySelector('.cities-holder').innerHTML+=`
	<li onclick="getWeather('${searchHistory[i]}')"class="btn btn-secondary mb-1">${searchHistory[i]}</li>`
  
}
showSearchHistory();

// Grabs the user input and assigns it to a variable.
function getCity() {
  const newInput = document.getElementById("search-input");
  return newInput.value;
}

// Function to call the two APIs used. The first section gets the current weather, stores the search data (just the last 8) and populates some of the information to the page. The 2nd calls the one weather api and gets the lat and lon so we can get the extended forecast for the 5 day section.
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

        tempEl.innerHTML = `${Math.round(data.main.temp)} ° <span>F</span>`;

        weatherDetailsEl.innerHTML = `${data.weather[0].description}`;

        locationEl.innerHTML = `${data.name}`;

        humidityEl.innerHTML = `Humidity: ${data.main.humidity}%`;
        windSpeedEl.innerHTML = `Wind Speed: ${Math.round(data.wind.speed)}mph`

        // 2nd API call
        let { lat, lon } = data.coord;
        let coordUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=13e949235d9719a223ffce12e0abda18`;
        fetch(coordUrl).then(function (response) {
          if (response.ok) {
            return response
              .json()

              .then(function (data) {
              console.log(data);

              uviEl.innerHTML = `UV index: ${data.current.uvi}`
              
              // extendedForecastEl.innerHTML = 


          
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
