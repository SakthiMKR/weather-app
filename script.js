const apiKey = '15356777f36deccae742238b44831d3b'; //  OpenWeatherMap API key

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMsg = document.getElementById('errorMsg');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();

    const data = await res.json();
    displayWeather(data);
  } catch {
    weatherDisplay.classList.add('hidden');
    errorMsg.classList.remove('hidden');
  }
}

function displayWeather(data) {
  const { name, sys, main, weather, wind } = data;

  document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
  document.getElementById('temperature').textContent = Math.round(main.temp);
  document.getElementById('description').textContent = weather[0].description;
  document.getElementById('humidity').textContent = main.humidity;
  document.getElementById('windSpeed').textContent = wind.speed;

  document.getElementById('weatherIcon').src =
    `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherDisplay.classList.remove('hidden');
  errorMsg.classList.add('hidden');
}