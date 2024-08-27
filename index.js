function fetchWeather() {
  const city = document.getElementById("search-input").value; // Corrected ID

  if (!city) {
      document.getElementById("search-results").innerHTML = "Please enter a city name.";
      return;
  }

  const requestOptions = {
      method: "GET",
      redirect: "follow"
  };

  // Fetch the latitude and longitude for the entered city
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e3cb3c930ab6454130e91932140a0679`;

  console.log(`Fetching latitude and longitude for city: ${city}`); // Log city name

  fetch(geoUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log('Geo data:', result); // Log latitude and longitude

          if (result.length === 0) {
              document.getElementById("search-results").innerHTML = "City not found!";
              return;
          }

          const { lat, lon } = result[0];

          // Fetch the 5-day weather forecast using the lat and lon
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e3cb3c930ab6454130e91932140a0679&units=metric`;

          console.log(`Fetching weather forecast for coordinates: Lat ${lat}, Lon ${lon}`); // Log coordinates

          return fetch(forecastUrl, requestOptions);
      })
      .then(response => response.json())
      .then(forecastData => {
          console.log('Forecast data:', forecastData); // Log forecast data

          const forecastList = forecastData.list;
          const daysData = {};
          forecastList.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" }); // Change "short" to "long"
        
            if (!daysData[dayName]) {
                daysData[dayName] = [];
            }
        
            daysData[dayName].push({
                time: item.dt_txt,
                temp: item.main.temp,
                feels_like: item.main.feels_like,
                description: item.weather[0].description,
                windSpeed: item.wind.speed,
                humidity: item.main.humidity,
            });
        });
        
          console.log('Days data:', daysData); // Log the processed daysData
          displayWeather(daysData, city); // Pass city name to displayWeather
      })
      .catch(error => {
          console.error('Error fetching data:', error); // Log any errors
          document.getElementById("search-results").innerHTML = "Error fetching data!";
      });
}


