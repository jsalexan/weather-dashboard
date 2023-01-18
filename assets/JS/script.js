let locationEl = document.getElementById("location");
let searchFormEl = document.getElementById("search-form");
let currentDateEl = document.getElementById("current-date");
let iconEl = document.getElementById("icon");
let tempEl = document.getElementById("temp");
let weatherDetailsEl = document.getElementById("weather-details");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");

function getCity() {
  const newInput = document.getElementById("search-input");
  return newInput.value;
}

function getWeather() {
  const city = getCity();
  console.log(city);
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

icon.innerHTML = `<img src="icons/${weather.icon}.png"/>`;

temp.innerHTML = `${weather.temperature.value} ° <span>F</span>`;

description.innerHTML = weather.description;

location.innerHTML = `${weather.city}, ${weather.country}`;
