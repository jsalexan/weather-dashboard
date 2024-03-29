let locationEl = document.getElementById("location");
let searchFormEl = document.getElementById("search-form");
let currentDateEl = document.getElementById("current-date");
let iconEl = document.getElementById("icon");
let tempEl = document.getElementById("temp");
let weatherDetailsEl = document.getElementById("weather-details");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");

let extendedForecastEl = document.getElementsByClassName("five-day");
let weatherPhotoEl = document.getElementById("weather-pic");

let date1 = document.getElementById("date1");
let historySearchBtn;

// Sets the dates using Moment
currentDateEl.innerHTML = moment().format("MMMM Do, YYYY");
date1.innerHTML = moment().add(1, "days").format("dddd <br>MM/DD");
date2.innerHTML = moment().add(2, "days").format("dddd<br>MM/DD");
date3.innerHTML = moment().add(3, "days").format("dddd<br>MM/DD");
date4.innerHTML = moment().add(4, "days").format("dddd<br>MM/DD");
date5.innerHTML = moment().add(5, "days").format("dddd<br>MM/DD");

document.addEventListener("DOMContentLoaded", function () {
  // Grabs the user input and assigns it to a letiable.
  function getCity() {
    let city = document.getElementById("search-input").value;
    return city;
  }

  function showSearchHistory() {
    // Get the search history from localStorage
    const searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];

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
          locationEl.innerHTML = `${data.name}`;

          // 2nd API call
          let { lat, lon } = data.coord;
          let coordUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=13e949235d9719a223ffce12e0abda18`;
          fetch(coordUrl).then(function (response) {
            if (response.ok) {
              return response
                .json()

                .then(function (data) {
                  console.log(data);

                  // Current weather information
                  iconEl.innerHTML = `<img src="http://openweathermap.org/img/w/${data.current.weather[0].icon}.png"/>`;

                  tempEl.innerHTML = `${Math.round(data.current.temp)}°F`;

                  weatherDetailsEl.innerHTML = `${data.current.weather[0].description}`;

                  humidityEl.innerHTML = `Humidity: ${data.current.humidity}%`;
                  windSpeedEl.innerHTML = `Wind Speed: ${Math.round(
                    data.current.wind_speed
                  )}mph`;

                  let uvEl = document.getElementById("uv-level");
                  uvEl.innerHTML = `${Math.round(data.current.uvi)}`;
                  // Get warning colors for UV levels
                  uvEl.classList.remove(
                    "low",
                    "moderate",
                    "high",
                    "very-high",
                    "extreme"
                  );

                  let uvLevel = Math.round(data.current.uvi);
                  if (uvLevel < 3) {
                    uvEl.classList.add("low");
                  } else if (uvLevel < 6) {
                    uvEl.classList.add("moderate");
                  } else if (uvLevel < 8) {
                    uvEl.classList.add("high");
                  } else if (uvLevel < 11) {
                    uvEl.classList.add("very-high");
                  } else {
                    uvEl.classList.add("extreme");
                  }

                  // Cloudy weather image  TODO: ADD MORE IMAGES FOR OVERCAST etc.
                  if (
                    data.current.weather[0].id === 802 ||
                    data.current.weather[0].id === 801 ||
                    data.current.weather[0].id === 803
                  ) {
                    weatherPhotoEl.innerHTML = `<img src = "./assets/images/BROKEN-CLOUDS.png">`;

                    // Overcast image
                  } else if (data.current.weather[0].id === 804) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/OVERCAST.png">`;

                    // Clear sky weather image
                  } else if (data.current.weather[0].id === 800) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/CLEAR-SKY.png">`;

                    // Rainy weather image
                  } else if (
                    data.current.weather[0].id === 500 ||
                    data.current.weather[0].id === 501 ||
                    data.current.weather[0].id === 502 ||
                    data.current.weather[0].id === 503 ||
                    data.current.weather[0].id === 504 ||
                    data.current.weather[0].id === 511 ||
                    data.current.weather[0].id === 520 ||
                    data.current.weather[0].id === 521 ||
                    data.current.weather[0].id === 522 ||
                    data.current.weather[0].id === 531
                  ) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/RAIN.png">`;

                    // DRIZZLE WEATHER IMAGE
                  } else if (
                    data.current.weather[0].id === 300 ||
                    data.current.weather[0].id === 301 ||
                    data.current.weather[0].id === 302 ||
                    data.current.weather[0].id === 310 ||
                    data.current.weather[0].id === 311 ||
                    data.current.weather[0].id === 312 ||
                    data.current.weather[0].id === 313 ||
                    data.current.weather[0].id === 314 ||
                    data.current.weather[0].id === 321
                  ) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/DRIZZLE.png">`;

                    // Snowy weather image
                  } else if (
                    data.current.weather[0].id === 600 ||
                    data.current.weather[0].id === 601 ||
                    data.current.weather[0].id === 602 ||
                    data.current.weather[0].id === 611 ||
                    data.current.weather[0].id === 612 ||
                    data.current.weather[0].id === 613 ||
                    data.current.weather[0].id === 615 ||
                    data.current.weather[0].id === 616 ||
                    data.current.weather[0].id === 620 ||
                    data.current.weather[0].id === 621 ||
                    data.current.weather[0].id === 622
                  ) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/SNOW.png">`;

                    // THUNDERSTORM IMAGE
                  } else if (
                    data.current.weather[0].id === 200 ||
                    data.current.weather[0].id === 201 ||
                    data.current.weather[0].id === 202 ||
                    data.current.weather[0].id === 210 ||
                    data.current.weather[0].id === 211 ||
                    data.current.weather[0].id === 212 ||
                    data.current.weather[0].id === 221 ||
                    data.current.weather[0].id === 230
                  ) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/THUNDERSTORM.png">`;

                    // MIST IMAGE
                  } else if (data.current.weather[0].id === 701) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/MIST.png">`;

                    // SMOKE IMAGE
                  } else if (data.current.weather[0].id === 711) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/SMOKE.png">`;

                    // HAZE IMAGE
                  } else if (data.current.weather[0].id === 721) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/HAZE.png">`;

                    // DUST IMAGE
                  } else if (
                    data.current.weather[0].id === 731 ||
                    data.weather[0].id === 761
                  ) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/DUST.png">`;

                    // FOG IMAGE
                  } else if (data.current.weather[0].id === 741) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/FOG.png">`;

                    // SAND IMAGE
                  } else if (data.current.weather[0].id === 751) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/SAND.png">`;

                    // ASH IMAGE
                  } else if (data.current.weather[0].id === 762) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/ASH.png">`;

                    // SQUALL IMAGE
                  } else if (data.current.weather[0].id === 771) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/SQUALLS.png">`;

                    // TORNADO IMAGE
                  } else if (data.current.weather[0].id === 781) {
                    weatherPhotoEl.innerHTML = `<img src="./assets/images/TORNADO.png">`;

                    // Render yellow rectangle.
                  } else {
                    weatherPhotoEl.innerHTML = "";
                  }

                  // 5 day forecast section
                  const cards = document.querySelectorAll(".fiveDay");

                  for (
                    let i = 0;
                    i < data.daily.length && i < cards.length;
                    i++
                  ) {
                    const dayData = data.daily[i];
                    const card = cards[i];

                    const exIcon = card.querySelector(".card-icon");
                    const exTemp = card.querySelector(".card-temp");
                    const exDescription =
                      card.querySelector(".card__description");
                    const exHum = card.querySelector(".card-hum");

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

  const uvColor = (current) => {
    const uv = data.current.uvi;
    if (uv > 11) {
      uvEl.setAttribute("style", "background-color: none");
    } else if (uv > 8) {
      uvEl.setAttribute("style", "background-color: red");
    } else if (uv > 6) {
      uvEl.setAttribute("style", "background-color: orange");
    } else if (uv > 3) {
      uvEl.setAttribute("style", "background-color: red");
    } else {
      uvEl.setAttribute("style", "background-color: green");
    }
  };

  // Call getWeather with a default city name when the app loads
  window.addEventListener("load", function () {
    getWeather("New York");
  });

  searchFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather();
  });

  currentDateEl = moment().format("LL");
});
