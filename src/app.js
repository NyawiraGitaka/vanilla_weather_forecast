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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "314o3fa79375c2341f0ct1d3593ab8a2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
 let forecastHtml = " ";
 
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="weather-forecast-day">
          <div class="weather-forecast-date"> ${formatDay(day.time)}</div>
          <div> <img class="weather-forecast-icon" src="${day.condition.icon_url}">
          </div>
          <div class="weather-forecast-temps">
            <span class="forecast-weather-max">
              ${Math.round(day.temperature.maximum)}°
            </span> 
            <span class="forecast-weather-min">
              ${Math.round(day.temperature.minimum)}°
            </span>
          </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);
searchCity("Tallinn");
