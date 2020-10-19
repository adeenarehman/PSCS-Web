import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleComponent } from 'react-google-location'
// import {
//     BrowserRouter as Router,
//     Link
//   } from "react-router-dom";

// const API_KEY = "AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio"
const API_KEY = "AIzaSyAGKFNn0Gk9EFj35JTLG5G77RQ3XHD8hH8"

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: {},
      center: {
        lat: 24.8607,
        lng: 67.0011
      },
      zoom: 13
    };
  }

  render() {
    // console.warn("place:",this.state.place.coordinates)
    return (
            
       
      <div style={{ height: '100vh', width: '100%', display:'flex' }}>
      
        <div style={{ height: '100vh', width: '25%' }}>
          <GoogleComponent
            apiKey={API_KEY}
            language={'en'}
            //country={'country:pk'}
            coordinates={true}
            //locationBoxStyle={'custom-style'}
            //locationListStyle={'custom-style-list'}
            onChange={(e) => { this.setState({ place: e }) }}
          />
        </div>
        <div style={{ height: '100vh', width: '75%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio' }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          ></GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Map;