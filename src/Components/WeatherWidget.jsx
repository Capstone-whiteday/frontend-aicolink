// import React, { useEffect, useState } from 'react';
// import './WeatherWidget.css';

// const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // 실제 키로 교체

// const WeatherWidget = ({ city = "Jeju" }) => {
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     // OpenWeatherMap API 예시 (도시명 기준)
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
//       .then(res => res.json())
//       .then(data => setWeather(data));
//   }, [city]);

//   if (!weather || weather.cod !== 200) {
//     return (
//       <div className="weather-widget">
//         <div className="weather-title">날씨 정보</div>
//         <div className="weather-loading">날씨 정보를 불러오는 중...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="weather-widget">
//       <div className="weather-title">{weather.name} 날씨</div>
//       <div className="weather-main">
//         <img
//           src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//           alt={weather.weather[0].description}
//           className="weather-icon"
//         />
//         <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
//       </div>
//       <div className="weather-desc">{weather.weather[0].description}</div>
//       <div className="weather-etc">
//         <span>습도 {weather.main.humidity}%</span>
//         <span>풍속 {weather.wind.speed}m/s</span>
//       </div>
//     </div>
//   );
// };

// export default WeatherWidget;