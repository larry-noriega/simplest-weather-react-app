import React, { Component } from "react"
import "../css/WeatherBoards.css"
import "../css/weather-icons.min.css"
import { Button } from "semantic-ui-react"

class WeatherBoards extends Component {
  constructor(props) {
    super(props)

    this.saveDataToLocalStorage = this.saveDataToLocalStorage.bind(this)
    this.deleteDataFromLocalStorage = this.deleteDataFromLocalStorage.bind(this)
  }

  deleteDataFromLocalStorage() {
    const existingCities = JSON.parse(localStorage.getItem("cityList"))
    const indexOfCity = existingCities.indexOf(this.props.weatherData.city)

    existingCities.splice(indexOfCity, 1)
    localStorage.setItem("cityList", JSON.stringify(existingCities))
    this.props.callBackFromParent(existingCities)
  }

  saveDataToLocalStorage() {
    // Get data from LocalStorage if there is any and push back with new city
    const existingCities = JSON.parse(localStorage.getItem("cityList")) || []

    existingCities.push(this.props.weatherData.city)
    localStorage.setItem("cityList", JSON.stringify(existingCities))
    this.props.callBackFromParent(existingCities)
  }

  render() {
    const {
      city,
      weather,
      country,
      temp,
      main,
      wind,
      humidity,
      wind_direction,
      pressure,
      sunrise,
      visibility,
      sunset
    } = this.props.weatherData
    const celcius = Math.round(temp - 273.15)
    const saveBtn = (
      <Button
        positive
        size="mini"
        onClick={this.saveDataToLocalStorage}
        content="Save to favourites"
      />
    )
    const deleteBtn = (
      <Button
        negative
        size="mini"
        onClick={this.deleteDataFromLocalStorage}
        content="Delete from favourites"
      />
    )
    const existingCities = this.props.savedCities

    return (
      <div className="WeatherBoards">

        <div className="WeatherLeft-board">

          <h1 className="WeatherCard-degrees">{celcius}°</h1>
          <div className="WeatherCard-icon-container">
            <i className={`wi wi-owm-${weather[0].id} WeatherCard-icon`} />
            <p>{weather[0].main} as of {new Date().toLocaleTimeString()}</p> {/* new */}
          </div>
          <h2 className="WeatherCard-city">
            {city}, {country}
          </h2>
          {existingCities.includes(city) ? deleteBtn : saveBtn}

        </div>

        <div className="WeatherRight-board">

          <div className="WeatherCard-detail">

            <div>
              <h4>High/Low</h4>
            </div>
            <div>
              <p>
                {Math.floor(main.temp_max - 273.15)}/
                {Math.floor(main.temp_min - 273.15)}
              </p>
            </div>

          </div>

          <div className="WeatherCard-detail">

            <div>
              <h4>Wind</h4>
            </div>
            <div>
              <p>
                {Math.floor((wind.speed * 18) / 5)} km/hr
              </p>
            </div>

          </div>

          <div className="WeatherCard-detail">

            <div>
              <h4>Humidity</h4>
            </div>
            <div>
              <p>
                {humidity} %
              </p>
            </div>

          </div>

          <div className="WeatherCard-detail">

            <div>
              <h4>Wind Direction</h4>
            </div>
            <div>
              <p>
                {wind_direction}
                <sup>o</sup> deg
              </p>
            </div>

          </div>

          <div className="WeatherCard-detail">

            <div>
              <h4>Pressure</h4>
            </div>
            <div>
              <p>
                {pressure} hPa
              </p>
            </div>

          </div>

          <div className="WeatherCard-detail">

            <div>
              <h4>Sunrise</h4>
            </div>
            <div>
              <p>
                {new Date(sunrise * 1000).toLocaleTimeString()}
              </p>
            </div>

          </div>

          <div className="WeatherCard-detail">

            <div>
              <h4>Visibility</h4>
            </div>
            <div>
              <p>
                {visibility / 1000} Km
              </p>
            </div>

          </div>

          <div className="WeatherCard-detail">

            <div>
              <h4>Sunset</h4>
            </div>
            <div>
              <p>
                {new Date(sunset * 1000).toLocaleTimeString()}
              </p>
            </div>

          </div>

        </div>
        
      </div>
    )
  }
}

export default WeatherBoards
