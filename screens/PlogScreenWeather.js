import React, {Component} from 'react';
import {Text} from 'react-native';

class PlogScreenWeather extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      weatherDetails: null
    };
  }
  render() {
    if (this.state.error) {
      return this.renderError();
    }
    if (!this.state.weatherDetails) {
      return (
        this.renderLoading()
      )
    } else {
      const plogMessage = { message: "Sample welcome message" };
      const tempMin = this.state.weatherDetails.main.temp_min;
      const tempMax = this.state.weatherDetails.main.temp_max;
      const atmospheric = this.state.weatherDetails.weather.id;
      if (tempMin >= 32) {
        plogMessage.message = "Don't go plogging, it's too hot!";
      } else if (atmospheric >= 200 && atmospheric <= 299) {
        plogMessage.message = "Don't go plogging, there's bad weather!";
      } else if (atmospheric == 711 || atmospheric == 731 || atmospheric >= 751) {
        plogMessage.message = "Don't go plogging, there's bad weather!";
      } else if (tempMax >= 30) {
        if (atmospheric >= 302 && atmospheric <= 321) {
          plogMessage.message = "It's going to be hot today - don't do too much plogging! (FYI, there's wet weather!)";
        } else if (atmospheric == 500 || atmospheric == 701) {
          plogMessage.message = "It's going to be hot today - don't do too much plogging! (FYI, there's wet weather!)";
        } else if (atmospheric >= 501 && atmospheric <= 599) {
          plogMessage.message = "It's going to be hot today - don't do too much plogging! (FYI, it's raining!)";
        } else {
          plogMessage.message = "It's going to be hot today - don't do too much plogging!";
        }
      } else if (tempMax <= 30 && tempMin >= 24) {
        if (atmospheric >= 302 && atmospheric <= 321) {
          plogMessage.message = "It's a nice day for plogging, but it could get warm - remember to drink water! (FYI, there's wet weather!)";
        } else if (atmospheric == 500 || atmospheric == 701) {
          plogMessage.message = "It's a nice day for plogging, but it could get warm - remember to drink water! (FYI, there's wet weather!)";
        } else if (atmospheric >= 501 && atmospheric <= 599) {
          plogMessage.message = "It's an okay day for plogging, but it could get warm - remember to drink water! (FYI, it's raining!)";
        } else {
          plogMessage.message = "It's a nice day for plogging, but it could get warm - remember to drink water!";
        }
      } else if (tempMax <= 30 && tempMin >= 10) {
        if (atmospheric >= 302 && atmospheric <= 321) {
          plogMessage.message = "It's a great day to go plogging! (FYI, there's wet weather!)";
        } else if (atmospheric == 500 || atmospheric == 701) {
          plogMessage.message = "It's a great day to go plogging! (FYI, there's wet weather!)";
        } else if (atmospheric >= 501 && atmospheric <= 599) {
          plogMessage.message = "FYI, it's raining!";
        } else {
          plogMessage.message = "It's a great day to go plogging!";
        }
      } else if (tempMin >= 5) {
        if (atmospheric >= 302 && atmospheric <= 321) {
          plogMessage.message = "It's a good day for plogging - make sure you dress warmly enough! (FYI, there's wet weather!)";
        } else if (atmospheric == 500 || atmospheric == 701) {
          plogMessage.message = "It's a good day for plogging - make sure you dress warmly enough! (FYI, there's wet weather!)";
        } else if (atmospheric >= 501 && atmospheric <= 599) {
          plogMessage.message = "FYI, it's raining!";
        } else if (atmospheric == 600) {
          plogMessage.message = "It's a good day for plogging - make sure you dress warmly enough! (FYI, there's light snow!)";
        } else {
          plogMessage.message = "It's a good day for plogging - make sure you dress warmly enough!";
        }
      } else if (tempMin < 5 && tempMin > -6) {
        if (atmospheric >= 302 && atmospheric <= 321) {
          plogMessage.message = "It's cold out today - be extra careful about ice! (FYI, there's wet weather!)";
        } else if (atmospheric == 500 || atmospheric == 701) {
          plogMessage.message = "It's cold out today - be extra careful about ice! (FYI, there's wet weather!)";
        } else if (atmospheric >= 501 && atmospheric <= 599) {
          plogMessage.message = "FYI, it's raining!";
        } else if (atmospheric == 600) {
          plogMessage.message = "It's cold out today - be extra careful about ice! (FYI, there's light snow!)";
        } else if (atmospheric >= 601 && atmospheric <= 699) {
          plogMessage.message = "FYI, it's snowing!";
        } else {
          plogMessage.message = "It's cold out today - be extra careful about ice!";
        }
      } else if (tempMax <= -6) {
        plogMessage.message = "Don't go plogging, it's too cold!";
      };
      console.log(plogMessage.message);
      return (
        <Text>
          {plogMessage.message}
        </Text>
      );
    }
  
  }
  
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let latit = position.coords.latitude;
        let longit = position.coords.longitude;
        let toGetWeather = "?lat=" + latit.toFixed(4) + "&lon=" + longit.toFixed(4);
        fetch("http://api.openweathermap.org/data/2.5/weather" 
          + toGetWeather 
            + "&units=metric&APPID={api key goes here}")
// Contact the dev team for the api key, and only use it in your local work for the time being if you need to.
// This is to avoid losing control of the api key and it being overused or misused.
            .then(response => response.json())
            .then(data => {
              this.setState({
                weatherDetails: data
              })
            })
            .catch(err => {
              console.log('Error', err);
              this.setState({
                error: err
              });
            })
      });
      console.log("geolocation found");
      console.log(this.state.weatherDetails);
    } else {
        console.log("geolocation not found");
    };
  }

  renderError() {
    console.log('renderError', this.state);
    return (
      <Text>{this.state.error.message}</Text>
    );
  }

  renderLoading() {
    return (
      <Text>Hi there</Text>
    )
  }
}
export default PlogScreenWeather