let apiKey = "5cf16f4aba42dad5b51c00ba4f512a46";
let lon = "";
let lat = "";
let searchLoc = "";

navigator.geolocation.getCurrentPosition(getLocation);

function getLocation(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getWeatherCurrentLocation(lon, lat);
}

function getWeatherCurrentLocation(lon, lat) {
  let apiNowUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=249d758901864c4a8d893119233008&q=${lat},${lon}&days=7`;
  axios.get(apiUrl).then(forecastResponse);
  axios.get(apiNowUrl).then(weatherResponse).;
  searchLoc = "current";
}

function getWeather(location) {
  let apiNowUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  let apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=249d758901864c4a8d893119233008&q=${location}&days=7`;
  axios.get(apiUrl).then(forecastResponse);

  axios.get(apiNowUrl).then(weatherResponse);
  searchLoc = "new";
}

function weatherResponse(response) {
  let country = response.data.sys.country;
  let city = response.data.name;
  console.log(country, city);
  let liveLocation = document.querySelector("h2#livecity");
  liveLocation.innerHTML = `${city}, ${country}`;

  let liveDate = document.querySelector("#date");
  liveDate.innerHTML = createDate(new Date());

  let curTemp = response.data.main.temp;
  curTemp = Math.round(curTemp);
  let liveTemp = document.querySelector("p#liveTemp");
  liveTemp.innerHTML = `${curTemp}°C`;

  let minTemp = response.data.main.temp_min;
  minTemp = Math.round(minTemp);
  let maxTemp = response.data.main.temp_max;
  maxTemp = Math.round(maxTemp);
  let live_mmTemp = document.querySelector("p#live_mmTemp");
  live_mmTemp.innerHTML = `${maxTemp}°C | ${minTemp}°C`;

  let weather = response.data.weather[0].main;
  let liveWeather = document.querySelector("h1#weather");
  liveWeather.innerHTML = weather;

  let feels = response.data.main.feels_like;
  feels = Math.round(feels);

  let liveFeels = document.querySelector("p#feels");
  liveFeels.innerHTML = `<b>Feels Like: </b>${feels}°C`;

  let wind = response.data.wind.speed;
  wind = Math.round(wind);
  let liveWind = document.querySelector("p#wind");
  liveWind.innerHTML = `<b>Wind: </b>${wind}mph`;

  let humidity = response.data.main.humidity;
  let liveHumidity = document.querySelector("p#humidity");
  liveHumidity.innerHTML = `<b>Humidity: </b>${humidity}%`;
}

function forecastResponse(response) {
  let tomMax = Math.round(response.data.forecast.forecastday[0].day.maxtemp_c);
  let tomMin = Math.round(response.data.forecast.forecastday[0].day.mintemp_c);
  let tomWeather = response.data.forecast.forecastday[0].day.condition.text;
  let aTomMax = Math.round(response.data.forecast.forecastday[1].day.maxtemp_c);
  let aTomMin = Math.round(response.data.forecast.forecastday[1].day.mintemp_c);
  let aTomWeather = response.data.forecast.forecastday[1].day.condition.text;
  let aaTomMax = Math.round(
    response.data.forecast.forecastday[2].day.maxtemp_c
  );
  let aaTomMin = Math.round(
    response.data.forecast.forecastday[2].day.mintemp_c
  );
  let aaTomWeather = response.data.forecast.forecastday[0].day.condition.text;

  let tempTom = document.querySelector("li#a-temp");
  let weatherTom = document.querySelector("li#a-weather");
  tempTom.innerHTML = `<h3>${tomMax}°C</h3>| ${tomMin}°C`;
  weatherTom.innerHTML = `${tomWeather}`;

  let temp_aTom = document.querySelector("li#tom-temp");
  let weather_aTom = document.querySelector("li#tom-weather");
  temp_aTom.innerHTML = `<h3>${aTomMax}°C</h3>| ${aTomMin}°C`;
  weather_aTom.innerHTML = `${aTomWeather}`;

  let temp_aaTom = document.querySelector("li#aa-temp");
  let weather_aaTom = document.querySelector("li#aa-weather");
  temp_aaTom.innerHTML = `<h3>${aaTomMax}°C</h3>| ${aaTomMin}°C`;
  weather_aaTom.innerHTML = `${aaTomWeather}`;
}

function createDate(date) {
  let month = date.toLocaleString("en-AU", { month: "short" });
  let time = date.toLocaleTimeString("en-AU", { timeStyle: "short" });
  let day = date.toLocaleString("en-AU", { day: "2-digit" });
  let wDay = date.toLocaleString("en-AU", { weekday: "short" });
  return `${wDay}, ${day} ${month}, ${time}`;
}

let townFrm = document.querySelector("form");

townFrm.onsubmit = (event) => {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  getWeather(city);
};

function postCity(city) {
  let liveCity = document.querySelector("#livecity");
  liveCity.innerHTML = city;
}

let cBtn = document.querySelector("#c");
let fBtn = document.querySelector("#f");

cBtn.onclick = () => {
  if (checkToggle(cBtn) == false) {
    cBtn.classList.add("selected");
    fBtn.classList.remove("selected");
    toggleTemp("c");
  }
};

fBtn.onclick = () => {
  if (checkToggle(fBtn) == false) {
    fBtn.classList.add("selected");
    cBtn.classList.remove("selected");
    toggleTemp("f");
  }
};
function checkToggle(btn) {
  return btn.classList.contains("selected") == true ? true : false;
}

function toggleTemp(unit) {
  let liveTemp = document.querySelector(".large-temp");
  switch (unit) {
    case "c":
      liveTemp.innerHTML = "29°C";
      break;
    case "f":
      liveTemp.innerHTML = "69°F";
      break;
  }
}
