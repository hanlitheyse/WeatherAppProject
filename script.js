let apiKey = "5cf16f4aba42dad5b51c00ba4f512a46";
let lon = "";
let lat = "";
let curTemperature = "";
let curMinTemperature = "";
let curMaxTemperature = "";
let tomMinTemperature = "";
let tomMaxTemperature = "";
let aTomMinTemperature = "";
let aTomMaxTemperature = "";
let aaTomMinTemperature = "";
let aaTomMaxTemperature = "";
let aaaTomMinTemperature = "";
let aaaTomMaxTemperature = "";
navigator.geolocation.getCurrentPosition(getLocation);

function getLocation(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getWeatherCurrentLocation(lon, lat);
}

function getWeatherCurrentLocation(lon, lat) {
  let apiNowUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=249d758901864c4a8d893119233008&q=${lat},${lon}&days=4`;
  axios.get(apiUrl).then(forecastResponse);
  axios.get(apiNowUrl).then(weatherResponse);
}

function getWeather(location) {
  let apiNowUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=249d758901864c4a8d893119233008&q=${location}&days=4`;
  axios.get(apiUrl).then(forecastResponse);

  axios.get(apiNowUrl).then(weatherResponse);
}

function weatherResponse(response) {
  let id = response.data.weather[0].id;
  setBackground(id);

  let icon = response.data.weather[0].icon;
  let iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
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
  curTemperature = curTemp;

  let minTemp = response.data.main.temp_min;
  minTemp = Math.round(minTemp);
  let maxTemp = response.data.main.temp_max;
  maxTemp = Math.round(maxTemp);
  let live_mmTemp = document.querySelector("p#live_mmTemp");
  live_mmTemp.innerHTML = `${maxTemp}°C | ${minTemp}°C`;
  curMinTemperature = minTemp;
  curMaxTemperature = maxTemp;

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

function setBackground(id) {
  let liveBackground = document.getElementById("back");

  if (id === 800) {
    liveBackground.style.backgroundImage = "url(sunny_sky.jpg)";
  } else {
    const firstDigit = String(id).charAt(0);
    switch (firstDigit) {
      case "2":
        liveBackground.style.backgroundImage = "url(stormy_sky.jpg)";
        break;
      case "3":
        liveBackground.style.backgroundImage = "url(cloudy_sky.jpg) ";
        break;
      case "5":
        liveBackground.style.backgroundImage = "url(rain_sky.jpg)";
        break;
      case "6":
        liveBackground.style.backgroundImage = "url(snow.jpg)";
        break;
      case "7":
        liveBackground.style.backgroundImage = "url(mist.jpg)";
        break;
      case "8":
        liveBackground.style.backgroundImage = "url(cloudy_sky.jpg)";
    }
  }
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

  let aaa_tomMax = Math.round(
    response.data.forecast.forecastday[3].day.maxtemp_c
  );
  let aaa_tomMin = Math.round(
    response.data.forecast.forecastday[3].day.mintemp_c
  );
  let aaa_tomWeather = response.data.forecast.forecastday[3].day.condition.text;
  aaa_tomForecast(aaa_tomMax, aaa_tomMin, aaa_tomWeather);
  createIcon(tomWeather, a_tomWeather, aa_tomWeather, aaa_tomWeather);
}

function tomForecast(max, min, weather) {
  let live_temp = document.querySelector("li#tom-temp");
  let live_weather = document.querySelector("li#tom-weather");

  live_temp.innerHTML = `<h3>${max}°C</h3>| ${min}°C`;
  live_weather.innerHTML = `${weather}`;
  tomMinTemperature = min;
  tomMaxTemperature = max;
}

function a_tomForecast(max, min, weather) {
  let live_temp = document.querySelector("li#a-temp");
  let live_weather = document.querySelector("li#a-weather");

  live_temp.innerHTML = `<h3>${max}°C</h3>| ${min}°C`;
  live_weather.innerHTML = `${weather}`;

  aTomMinTemperature = min;
  aTomMaxTemperature = max;
}

function aa_tomForecast(max, min, weather) {
  let live_temp = document.querySelector("li#aa-temp");
  let live_weather = document.querySelector("li#aa-weather");

  live_temp.innerHTML = `<h3>${max}°C</h3>| ${min}°C`;
  live_weather.innerHTML = `${weather}`;

  aaTomMinTemperature = min;
  aaTomMaxTemperature = max;
}

function aaa_tomForecast(max, min, weather) {
  let live_temp = document.querySelector("li#aaa-temp");
  let live_weather = document.querySelector("li#aaa-weather");

  live_temp.innerHTML = `<h3>${max}°C</h3>| ${min}°C`;
  live_weather.innerHTML = `${weather}`;

  aaaTomMinTemperature = min;
  aaaTomMaxTemperature = max;
}

function createIcon(tom, a_tom, aa_tom, aaa_tom) {
  console.log(a_tom, aa_tom);
  let liveTom = document.getElementById("tom");
  let live_aTom = document.getElementById("a_tom");
  let live_aaTom = document.getElementById("aa_tom");
  let live_aaaTom = document.getElementById("aaa_tom");

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
    liveTom.style.backgroundImage = "url(rain_sky.jpg)";
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
    live_aTom.style.backgroundImage = "url(rain_sky.jpg)";
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
    live_aaTom.style.backgroundImage = "url(rain_sky.jpg)";
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
    aa_tom === "Moderate or heavy snow showers"
  ) {
    live_aaTom.style.backgroundImage = "url(snow).jpg)";
  }

  if (aaa_tom === "Sunny") {
    live_aaaTom.style.backgroundImage = "url(sunny_sky.jpg)";
  } else if (
    aaa_tom === "Cloudy" ||
    aaa_tom === "Overcast" ||
    aaa_tom === "Light drizzle"
  ) {
    live_aaaTom.style.backgroundImage = "url(cloudy_sky.jpg)";
  } else if (aaa_tom === "Partly cloudy") {
    live_aaaTom.style.backgroundImage = "url(mostly_sunny.jpg)";
  } else if (
    aaa_tom === "Mist" ||
    aaa_tom === "Fog" ||
    aaa_tom === "Freezing fog"
  ) {
    live_aaaTom.style.backgroundImage = "url(mist.jpg)";
  } else if (
    aaa_tom === "Patchy rain possible" ||
    aaa_tom === "Patchy light rain" ||
    aaa_tom === "Light rain" ||
    aaa_tom === "Moderate rain at times" ||
    aaa_tom === "Moderate rain" ||
    aaa_tom === "Light freezing rain"
  ) {
    live_aaaTom.style.backgroundImage = "url(lightRain.jpg)";
  } else if (
    aaa_tom === "Patchy sleet possible" ||
    aaa_tom === "Patchy freezing drizzle possible" ||
    aaa_tom === "Freezing drizzle" ||
    aaa_tom === "Heavy freezing drizzle" ||
    aaa_tom === "Heavy rain at times" ||
    aaa_tom === "Heavy rain" ||
    aaa_tom === "Moderate or heavy freezing rain" ||
    aaa_tom === "Light sleet" ||
    aaa_tom === "Moderate or heavy sleet" ||
    aaa_tom === "Moderate or heavy showers of ice pellets"
  ) {
    live_aaaTom.style.backgroundImage = "url(rain_sky.jpg)";
  } else if (
    aaa_tom === "Thundery outbreaks possible" ||
    aaa_tom === "Moderate or heavy snow with thunder" ||
    aaa_tom === "Patchy light snow with thunder" ||
    aaa_tom === "Moderate or heavy rain with thunder" ||
    aaa_tom === "Patchy light rain with thunder"
  ) {
    live_aaaTom.style.backgroundImage = "url(stormy_sky.jpg)";
  } else if (
    aaa_tom === "Patchy light snow" ||
    aaa_tom === "Light snow" ||
    aaa_tom === " Patchy moderate snow" ||
    aaa_tom === "Moderate snow"
  ) {
    live_aaaTom.style.backgroundImage = "url(patchySnow).jpg)";
  } else if (
    aaa_tom === "Patchy heavy snow" ||
    aaa_tom === "Heavy snow" ||
    aaa_tom === "Moderate or heavy snow showers"
  ) {
    live_aaaTom.style.backgroundImage = "url(snow).jpg)";
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
  let live_curTemperature = document.querySelector("p#liveTemp");
  let live_curMMTemperature = document.querySelector("p#live_mmTemp");
  let live_tomTemperature = document.querySelector("li#tom-temp");
  let live_aTomTemperature = document.querySelector("li#a-temp");
  let live_aaTomTemperature = document.querySelector("li#aa-temp");
  let live_aaaTomTemperature = document.querySelector("li#aaa-temp");

  console.log(curTemperature);
  switch (unit) {
    case "f":
      curTemperature = celToFar(curTemperature);
      curMaxTemperature = celToFar(curMaxTemperature);
      curMinTemperature = celToFar(curMinTemperature);

      tomMinTemperature = celToFar(tomMinTemperature);
      tomMaxTemperature = celToFar(tomMaxTemperature);

      aTomMinTemperature = celToFar(aTomMinTemperature);
      aTomMaxTemperature = celToFar(aTomMaxTemperature);

      aaTomMinTemperature = celToFar(aaTomMinTemperature);
      aaTomMaxTemperature = celToFar(aaTomMaxTemperature);

      aaaTomMaxTemperature = celToFar(aaaTomMaxTemperature);
      aaaTomMinTemperature = celToFar(aaaTomMinTemperature);

      live_curTemperature.innerHTML = `${curTemperature}°F`;
      live_curMMTemperature.innerHTML = `${curMaxTemperature}°F | ${curMinTemperature}°F`;
      live_tomTemperature.innerHTML = `<h3>${tomMaxTemperature}°F</h3>| ${tomMinTemperature}°F`;
      live_aTomTemperature.innerHTML = `<h3>${aTomMaxTemperature}°F</h3>| ${aTomMinTemperature}°F`;
      live_aaTomTemperature.innerHTML = `<h3>${aaTomMaxTemperature}°F</h3>| ${aaTomMinTemperature}°F`;
      live_aaaTomTemperature.innerHTML = `<h3>${aaaTomMaxTemperature}°F</h3>| ${aaaTomMinTemperature}°F`;

      break;
    case "c":
      curTemperature = farToCel(curTemperature);
      curMaxTemperature = farToCel(curMaxTemperature);
      curMinTemperature = farToCel(curMinTemperature);

      tomMinTemperature = farToCel(tomMinTemperature);
      tomMaxTemperature = farToCel(tomMaxTemperature);

      aTomMinTemperature = farToCel(aTomMinTemperature);
      aTomMaxTemperature = farToCel(aTomMaxTemperature);

      aaTomMinTemperature = farToCel(aaTomMinTemperature);
      aaTomMaxTemperature = farToCel(aaTomMaxTemperature);

      aaaTomMinTemperature = farToCel(aaaTomMinTemperature);
      aaaTomMaxTemperature = farToCel(aaaTomMaxTemperature);

      live_curTemperature.innerHTML = `${curTemperature}°C`;
      live_curMMTemperature.innerHTML = `${curMaxTemperature}°C | ${curMinTemperature}°C`;
      live_tomTemperature.innerHTML = `<h3>${tomMaxTemperature}°C</h3>| ${tomMinTemperature}°C`;
      live_aTomTemperature.innerHTML = `<h3>${aTomMaxTemperature}°C</h3>| ${aTomMinTemperature}°C`;
      live_aaTomTemperature.innerHTML = `<h3>${aaTomMaxTemperature}°C</h3>| ${aaTomMinTemperature}°C`;
      live_aaaTomTemperature.innerHTML = `<h3>${aaaTomMaxTemperature}°C</h3>| ${aaaTomMinTemperature}°C`;

      break;
  }
  console.log(curTemperature);
}

function celToFar(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

function farToCel(temp) {
  return Math.round(((temp - 32) * 5) / 9);
}
