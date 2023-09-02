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
  
  createIcon(weatherTom, weather_aTom, weather_aaTom);

function createDate(date) {
  let month = date.toLocaleString("en-AU", { month: "short" });
  let time = date.toLocaleTimeString("en-AU", { timeStyle: "short" });
  let day = date.toLocaleString("en-AU", { day: "2-digit" });
  let wDay = date.toLocaleString("en-AU", { weekday: "short" });
  return `${wDay}, ${day} ${month}, ${time}`;
  }
  
  createIcon(tom, aTom, aaTom){
    let liveTom = document.querySelector(".card_tomorrow");
     let live_aTom = document.querySelector(".card_a");
    letLive_aaTom = document.querySelector(".card_aa");

    liveTom.classList.remove("sunny");
    liveTom.classList.remove("partlyCloudy");
    liveTom.classList.remove("cloudy");
    liveTom.classList.remove("snow");
    liveTom.classList.remove("storm");
    liveTom.classList.remove("rain");
    liveTom.classList.remove("mist");
    liveTom.classList.remove("lightRain");


  live_aTom.classList.remove("sunny");
    live_aTom.classList.remove("partlyCloudy");
    live_aTom.classList.remove("cloudy");
    live_aTom.classList.remove("snow");
    live_aTom.classList.remove("storm");
    live_aTom.classList.remove("rain");
    live_aTom.classList.remove("lightRain");
    live_aTom.classList.remove("mist");
   

    live_aaTom.classList.remove("sunny");
    live_aaTom.classList.remove("partlyCloudy");
    live_aaTom.classList.remove("cloudy");
    live_aaTom.classList.remove("snow");
    live_aaTom.classList.remove("storm");
    live_aaTom.classList.remove("rain");
    live_aaTom.classList.remove("mist");
    live_aaTom.classList.remove("lightRain");


   
    switch (tom){
      case "sunny":
        liveTom.classList.add("sunny");
        break;
      case "Partly Cloudy":
        liveTom.classList.add("partlyCloudy");
        break;
      case "Cloudy":
        liveTom.classList.add("cloudy");
        break;
      case "Overcast":
        liveTom.classList.add("cloudy");
        break;
      case "Mist":
        liveTom.classList.add("mist");
        break;
      case "Patchy rain possible":
        liveTom.classList.add("patchyRain");
        break;
      case "Patchy snow possible":
        liveTom.classList.add("patchySnow");
        break;
      case  "Patchy sleet possible":
        liveTom.classList.add("rain");
        break;
      case "Patchy freezing drizzle possible":
        liveTom.classList.add("rain");
        break;
      case "Thundery outbreaks possible":
        liveTom.classList.add("storm");
        break;
      case "Blowing snow":
        liveTom.classList.add("snow");
        break;
      case "Blizzard":
        liveTom.classList.add("snow");
        break;
      case "Fog":
        liveTom.classList.add("mist")
        break;
      case "Freezing fog":
        liveTom.classList.add("mist");
        break;
      case "Light drizzle":
        liveTom.classList.add("cloudy");
        break;
      case "Freezing drizzle":
        liveTom.classList.add("rain");
        break;
      case "Heavy freezing drizzle":
        liveTom.classList.add("rain");
        break;
      case "Patchy light rain":
        liveTom.classList,add("lightRain");
        break;
      case "Light rain":
        liveTom.classList.add("lightRain");
        break;
      case "Moderate rain at times":
        liveTom.classList.add("lightRain");
        break;
      case "Moderate rain":
        liveTom.classList.add("lightRain");
        break;
      case "Heavy rain at times":
        liveTom.classList.add("rain");
        break;
      case "Heavy rain":
        liveTom.classList.add("rain");
        break;
      case "Light freezing rain":
        liveTom.classList.add("lightRain");
        break;
      case "Moderate or heavy freezing rain":
        liveTom.classList.add("rain");
        break;
      case "Light sleet":
        liveTom.classList.add("lightRain");
        break;
      case "Moderate or heavy sleet":
        liveTom.classList.add("rain");
        break;
      case "Patchy light snow":
        liveTom.classList.add("patchySnow");
        break;
      case "Light Snow":
        liveTom.classList.add("patchySnow");
        break;
      case "Patchy moderate snow":
        liveTom.classList.add("patchySnow");
        break;
      case "Moderate snow":
        liveTom.classList.add("patchySnow");
        break;
      case 
    }
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
