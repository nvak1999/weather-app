import React from "react";
import { useState, useEffect } from "react";

const api = {
  key: "e4ce91ea010bf2c8623cc5da3c6617fe",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;

        const reponse = await fetch(url);
        const data = await reponse.json();
        if (reponse.ok) {
          setWeatherInfo(
            `${data.name},${data.sys.country},${data.weather[0].description},${data.main.temp}`
          );
          seterrorMessage("");
        } else {
          seterrorMessage(data.message);
        }
      } catch (error) {
        seterrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
