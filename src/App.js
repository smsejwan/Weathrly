import React, { Component } from 'react';

import './App.css';
import {skey} from './key.js';

var location;

class App extends React.Component {

  state = {
    location: '',
  };

  fetchData = (evt) =>{
    evt.preventDefault();
    
    location= sessionStorage.getItem('saved_location');
    console.log("location: " + location);
    if(location==null){
    sessionStorage.setItem('saved_location', this.state.location);
    location = sessionStorage.getItem('saved_location');
    } 
    location= encodeURIComponent(location);
    

   // var client = new XMLHttpRequest();
    var key = skey.a;

    // //http://api.wunderground.com/api/920552fce9f6cd69/forecast/q/Arvada%20CO,USA.json

    var urlPrefix = 'http://api.wunderground.com/api/'+ key+ '/';
    var urlSuffix = '.json';
    var conditions_url = urlPrefix + "conditions/q/" + location + urlSuffix;
    var forecast_url = urlPrefix + "forecast/q/" + location + urlSuffix;
    // var self = this;
    var weather = new XMLHttpRequest();
    weather.open("GET", conditions_url , false);
    weather.send(null);

    var forecast = new XMLHttpRequest();
    forecast.open("GET", forecast_url, false);
    forecast.send(null);

    var r = JSON.parse(weather.response);
    var f = JSON.parse(forecast.response);

    var dis =  r.current_observation.display_location.full;
    var temp =   "<strong>Temperature: </strong><br></br>" + r.current_observation.temperature_string;
    var wind = " <strong>Wind: </strong><br></br>" +r.current_observation.wind_string;
    var curr_condition =  "<strong>Condition: </strong><br></br>" + r.current_observation.weather;
    var curr_day =  f.forecast.simpleforecast.forecastday[0].date.weekday +", " 
    + f.forecast.simpleforecast.forecastday[0].date.monthname + " " + f.forecast.simpleforecast.forecastday[0].date.day;

    var expected_high = "<strong>High: </strong> <br></br>"+f.forecast.simpleforecast.forecastday[0].high.fahrenheit+ " F (" +  f.forecast.simpleforecast.forecastday[0].high.celsius + " C)" ;
    var expected_low = "<strong>Low: </strong> <br></br>" +f.forecast.simpleforecast.forecastday[0].low.fahrenheit+ " F (" +  f.forecast.simpleforecast.forecastday[0].low.celsius + " C)" ;

    var summary = "<strong>Summary of the Day: </strong>" + f.forecast.txt_forecast.forecastday[0].fcttext + " While in the Evening, "+f.forecast.txt_forecast.forecastday[1].fcttext

    function getWeather(id,res) {
      document.getElementById(id).innerHTML=res;
    }
    getWeather("weather_location",dis);
    getWeather("temp",temp);
    getWeather("wind",wind);
    getWeather("curr_condition",curr_condition);
    getWeather("curr_day",curr_day);
    getWeather("expected_high",expected_high);
    getWeather("expected_low",expected_low);
    getWeather("summary",summary);

    

  };


   changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    return (
      <div class="wrapper">
        <p class="heading">Welcome to Weatherly</p>
        <form onSubmit={this.fetchData} >
          <label class="subheading">I want to know the weather for
            <input placeholder={"location"} 
            type="text" 
            value={this.state.location}
            onChange={this.changeLocation}/>
          </label><br></br>
          <button type="submit" name="submit">Submit</button>
        </form>
        
        <div id="hide">
  
  <h1><span id="weather_location"> </span> </h1>
  <h3> <span id="curr_day"> </span></h3>

  <div class="tbl-content">
    <table >
      <tbody>
        <tr>
          <td> <span id="temp"></span></td>
          <td><span id="expected_high"></span></td>
          <td> <span id="expected_low"></span></td>
          <td><span id="wind"></span></td>
          <td><span id="curr_condition"></span></td>
        </tr>
        <tr>
          <td colSpan="5"><span id="summary"></span> </td>
          

        </tr>
      </tbody>
    </table>
  </div>
  </div>
  </div>



    );
  }
}

export default App;
