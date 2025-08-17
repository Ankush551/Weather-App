const apiKey = "fa5d712a01a79ef7b1ceea7d82fcf84b";

// Fetch weather by city name
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return showError("Please enter a city name.");
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
}

// Fetch weather by geolocation
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
      },
      () => showError("Location access denied.")
    );
  } else {
    showError("Geolocation not supported.");
  }
}


// Common fetch function
async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError("❌ Could not fetch weather. Try again.");
  }
}

// Display weather data
function displayWeather(data) {
  document.getElementById("error").textContent = "";
  document.getElementById("weatherBox").style.display = "block";

  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("desc").textContent = data.weather[0].description;
  document.getElementById("feels").textContent = Math.round(data.main.feels_like);
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;
  document.getElementById("pressure").textContent = data.main.pressure;
  document.getElementById("clouds").textContent = data.clouds.all;
  document.getElementById("visibility").textContent = data.visibility;

  // Sunrise & Sunset convert from Unix time
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  document.getElementById("sunrise").textContent = sunrise;
  document.getElementById("sunset").textContent = sunset;

  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Show error
function showError(msg) {
  document.getElementById("error").textContent = msg;
  document.getElementById("weatherBox").style.display = "none";
}

