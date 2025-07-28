const apiKey = 'd129561393e636614c714c79cc6d258d';
const weatherOutput = document.getElementById('weather-output');
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

// ✅ Load weather using current location
function loadWeatherFromGeolocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      error => {
        console.warn(error.message);
        weatherOutput.innerText = "Location access denied. Use search to get weather.";
      }
    );
  } else {
    weatherOutput.innerText = "Geolocation not supported by your browser.";
  }
}

// ✅ Handle search form submission
form.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    fetchCoordsByCity(city);
  }
});

// ✅ Fetch coordinates from city name
function fetchCoordsByCity(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
  fetch(geoUrl)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        weatherOutput.innerHTML = "<p>City not found.</p>";
        return;
      }
      const { lat, lon } = data[0];
      fetchWeatherByCoords(lat, lon);
    })
    .catch(err => {
      console.error(err);
      weatherOutput.innerHTML = "Error fetching location data.";
    });
}

// ✅ Fetch 5-day/3-hour forecast data using coordinates
function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.list || !data.city) {
        weatherOutput.innerHTML = "<p>Weather data not available.</p>";
        return;
      }

      const cityName = data.city.name;
      let output = `<h2>🌍 Weather for ${cityName}</h2>`;
      output += `<h3>Next 12 Time Slots (3-hour interval)</h3><ul>`;

      data.list.slice(0, 12).forEach(entry => {
        const time = new Date(entry.dt * 1000).toLocaleString();
        const desc = entry.weather[0].description;
        const icon = entry.weather[0].icon;
        const temp = entry.main.temp;
        const rain = entry.rain?.['3h'] ? `${entry.rain['3h']} mm` : 'No rain';

        output += `
          <li>
            <strong>${time}</strong> — ${desc}, 🌡️ ${temp}°C, 🌧️ ${rain}
            <br />
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
          </li>
        `;
      });

      output += `</ul>`;
      weatherOutput.innerHTML = output;
    })
    .catch(err => {
      console.error(err);
      weatherOutput.innerHTML = "Failed to fetch weather data.";
    });
}

// ✅ Start by getting the current location
loadWeatherFromGeolocation();
