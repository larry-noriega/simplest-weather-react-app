import React, { Component } from "react";
import "../css/Favourites.css";
import { Button } from "semantic-ui-react";

class Favourites extends Component {
  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);
  }

  getWeather(event) {
    this.props.callBackFromParent(event.target.value);
  }

  render() {
    let cityElements = this.props.savedCities.map((city) => {
      return <Button className="Favourites-btn" size="tiny" value={city} key={`${city}-button`} onClick={this.getWeather} content={city} />;
    });

    return (
      <div className="Favourites">
        <h3 className="Favourites-title">My favourite cities</h3>
        <div className="Favourites-button-container">
          {cityElements}
        </div>
      </div>
    );
  }
}

export default Favourites;
