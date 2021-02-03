import React from "react";

function WeatherForecastRow({ date, weather, icon, humidity, wind_speed, morn, night, eve, feels_like }) {

    let d = new Date(date * 1000);
    let dayName = `${d.toString().split(' ')[0]}, ${d.toString().split(' ')[2]}`

    return (<>
                <div className="weatherForecast__card">
                    <div className="weatherForecast__card-header">
                        <div>
                            <h3>{dayName}</h3>
                        </div>
                    </div>
                    <div className="weatherForecast__card-body">
                        <div className="weatherForecast__forecast-icon">
                            <img src ={`http://openweathermap.org/img/w/${icon}.png`} alt="wthr img" />
                        </div>
                        <div className="weatherForecast__today-weather">
                            <h3>{weather}</h3>
                            {typeof weather != "undefined" ? (

                                    <div className="weatherForecast__todayWeatherList">
                                        <div className="weatherForecast__todayWeatherList-flex">
                                            <h3>Humidity</h3>
                                            <h4>{Math.round(humidity)}%</h4>
                                        </div>
                                        <div className="weatherForecast__todayWeatherList-flex">
                                            <h3>Wind Speed</h3>
                                            <h4>{Math.round(wind_speed)}Km/h</h4>
                                        </div>
                                        <div className="weatherForecast__todayWeatherList-box">
                                            <div className="weatherForecast__todayWeatherList-flex">
                                                <h3>Morning</h3>
                                                <h4>{Math.round(morn)}°c</h4>
                                            </div>
                                            <div className="weatherForecast__todayWeatherList-flex --whiteLine">
                                                <h3>Feels like</h3>
                                                <h4>{Math.round(feels_like.morn)}°c</h4>
                                            </div>
                                            <div className="weatherForecast__todayWeatherList-flex">
                                                <h3>Evening</h3>
                                                <h4>{Math.round(eve)}°c</h4>
                                            </div>
                                            <div className="weatherForecast__todayWeatherList-flex --whiteLine">
                                                <h3>Feels like</h3>
                                                <h4>{Math.round(feels_like.eve)}°c</h4>
                                            </div>
                                            <div className="weatherForecast__todayWeatherList-flex ">
                                                <h3>Night</h3>
                                                <h4>{Math.round(night)}°c</h4>
                                            </div>
                                            <div className="weatherForecast__todayWeatherList-flex --whiteLine">
                                                <h3>Feels like</h3>
                                                <h4>{Math.round(feels_like.night)}°c</h4>
                                            </div>
                                        </div>

                                    </div>

                            ) : (
                                <div>
                                    Error
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </>

    );
}

export default WeatherForecastRow;
