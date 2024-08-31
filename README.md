# Weather Forecast Application
## Overview

The Weather Forecast Application is a web-based project that allows users to check the weather forecast for any location worldwide. It uses the OpenWeatherMap API to fetch and display the 5-day weather forecast, including temperature, humidity, wind speed, and weather conditions like rain, clouds, or clear skies. The application also features a user-friendly interface with background GIFs and emojis that change according to the current weather conditions.
Features

1. Weather Search: Users can search for any city's weather by entering the city name in the search bar.
2. 5-Day Forecast: The app provides a detailed 5-day weather forecast.
3. Dynamic Background: The background changes dynamically based on the weather conditions (e.g., clear, cloudy, rainy).
4. Login and Signup Modals: Users can open login or signup modals to authenticate themselves.
5. Responsive Design: The application is mobile-friendly and adapts to different screen sizes.


## Technologies Used

1. HTML/CSS: For structuring and styling the application.
2. JavaScript: For making the application interactive and handling API requests.
3. OpenWeatherMap API: To fetch weather data based on city name and geographical coordinates.
4. Font Awesome: For using icons like thermometers and wind indicators.
5. GIFs and Emojis: To visually represent different weather conditions.

## Setup Instructions

### Clone the Repository:

    bash

    git clone https://github.com/yourusername/weather-forecast-app.git
    cd weather-forecast-app

### Open the Project:
Open the index.html file in your browser to view the application.

### Add Your API Key:
Replace the placeholder API key (e3cb3c930ab6454130e91932140a0679) in the JavaScript code with your own OpenWeatherMap API key. You can sign up for an API key here.

### Run the Application:
After replacing the API key, refresh the browser to run the application.

### How It Works

1. City Search: When the user enters a city name and clicks the "Get Weather" button, the app fetches the geographical coordinates (latitude and longitude) of the city.
2. Weather Fetching: Using these coordinates, the app then fetches the 5-day weather forecast data from OpenWeatherMap.
3. Data Display: The app displays the forecast in a visually appealing format, with temperature, feels-like temperature, weather descriptions, wind speed, and humidity for each day.
4. Dynamic Elements: Background GIFs and emojis change according to the current weather description, making the UI more engaging.

## Contributing

### If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit the changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Create a pull request.

## Credits

### This project was created by:

  Honey Ray - Designed the About page.
  
  Babita Pal - Ensured the Search box and functionality.
  
  Nisha Yadav - Developed the Login page.
  
  Jaya Srivastava - Crafted the Footer section.
