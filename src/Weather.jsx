export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const countryCode = weather?.sys?.country;

  return (
    <div className="card">
      <h2>
        {weather?.name},{" "}
        <span className="country">
          {countryCode}
          <img
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            alt={`Flag of ${countryCode}`}
          />
        </span>
      </h2>

      <p className="description">
        {weather?.weather?.[0]?.description}
      </p>

      <div className="extra">
        <p>💧 Humidity: {weather?.main?.humidity}%</p>
        <p>🌬️ Wind: {weather?.wind?.speed} m/s</p>
        <p>🌡️ Feels like: {Math.round(weather?.main?.feels_like)}°C</p>
      </div>
    </div>
  );
}