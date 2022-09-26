
var searchFormEl = document.getElementById("search-form");

function searchWeather(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;






searchFormEl.addEventListener('submit', getWeather);


var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=63a94d459d52f9c7cb3b910e98b67749';



function getWeather() {

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

temp.innerHTML = `${weather.temperature.value} ° <span>F</span>`;

descrtt.innerHTML = weather.description;

location.innerHTML = `${weather.city}, ${weather.country}`;
})
console.log("button click");
};
}