import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

function WeatherForecast(props) {

    const defaults = {
        color: "white",
        size: 112,
        animate: true,
    };

    let d = new Date(props.weather.date * 1000);
    let dayName = `${d.toString().split(' ')[0]}, ${d.toString().split(' ')[2]}`

    return (
                <div className={`weatherForecast__card ${props.standAlone && '--standAlone'}`}>
                    <div className="weatherForecast__card-header">
                            <div className="weatherForecast__card-headerWrap">
                                <LocationOnOutlinedIcon />
                                <h2>{props.weather.city}, <span>{props.weather.country}</span></h2>
                            </div>
                            <h3>{dayName}</h3>
                    </div>

                    <div className="weatherForecast__card-body">
                                <div className="weatherForecast__forecast-icon">
                                    <h3>{props.weather.main}</h3>
                                    <ReactAnimatedWeather
                                        icon={props.icon}
                                        color={defaults.color}
                                        size={defaults.size}
                                        animate={defaults.animate}
                                    />
                                </div>
                        <div className="weatherForecast__today-weather">
                            {typeof props.weather.main != "undefined" ? (

                                <div className="weatherForecast__todayWeatherList">
                                        <h4 className="weatherForecast__tempDigit">{Math.round(props.weather.temperatureC)}°c</h4>
                                    <div className="weatherForecast__todayWeatherList-flex">
                                        <h3>Feels like</h3>
                                        <h4>{Math.round(props.weather.feels_like)}°c</h4>
                                    </div>

                                    <div className="weatherForecast__todayWeatherList-flex">
                                        <h3>Humidity</h3>
                                        <h4>{Math.round(props.weather.humidity)}%</h4>
                                    </div>
                                    <div className="weatherForecast__todayWeatherList-flex">
                                        <h3>Wind Speed</h3>
                                        <h4>{Math.round(props.weather.wind_speed)}Km/h</h4>
                                    </div>
                                    <div className="weatherForecast__todayWeatherList-box">
                                        <div className="weatherForecast__todayWeatherList-flex">
                                            <h3>Morning</h3>
                                            <h4>{Math.round(props.futureWeather.daily[0].temp.morn)}°c</h4>
                                        </div>
                                        <div className="weatherForecast__todayWeatherList-flex --whiteLine">
                                            <h3>Feels like</h3>
                                            <h4>{Math.round(props.futureWeather.daily[0].feels_like.morn)}°c</h4>
                                        </div>
                                        <div className="weatherForecast__todayWeatherList-flex">
                                            <h3>Evening</h3>
                                            <h4>{Math.round(props.futureWeather.daily[0].temp.eve)}°c</h4>
                                        </div>
                                        <div className="weatherForecast__todayWeatherList-flex --whiteLine">
                                            <h3>Feels like</h3>
                                            <h4>{Math.round(props.futureWeather.daily[0].feels_like.eve)}°c</h4>
                                        </div>
                                        <div className="weatherForecast__todayWeatherList-flex ">
                                            <h3>Night</h3>
                                            <h4>{Math.round(props.futureWeather.daily[0].temp.night)}°c</h4>
                                        </div>
                                        <div className="weatherForecast__todayWeatherList-flex --whiteLine">
                                            <h3>Feels like</h3>
                                            <h4>{Math.round(props.futureWeather.daily[0].feels_like.eve)}°c</h4>
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

    );
}

export default WeatherForecast;
