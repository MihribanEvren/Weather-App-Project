import { IoSearchOutline } from 'react-icons/io5';
import { useGetWeatherQuery } from '../redux/services/weather';
import './Weather.css';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import { useRef, useState } from 'react';

function Weather() {
  const inputRef = useRef();
  const [city, setCity] = useState('ankara');
  const { data } = useGetWeatherQuery({ city: city });

  const handleSearch = () => {
    return setCity(inputRef.current.value);
  };

  const weatherData = data && {
    humidity: data.main.humidity,
    wind: data.wind.speed,
    temperature: Math.floor(data.main.temp),
    location: data.name,
    icon: data.weather[0].icon,
  };

  return (
    <div className="weather d-flex-col align-items-center justify-content-center py-5 px-4">
      <div className="search-bar d-flex align-items-center justify-content-center">
        <input
          ref={inputRef}
          type="text"
          className="border-0 me-2 p-3 rounded-pill fs-6 w-75"
          placeholder="Search"
          aria-label="Search"
        />
        <div
          className="search-icon py-2 px-1 rounded-circle"
          onClick={handleSearch}
        >
          <span className="input-group-text bg-transparent border-0 fs-4">
            <IoSearchOutline />
          </span>
        </div>
      </div>
      {weatherData && (
        <>
          <div className="text-center mt-5">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              className="w-25"
              alt="Weather icon"
            />
            <div className="my-4">
              <p className="temperature my-0">{weatherData.temperature}°C</p>
              <p className="location">{weatherData.location}</p>
            </div>
          </div>
          <div className="weather-data mt-5 pt-3 ">
            <div className="col fs-5 d-flex align-items-center me-4">
              <img src={humidityIcon} alt="Humidity" className="me-2" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col fs-5 d-flex align-items-center">
              <img src={windIcon} alt="Wind Speed" className="me-2" />
              <div>
                <p>{weatherData.wind} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
