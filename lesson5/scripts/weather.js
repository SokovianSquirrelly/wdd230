const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

let lastTimestamp = 0;

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.64&appid=c2448f82676f1c51f8aad097f7b429bc&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("recentWeatherData", JSON.stringify(data));
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].main;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);
  captionDesc.textContent = `${desc}`;
}

function checkTime() {
  if (localStorage.getItem("visitTimestamp")) {
    lastTimestamp = parseInt(localStorage.getItem("visitTimestamp"));
    let currentTimestamp = Date.now();
    timeDifference = currentTimestamp - lastTimestamp;

    if (timeDifference > 3600000) {
      lastTimestamp = currentTimestamp;
      localStorage.setItem("visitTimestamp", lastTimestamp);
      apiFetch();
    } else {
      displayResults(JSON.parse(localStorage.getItem("recentWeatherData")));
    }
  } else {
    localStorage.setItem("visitTimestamp", Date.now());
    apiFetch();
  }
}

checkTime();
