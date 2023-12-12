function updateWeatherDetails(response) {
  let cityTemp = document.querySelector("#weather-temp-value");
  let cityName = document.querySelector(".weather-city");
  let weatherCondition = document.querySelector(".weather-condition");
  let humidityValue = document.querySelector("#humidity");
  let windValue = document.querySelector("#wind-speed");
  let timeValue = document.querySelector("#time-details");
  let date = new Date(response.data.time * 1000);
  let iconImage = document.querySelector("#icon");
  

  iconImage.innerHTML = `<img src=" ${response.data.condition.icon_url} "class="weather-icon">`;
  timeValue.innerHTML = formatDate(date);
  windspeed = response.data.wind.speed;
  windValue.innerHTML = `${windspeed}km/h`;
  humidity = response.data.temperature.humidity;
  humidityValue.innerHTML = `${humidity}%`;
  weatherCondition.innerHTML = response.data.condition.description;
  cityTemp.innerHTML = Math.round(response.data.temperature.current);
  cityName.innerHTML = response.data.city;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "314o3fa79375c2341f0ct1d3593ab8a2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherDetails);
}

function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);
searchCity("Tallinn");
