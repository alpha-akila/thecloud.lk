import { useState, useEffect } from "react";
import tempIcon from "../../../assets/icons/temp-hot-line.svg";
import sunIcon from "../../../assets/icons/sun-line.svg";
import cloudyIcon from "../../../assets/icons/cloudy-line.svg";
import sunCloudyIcon from "../../../assets/icons/sun-cloudy-line.svg";
import showersIcon from "../../../assets/icons/showers-line.svg";
import thunderstormsIcon from "../../../assets/icons/thunderstorms-line.svg";
import mistIcon from "../../../assets/icons/mist-line.svg";
import windyIcon from "../../../assets/icons/windy-line.svg";
import foggyIcon from "../../../assets/icons/foggy-line.svg";

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: "--",
    description: "Loading...",
    location: "Hanthana",
    icon: "cloud",
  });
  const [currentTime, setCurrentTime] = useState("");

  // Weather icon mapping
  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      // Clear sky
      "01d": sunIcon,
      "01n": sunIcon,
      // Few clouds
      "02d": sunCloudyIcon,
      "02n": sunCloudyIcon,
      // Scattered clouds
      "03d": cloudyIcon,
      "03n": cloudyIcon,
      // Broken clouds
      "04d": cloudyIcon,
      "04n": cloudyIcon,
      // Shower rain
      "09d": showersIcon,
      "09n": showersIcon,
      // Rain
      "10d": showersIcon,
      "10n": showersIcon,
      // Thunderstorm
      "11d": thunderstormsIcon,
      "11n": thunderstormsIcon,
      // Snow
      "13d": cloudyIcon, // Using cloudy as fallback for snow
      "13n": cloudyIcon,
      // Mist
      "50d": mistIcon,
      "50n": mistIcon,
    };

    return iconMap[weatherCode] || cloudyIcon;
  };

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Coordinates for Hanthana, Sri Lanka (approximate)
        const lat = 7.2906;
        const lon = 80.6337;
        const API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData({
            temperature: Math.round(data.main.temp),
            description: data.weather[0].main,
            location: "Hanthana",
            icon: data.weather[0].icon,
          });
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Keep default fallback data
      }
    };

    fetchWeather();
    // Refresh weather data every 10 minutes
    const weatherInterval = setInterval(fetchWeather, 600000);

    return () => clearInterval(weatherInterval);
  }, []);

  const weatherIconSrc = getWeatherIcon(weatherData.icon);

  return (
    <div className="flex items-center space-x-6 text-white/90">
      <div className="flex items-center space-x-2">
        <img
          src={weatherIconSrc}
          alt="weather"
          className="w-12 h-12 filter brightness-0 invert"
        />
        <div className="text-sm">
          <div
            style={{
              fontFamily: "Inter",
              fontWeight: 300,
              fontSize: "1.25rem",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {currentTime}
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "1.625rem",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {weatherData.location}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <img
          src={tempIcon}
          alt="temperature"
          className="w-12 h-12"
          style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
        />
        <span
          className="text-2xl font-light"
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "2rem",
            lineHeight: "100%",
            letterSpacing: "0%",
          }}
        >
          {weatherData.temperature}°C
        </span>
      </div>
    </div>
  );
};

export default WeatherInfo;
