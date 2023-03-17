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

let date1 = document.getElementById("date1");
let historySearchBtn;

// Sets the dates using Moment
currentDateEl.innerHTML = moment().format("MMMM Do, YYYY");
date1.innerHTML = moment().add(1, "days").format("dddd <br>MM/DD");
date2.innerHTML = moment().add(2, "days").format("dddd<br>MM/DD");
date3.innerHTML = moment().add(3, "days").format("dddd<br>MM/DD");
date4.innerHTML = moment().add(4, "days").format("dddd<br>MM/DD");
date5.innerHTML = moment().add(5, "days").format("dddd<br>MM/DD");

// Grabs the user input and assigns it to a letiable.
function getCity() {
  let city = document.getElementById("search-input").value;
  return city;
}

function showSearchHistory() {
  // Get the search history from localStorage
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const historyContainer = document.querySelector(".cities-holder");
  historyContainer.innerHTML = "";

  // Only display the last 8 cities in the search history
  const startIndex = Math.max(searchHistory.length - 8, 0);
  const citiesToDisplay = searchHistory.slice(startIndex);

  // Loop through the search history and create a button for each item:
  for (let i = 0; i < citiesToDisplay.length; i++) {
    let historyCity = citiesToDisplay[i];
    const button = document.createElement("button");
    button.textContent = historyCity;
    button.classList.add("historySearchBtn");
    // Pass the city name to the getWeather function when the button is clicked
    button.addEventListener("click", function () {
      getWeather(historyCity);
    });
    historyContainer.appendChild(button);
  }
}

showSearchHistory();

function getWeather(cityName) {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  let newCity = cityName || getCity();
  console.log(newCity);
  searchHistory.push(newCity);
  searchHistory.splice;
  localStorage.searchHistory = JSON.stringify(searchHistory);
  showSearchHistory();
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=63a94d459d52f9c7cb3b910e98b67749&units=imperial`;
  fetch(requestUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);

        iconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>`;

        tempEl.innerHTML = `${Math.round(data.main.temp)}°F`;

        weatherDetailsEl.innerHTML = `${data.weather[0].description}`;

        locationEl.innerHTML = `${data.name}`;

        humidityEl.innerHTML = `Humidity: ${data.main.humidity}%`;
        windSpeedEl.innerHTML = `Wind Speed: ${Math.round(data.wind.speed)}mph`;

        // 2nd API call
        let { lat, lon } = data.coord;
        let coordUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=13e949235d9719a223ffce12e0abda18`;
        fetch(coordUrl).then(function (response) {
          if (response.ok) {
            return response
              .json()

              .then(function (data) {
                console.log(data);
                for (let i = 0; i < data.daily.length; i++) {
                  const dayData = data.daily[i];
                
                  // get references to the card elements
                  const card = document.getElementById(`day-${i}`);
                  const exIcon = card.querySelector(".card-icon");
                  const exTemp = card.querySelector(".card-temp");
                  const exDescription = card.querySelector(".card__description");
                  const exHum = card.querySelector(".card-hum");
                
                  // populate the card elements with data from the API
                  exIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${dayData.weather[0].icon}.png">`;
                  exTemp.textContent = `${Math.round(dayData.temp.day)}°F`;
                  exDescription.textContent = dayData.weather[0].description;
                  exHum.textContent = `Humidity: ${dayData.humidity}%`;
                }
             
              });
          }
        });
      });
    }
  });
}

// Call getWeather with a default city name when the app loads
window.addEventListener("load", function() {
  getWeather("New York");
});


searchFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  getWeather();
});

currentDateEl = moment().format("LL");

// Phase two: add photo api
// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://pexelsdimasv1.p.rapidapi.com/v1/search?query=seattle&locale=en-US&per_page=1&page=1",
// 	"method": "GET",
// 	"headers": {
// 		"Authorization": "2YQnzwx13CRJtq6dhF7Hj5jFTtxAn7JdKcFdYg3Fc8Nz70GYgKPnJSUD",
// 		"X-RapidAPI-Key": "e80b95076bmsha45acbf7c7c0d2cp1c74c9jsnddca0daf2fee",
// 		"X-RapidAPI-Host": "PexelsdimasV1.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });