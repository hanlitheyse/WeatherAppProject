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
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=249d758901864c4a8d893119233008&q=${lat},${lon}&days=3`;
  axios.get(apiUrl).then(forecastResponse);
  axios.get(apiNowUrl).then(weatherResponse);
  searchLoc = "current";
}

function getWeather(location) {
  let apiNowUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=249d758901864c4a8d893119233008&q=${location}&days=3`;
  axios.get(apiUrl).then(forecastResponse);

  axios.get(apiNowUrl).then(weatherResponse);
  searchLoc = "new";
}

function weatherResponse(response) {
  let icon = response.data.weather[0].icon;
  let iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log(icon);
  let liveIcon = document.getElementById("icon");
  liveIcon.setAttribute("src", iconSrc);

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
  tomForecast(tomMax, tomMin, tomWeather);

  let a_tomMax = Math.round(
    response.data.forecast.forecastday[1].day.maxtemp_c
  );
  let a_tomMin = Math.round(
    response.data.forecast.forecastday[1].day.mintemp_c
  );
  let a_tomWeather = response.data.forecast.forecastday[1].day.condition.text;
  a_tomForecast(a_tomMax, a_tomMin, a_tomWeather);

  let aa_tomMax = Math.round(
    response.data.forecast.forecastday[2].day.maxtemp_c
  );
  let aa_tomMin = Math.round(
    response.data.forecast.forecastday[2].day.mintemp_c
  );
  let aa_tomWeather = response.data.forecast.forecastday[2].day.condition.text;
  aa_tomForecast(aa_tomMax, aa_tomMin, aa_tomWeather);
  createIcon(tomWeather, a_tomWeather, aa_tomWeather);
}

function tomForecast(max, min, weather) {
  let live_temp = document.querySelector("li#tom-temp");
  let live_weather = document.querySelector("li#tom-weather");

  live_temp.innerHTML = `<h3>${max}°C</h3>| ${min}°C`;
  live_weather.innerHTML = `${weather}`;
}

function a_tomForecast(max, min, weather) {
  let live_temp = document.querySelector("li#a-temp");
  let live_weather = document.querySelector("li#a-weather");

  live_temp.innerHTML = `<h3>${max}°C</h3>| ${min}°C`;
  live_weather.innerHTML = `${weather}`;
}

function aa_tomForecast(max, min, weather) {
  let live_temp = document.querySelector("li#aa-temp");
  let live_weather = document.querySelector("li#aa-weather");

  live_temp.innerHTML = `<h3>${max}°C</h3>| ${min}°C`;
  live_weather.innerHTML = `${weather}`;
}

