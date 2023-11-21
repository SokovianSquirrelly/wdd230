const currentTemp = document.querySelector("#temperature");
const weatherIcon = document.querySelector("#icon-weather");
const captionDesc = document.querySelector("#weather");

let lastTimestamp = 0;

const weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=43.69&lon=-112.01&appid=c2448f82676f1c51f8aad097f7b429bc&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("recentWeatherDataHome", JSON.stringify(data));
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
  if (localStorage.getItem("visitTimestampHome")) {
    lastTimestamp = parseInt(localStorage.getItem("visitTimestampHome"));
    currentTimestamp = Date.now();
    timeDifference = currentTimestamp - lastTimestamp;

    if (timeDifference > 3600000) {
      lastTimestamp = currentTimestamp;
      localStorage.setItem("visitTimestampHome", lastTimestamp);
      apiFetch();
    } else {
      displayResults(JSON.parse(localStorage.getItem("recentWeatherDataHome")));
    }
  } else {
    localStorage.setItem("visitTimestampHome", Date.now());
    apiFetch();
  }
}

checkTime();
