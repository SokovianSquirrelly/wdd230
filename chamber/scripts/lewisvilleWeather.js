const currentTemp = document.querySelector("#temperature");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#weather-desc");

const forecastDay1 = document.querySelector("#forecast-day-1");
const forecastDay2 = document.querySelector("#forecast-day-2");
const forecastDay3 = document.querySelector("#forecast-day-3");

let lastTimestamp = 0;

const weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=43.69&lon=-112.01&appid=c2448f82676f1c51f8aad097f7b429bc&units=imperial";

const forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=43.69&lon=-112.01&appid=c2448f82676f1c51f8aad097f7b429bc&units=imperial";

async function apiFetchCurrentWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("recentWeatherData", JSON.stringify(data));
      displayCurrentResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function apiFetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("recentForecastData", JSON.stringify(data));
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrentResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].main;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);
  captionDesc.textContent = `${desc}`;
}

function displayForecast(data) {
  const high1 = document.createElement("p");
  const low1 = document.createElement("p");

  const day2Statement = document.createElement("h4");
  const high2 = document.createElement("p");
  const low2 = document.createElement("p");

  const day3Statement = document.createElement("h4");
  const high3 = document.createElement("p");
  const low3 = document.createElement("p");

  const ONE_DAY = 86400000;

  const periodicForecasts = data.list;
  console.log(periodicForecasts);
  let day1Temps = [];
  let day2Temps = [];
  let day3Temps = [];

  const currentTimestamp = Date.now();

  const day1Date = new Date(currentTimestamp + ONE_DAY).getDate();
  const day2Date = new Date(currentTimestamp + ONE_DAY + ONE_DAY).getDate();
  const day3Date = new Date(
    currentTimestamp + ONE_DAY + ONE_DAY + ONE_DAY
  ).getDate();

  // console.log(day1Date);
  // console.log(day2Date);
  // console.log(day3Date);

  periodicForecasts.forEach((forecast) => {
    let forecastDay = new Date(forecast.dt * 1000).getDate();

    if (forecastDay == day1Date) {
      day1Temps.push(forecast.main.temp);
    }
    if (forecastDay == day2Date) {
      day2Temps.push(forecast.main.temp);
    }
    if (forecastDay == day3Date) {
      day3Temps.push(forecast.main.temp);
    }
  });

  day2Statement.textContent = `Forecast for ${displayWeekday(new Date(currentTimestamp + ONE_DAY + ONE_DAY).getDay())}`;
  day3Statement.textContent = `Forecast for ${displayWeekday(new Date(currentTimestamp + ONE_DAY + ONE_DAY + ONE_DAY).getDay())}`;

  high1.textContent = `High: ${Math.max(...day1Temps)}°F`;
  low1.textContent = `Low: ${Math.min(...day1Temps)}°F`;

  high2.textContent = `High: ${Math.max(...day2Temps)}°F`;
  low2.textContent = `Low: ${Math.min(...day2Temps)}°F`;

  high3.textContent = `High: ${Math.max(...day3Temps)}°F`;
  low3.textContent = `Low: ${Math.min(...day3Temps)}°F`;

  forecastDay1.appendChild(high1);
  forecastDay1.appendChild(low1);

  forecastDay2.appendChild(day2Statement);
  forecastDay2.appendChild(high2);
  forecastDay2.appendChild(low2);

  forecastDay3.appendChild(day3Statement);
  forecastDay3.appendChild(high3);
  forecastDay3.appendChild(low3);
}

function displayWeekday(dayOfWeekNumber) {
  let weekday = "";

  switch (dayOfWeekNumber) {
    case 0:
      weekday = "Sunday";
      break;
    case 1:
      weekday = "Monday";
      break;
    case 2:
      weekday = "Tuesday";
      break;
    case 3:
      weekday = "Wednesday";
      break;
    case 4:
      weekday = "Thursday";
      break;
    case 5:
      weekday = "Friday";
      break;
    case 6:
      weekday = "Saturday";
      break;
  }

  return weekday;
}

function checkTime() {
  if (localStorage.getItem("visitTimestampHome")) {
    lastTimestamp = parseInt(localStorage.getItem("visitTimestampHome"));
    let currentTimestamp = Date.now();
    timeDifference = currentTimestamp - lastTimestamp;

    if (timeDifference > 3600000) {
      lastTimestamp = currentTimestamp;
      localStorage.setItem("visitTimestampHome", lastTimestamp);
      apiFetchCurrentWeather();
      apiFetchForecast();
    } else {
      displayCurrentResults(
        JSON.parse(localStorage.getItem("recentWeatherData"))
      );
      displayForecast(JSON.parse(localStorage.getItem("recentForecastData")));
    }
  } else {
    localStorage.setItem("visitTimestampHome", Date.now());
    apiFetchCurrentWeather();
    apiFetchForecast();
  }
}

checkTime();
