import React from "react";
import apiKeys from "../apiKeys";
import WeatherForecast from "./WeatherForecast";
import loader from "../assets/WeatherIcons.gif";
import WeatherForecastRow from "./WeatherForecastRow";


class WeatherApp extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    date: undefined,
    temperatureC: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    wind_speed: undefined,
    icon: "CLEAR_DAY",
  };

  componentDidMount()   {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(50.45, 30.52);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();

      const api_callSecond = await fetch(
          `${apiKeys.base}onecall?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const dataTwo = await api_callSecond.json();

    this.setState({
      lat: lat,
      lon: lon,
      date: data.dt,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      main: data.weather[0].main,
      country: data.sys.country,
      futureWeather: dataTwo
    });
    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };


  render() {
    if (this.state.country) {
      return (
        <>
          <div className="container">
            <WeatherForecast standAlone icon={this.state.icon} weather={this.state} futureWeather={this.state.futureWeather} />

            <div className="weatherForecast__row">
              {this.state.futureWeather.daily.slice(1).map((day, id) => (
                  <WeatherForecastRow
                      key={id}
                      icon={day.weather[0].icon}
                      date={day.dt}
                      weather={day.weather[0].main}
                      humidity={day.humidity}
                      wind_speed={day.wind_speed}
                      morn={day.temp.morn}
                      eve={day.temp.eve}
                      night={day.temp.night}
                      feels_like={day.feels_like}
                  />
              ))}

          </div>
          </div>
        </>
      )

    } else {
      return (
          <>
            <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
            <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
              Detecting your location
            </h3>
            <h3 style={{ color: "white", marginTop: "10px" }}>
              Your current location wil be displayed on the App <br></br> & used
              for calculating Real time weather.
            </h3>
          </>
      )
    }
  }
}

export default WeatherApp;