function displayWeather(daysData, city) {
  const weatherContainer = document.getElementById("search-results");

  // Helper function to get GIF path based on weather description
  function getWeatherGif(description) {
    if (description.includes("clear")) {
      return 'weather-animations/clear.gif'; // GIF for clear weather
    } else if (description.includes("clouds")) {
      return 'weather-animations/clouds.gif'; // GIF for cloudy weather
    } else if (description.includes("rain")) {
      return 'weather-animations/rain.gif'; // GIF for rainy weather
    } else if (description.includes("thunderstorm")) {
      return 'weather-animations/thunderstorm.gif'; // GIF for thunderstorm
    } else if (description.includes("snow")) {
      return 'weather-animations/snow.gif'; // GIF for snowy weather
    } else if (description.includes("mist") || description.includes("fog")) {
      return 'weather-animations/fog.gif'; // GIF for foggy weather
    } else {
      return 'weather-animations/default.gif'; // Default GIF for other weather
    }
  }

  // Helper function to get emoji based on weather description
  function getWeatherEmoji(description) {
    if (description.includes("clear")) {
      return ' 🌞'; // Emoji for clear weather
    } else if (description.includes("clouds")) {
      return '🌥️'; // Emoji for cloudy weather
    } else if (description.includes("rain")) {
      return '🌧️'; // Emoji for rainy weather
    } else if (description.includes("thunderstorm")) {
      return '⛈️'; // Emoji for thunderstorm
    } else if (description.includes("snow")) {
      return '❄️'; // Emoji for snowy weather
    } else if (description.includes("mist") || description.includes("fog")) {
      return '🌫️'; // Emoji for foggy weather
    } else {
      return '🌈'; // Default emoji for other weather
    }
  }

  // Get the current day's weather description
  const currentDayDescription = daysData[Object.keys(daysData)[0]][0].description;

  // Set the background GIF based on the current day's weather
  const backgroundGif = getWeatherGif(currentDayDescription);

  weatherContainer.style.backgroundImage = `url(${backgroundGif})`;
  weatherContainer.style.backgroundSize = 'cover';
  weatherContainer.style.backgroundPosition = 'center';
  weatherContainer.style.backgroundRepeat = 'no-repeat';

  // Extract current day and forecast days
  const daysArray = Object.keys(daysData);
  const currentDay = daysArray.shift(); // Remove the first item and store it
  const forecastDays = daysArray; // Remaining days

  const currentDate = new Date(); // Get the current date
  const formattedDate = currentDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  weatherContainer.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
        <!-- Current Day Section -->
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">
            <p>${city}</p>
            <p style="font-size: 20px; color: #333;">${currentDay}</p>
            <p style="font-size: 16px; color: #777;">${formattedDate}</p> <!-- Display current date -->
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 10px;">
            <!-- Temperature Section -->
            <div style="flex: 1; margin: 10px; text-align: center; border-radius: 8px; padding: 15px; border: 2px solid #ddd;">
                <i class="fas fa-thermometer-half" style="font-size: 45px; color: #ff5722; margin-bottom: 5px;"></i>
                <p>Temperature</p>
                <p>${daysData[currentDay] ? daysData[currentDay][0].temp + '°C' : 'Data not available'}</p>
            </div>
            <!-- Feels Like Section -->
            <div style="flex: 1; margin: 10px; text-align: center; border-radius: 8px; padding: 15px; border: 2px solid #ddd;">
                <i class="fa-solid fa-temperature-half" style="font-size: 45px; color: #2196f3; margin-bottom: 5px;"></i>
                <p>Feels Like</p>
                <p>${daysData[currentDay] ? daysData[currentDay][0].feels_like + '°C' : 'Data not available'}</p>
            </div>
            <!-- Description Section -->
            <div style="flex: 1; margin: 10px; text-align: center; border-radius: 8px; padding: 15px; border: 2px solid #ddd;">
                <i class="fa-solid fa-cloud" style="font-size: 45px; color: #73A7AE; margin-bottom: 5px;"></i>
                <p>Description</p>
                <p>${daysData[currentDay] ? daysData[currentDay][0].description : 'Data not available'}</p>
            </div>
            <!-- Windspeed Section -->
            <div style="flex: 1; margin: 10px; text-align: center; border-radius: 8px; padding: 15px; border: 2px solid #ddd;">
                <i class="fa-solid fa-wind" style="font-size: 45px; color: #4caf50; margin-bottom: 5px;"></i>
                <p>Windspeed</p>
                <p>${daysData[currentDay] ? daysData[currentDay][0].windSpeed + ' km/h' : 'Data not available'}</p>
            </div>
            <!-- Humidity Section -->
            <div style="flex: 1; margin: 10px; text-align: center; border-radius: 8px; padding: 15px; border: 2px solid #ddd;">
                <i class="fa-solid fa-tachometer-alt" style="font-size: 45px; color: #ff9800; margin-bottom: 5px;"></i>
                <p>Humidity</p>
                <p>${daysData[currentDay] ? daysData[currentDay][0].humidity + '%' : 'Data not available'}</p>
            </div>
        </div>
        <!-- Forecast Days Section -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
            ${forecastDays.map(day => `
                <div style="background: rgba(255, 255, 255,0.5); border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); padding: 15px; margin: 10px; flex: 1; text-align: center; border: 1px solid #ddd;">
                    <p style="font-size: 16px; margin-bottom: 10px; color: #343434;">
                        ${day} <span style="font-size: 36px;">${getWeatherEmoji(daysData[day][0].description)}</span>
                    </p>
                    <p style="font-size: 18px; font-weight: bold; color: #8B0000;">${daysData[day] ? daysData[day][0].temp + '°C' : 'Data not available'}</p>
                    <p>${daysData[day] ? daysData[day][0].description : 'Data not available'}</p>
                </div>
            `).join('')}
        </div>
    </div>
`;
}



// LOgin and Sign up 

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("loginModal");
  var loginButton = document.getElementById("loginButton");
  var closeButtons = document.getElementsByClassName("close");

  // Open login modal when clicking the login button
  loginButton.onclick = function () {
    modal.style.display = "block";
  };

  // Close the modal when clicking on the close button or outside the modal
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// ........................................................... Signup Model Js
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("signupModal");
  var loginButton = document.getElementById("signupButton");
  var closeButtons = document.getElementsByClassName("closeSignup");

  // Open signup modal when clicking the signup button
  loginButton.onclick = function () {
    modal.style.display = "block";
  };

  // Close the modal when clicking on the close button or outside the modal
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// .......................... Move login to signup, sogimup to login page
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
function openLoginModal() {
  signupModal.style.display = 'none';
  loginModal.style.display = 'block';
}

function closeLoginModal() {
  loginModal.style.display = 'none';
}

function openSignupModal() {
  loginModal.style.display = 'none';
  signupModal.style.display = 'block';
}

function closeSignupModal() {
  signupModal.style.display = 'none';
}