function createIcon(tom, a_tom, aa_tom) {
  console.log(a_tom, aa_tom);
  let liveTom = document.getElementById("tom");
  let live_aTom = document.getElementById("a_tom");
  let live_aaTom = document.getElementById("aa_tom");

  if (tom === "Sunny") {
    liveTom.style.backgroundImage = "url(sunny_sky.jpg)";
  } else if (
    tom === "Cloudy" ||
    tom === "Overcast" ||
    tom === "Light drizzle"
  ) {
    liveTom.style.backgroundImage = "url(cloudy_sky.jpg)";
  } else if (tom === "Partly cloudy") {
    liveTom.style.backgroundImage = "url(mostly_sunny.jpg)";
  } else if (tom === "Mist" || tom === "Fog" || tom === "Freezing fog") {
    liveTom.style.backgroundImage = "url(mist.jpg)";
  } else if (
    tom === "Patchy rain possible" ||
    tom === "Patchy light rain" ||
    tom === "Light rain" ||
    tom === "Moderate rain at times" ||
    tom === "Moderate rain" ||
    tom === "Light freezing rain"
  ) {
    liveTom.style.backgroundImage = "url(lightRain.jpg)";
  } else if (
    tom === "Patchy sleet possible" ||
    tom === "Patchy freezing drizzle possible" ||
    tom === "Freezing drizzle" ||
    tom === "Heavy freezing drizzle" ||
    tom === "Heavy rain at times" ||
    tom === "Heavy rain" ||
    tom === "Moderate or heavy freezing rain" ||
    tom === "Light sleet" ||
    tom === "Moderate or heavy sleet" ||
    tom === "Moderate or heavy showers of ice pellets"
  ) {
    liveTom.style.backgroundImage = "url(rain.jpg)";
  } else if (
    tom === "Thundery outbreaks possible" ||
    tom === "Moderate or heavy snow with thunder" ||
    tom === "Patchy light snow with thunder" ||
    tom === "Moderate or heavy rain with thunder" ||
    tom === "Patchy light rain with thunder"
  ) {
    liveTom.style.backgroundImage = "url(stormy_sky.jpg)";
  } else if (
    tom === "Patchy light snow" ||
    tom === "Light snow" ||
    tom === " Patchy moderate snow" ||
    tom === "Moderate snow"
  ) {
    liveTom.style.backgroundImage = "url(patchySnow).jpg)";
  } else if (
    tom === "Patchy heavy snow" ||
    tom === "Heavy snow" ||
    tom === "Moderate or heavy snow showers"
  ) {
    liveTom.style.backgroundImage = "url(snow).jpg)";
  }

  if (a_tom === "Sunny") {
    live_aTom.style.backgroundImage = "url(sunny_sky.jpg)";
  } else if (
    a_tom === "Cloudy" ||
    a_tom === "Overcast" ||
    a_tom === "Light drizzle"
  ) {
    live_aTom.style.backgroundImage = "url(cloudy_sky.jpg)";
  } else if (a_tom === "Partly cloudy") {
    live_aTom.style.backgroundImage = "url(mostly_sunny.jpg)";
  } else if (a_tom === "Mist" || a_tom === "Fog" || a_tom === "Freezing fog") {
    live_aTom.style.backgroundImage = "url(mist.jpg)";
  } else if (
    a_tom === "Patchy rain possible" ||
    a_tom === "Patchy light rain" ||
    a_tom === "Light rain" ||
    a_tom === "Moderate rain at times" ||
    a_tom === "Moderate rain" ||
    a_tom === "Light freezing rain"
  ) {
    console.log("got it");
    live_aTom.style.backgroundImage = "url(lightRain.jpg)";
  } else if (
    a_tom === "Patchy sleet possible" ||
    a_tom === "Patchy freezing drizzle possible" ||
    a_tom === "Freezing drizzle" ||
    a_tom === "Heavy freezing drizzle" ||
    a_tom === "Heavy rain at times" ||
    a_tom === "Heavy rain" ||
    a_tom === "Moderate or heavy freezing rain" ||
    a_tom === "Light sleet" ||
    a_tom === "Moderate or heavy sleet" ||
    a_tom === "Moderate or heavy showers of ice pellets"
  ) {
    live_aTom.style.backgroundImage = "url(rain.jpg)";
  } else if (
    a_tom === "Thundery outbreaks possible" ||
    a_tom === "Moderate or heavy snow with thunder" ||
    a_tom === "Patchy light snow with thunder" ||
    a_tom === "Moderate or heavy rain with thunder" ||
    a_tom === "Patchy light rain with thunder"
  ) {
    live_aTom.style.backgroundImage = "url(stormy_sky.jpg)";
  } else if (
    a_tom === "Patchy light snow" ||
    a_tom === "Light snow" ||
    a_tom === " Patchy moderate snow" ||
    a_tom === "Moderate snow"
  ) {
    live_aTom.style.backgroundImage = "url(patchySnow).jpg)";
  } else if (
    a_tom === "Patchy heavy snow" ||
    a_tom === "Heavy snow" ||
    a_tom === "Moderate or heavy snow showers"
  ) {
    live_aTom.style.backgroundImage = "url(snow).jpg)";
  }

  if (aa_tom === "Sunny") {
    live_aaTom.style.backgroundImage = "url(sunny_sky.jpg)";
  } else if (
    aa_tom === "Cloudy" ||
    aa_tom === "Overcast" ||
    aa_tom === "Light drizzle"
  ) {
    live_aaTom.style.backgroundImage = "url(cloudy_sky.jpg)";
  } else if (aa_tom === "Partly cloudy") {
    live_aaTom.style.backgroundImage = "url(mostly_sunny.jpg)";
  } else if (
    aa_tom === "Mist" ||
    aa_tom === "Fog" ||
    aa_tom === "Freezing fog"
  ) {
    live_aaTom.style.backgroundImage = "url(mist.jpg)";
  } else if (
    aa_tom === "Patchy rain possible" ||
    aa_tom === "Patchy light rain" ||
    aa_tom === "Light rain" ||
    aa_tom === "Moderate rain at times" ||
    aa_tom === "Moderate rain" ||
    aa_tom === "Light freezing rain"
  ) {
    live_aaTom.style.backgroundImage = "url(lightRain.jpg)";
  } else if (
    aa_tom === "Patchy sleet possible" ||
    aa_tom === "Patchy freezing drizzle possible" ||
    aa_tom === "Freezing drizzle" ||
    aa_tom === "Heavy freezing drizzle" ||
    aa_tom === "Heavy rain at times" ||
    aa_tom === "Heavy rain" ||
    aa_tom === "Moderate or heavy freezing rain" ||
    aa_tom === "Light sleet" ||
    aa_tom === "Moderate or heavy sleet" ||
    aa_tom === "Moderate or heavy showers of ice pellets"
  ) {
    live_aaTom.style.backgroundImage = "url(rain.jpg)";
  } else if (
    aa_tom === "Thundery outbreaks possible" ||
    aa_tom === "Moderate or heavy snow with thunder" ||
    aa_tom === "Patchy light snow with thunder" ||
    aa_tom === "Moderate or heavy rain with thunder" ||
    aa_tom === "Patchy light rain with thunder"
  ) {
    live_aaTom.style.backgroundImage = "url(stormy_sky.jpg)";
  } else if (
    aa_tom === "Patchy light snow" ||
    aa_tom === "Light snow" ||
    aa_tom === " Patchy moderate snow" ||
    aa_tom === "Moderate snow"
  ) {
    live_aaTom.style.backgroundImage = "url(patchySnow).jpg)";
  } else if (
    aa_tom === "Patchy heavy snow" ||
    aa_tom === "Heavy snow" ||
    a_tom === "Moderate or heavy snow showers"
  ) {
    live_aaTom.style.backgroundImage = "url(snow).jpg)";
  }
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

  switch (unit) {
    case "c":
      liveTemp.innerHTML = "29°C";
      break;
    case "f":
      
;
      break;
  }
}
