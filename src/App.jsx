import { useState } from "react";
import "./App.css";
import WeatherCard from "./Weather.jsx";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getWeather() {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="container">

      {/* Header */}
      <header className="header">
        <h2>✺ Unlimited weather checker</h2>
      </header>

      <h1>Check weather in any city</h1>

      {/* Search Section */}
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {/* Status Messages */}
      {loading && <p className="loading">Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {/* Weather Display */}
      {weather && <WeatherCard weather={weather} />}

      {/* Footer */}
      <footer className="footer">
        Developed by Lateefat Abdullahi
      </footer>

    </div>
  );
}