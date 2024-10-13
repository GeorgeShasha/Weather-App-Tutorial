const apikey = "YOUR_API_KEY"; 

const weatherData = document.getElementById("weather-info");
const inputField = document.getElementById("city-input");
const searchBtn = document.getElementById("getWeather-btn");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = inputField.value;
  getWeatherData(city);
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);

      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const pressure = data.main.pressure;
      const details = [
        `Feels like: ${Math.round(data.main.feels_like)} °C`,
        `Humidity: ${humidity} %`,
        `Wind speed: ${wind} km/h`,
        `Pressure: ${pressure} hPa`,
      ];

      weatherData.querySelector(
        ".weather-icon"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;
      weatherData.querySelector(
        ".temperature"
      ).textContent = `${temperature} °C`;
      weatherData.querySelector(".weather-description").textContent =
        description;
      weatherData.querySelector(".weather-details").innerHTML = details
        .map((details) => `<div>${details}</div>`)
        .join("");
    }
  } catch (error) {
    weatherData.querySelector(".weather-icon").innerHTML = '';
    weatherData.querySelector(".temperature").textContent = '';
    weatherData.querySelector(".weather-description").textContent = 'An error occurred';
    weatherData.querySelector(".weather-details").innerHTML = '';
  }
}
