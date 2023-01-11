let searchButton = document.getElementById("search-button");
let location = document.getElementById("location");
let currentDate = document.getElementById("current-date");
let icon = document.getElementById("icon");
let temp = document.getElementById("temp");
let weatherDetails = document.getElementById("weather-details");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");
let uvIndex = document.getElementById("uv-index");






function getCity() {
  const newInput=document.getElementById("search-input")
  

  






searchFormEl.addEventListener('submit', getCity);



}


function getWeather() {
  let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=63a94d459d52f9c7cb3b910e98b67749&units=imperial';
fetch(requestUrl)
  .then(function (response) {
    if (response.ok) { 
    return response.json()
  
  .then(function (data) {
    console.log(data);

})

};
})
}


// icon.innerHTML = `<img src="icons/${weather.icon}.png"/>`;

// temp.innerHTML = `${weather.temperature.value} ° <span>F</span>`;

// description.innerHTML = weather.description;

// location.innerHTML = `${weather.city}, ${weather.country}`;
getWeather();