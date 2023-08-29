let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

city = prompt("Enter a city");

weather[city] == undefined
  ? alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
    )
  : getWeather(city);

function getWeather(city) {
  let temp = weather[city].temp;
  temp = Math.round(temp);
  let humidity = weather[city].humidity;
  alert(`It is currently ${temp}° in ${city} with a humidity of ${humidity}%`);
}
