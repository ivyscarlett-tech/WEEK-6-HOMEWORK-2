let apiKey = "f84focad66b46c3637d8a9tf61e1920f";

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector(".current-temperature-value");

  if (temperatureElement) {
    let currentTemperature = Math.round(response.data.temperature.current);
    temperatureElement.innerHTML = currentTemperature;
  } else {
    console.error("Could not find the temperature element on the page.");
  }
}

function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

let defaultCity = "London";
let initialApiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
axios.get(initialApiUrl).then(displayWeather);
