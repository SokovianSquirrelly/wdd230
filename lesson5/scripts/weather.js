const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url =
  "https://api.openweathermap.org/data/3.0/onecall?lat=49.75&lon=6.64&appid=c2448f82676f1c51f8aad097f7b429bc";

// TODO: Add a way to check the timestamp of when the weather was last checked and do not fetch again for at least an hour.

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.___}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${___}.png`;
  let desc = data.weather[0].____;
  weatherIcon.setAttribute("__", ____);
  weatherIcon.setAttribute("__", ____);
  captionDesc.textContent = `${desc}`;
}

apiFetch();
