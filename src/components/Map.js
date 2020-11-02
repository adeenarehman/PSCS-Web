import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Map, Circle, GoogleApiWrapper} from 'google-maps-react';
import { GoogleComponent } from 'react-google-location'
// import {
//     BrowserRouter as Router,
//     Link
//   } from "react-router-dom";

// const API_KEY = "AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio"
const API_KEY = "AIzaSyAGKFNn0Gk9EFj35JTLG5G77RQ3XHD8hH8"
const coords = { lat: 24.8607, lng: 67.0011 };

export class MapContainer extends Component {
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


      <div style={{ height: '100vh', width: '100%', display: 'flex' }}>

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
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio' }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}

          /> */}

          <Map
            initialCenter={coords}
            google={this.props.google}
            // style={{ width: 500, height: 500, position: 'relative' }}
            zoom={14}
          >
            <Circle
              radius={1200}
              center={coords}
              strokeColor='transparent'
              strokeOpacity={0}
              strokeWeight={5}
              fillColor='#FF0000'
              fillOpacity={0.2}
            />
          </Map>

        </div>
      </div>
    );
  }
}

// export default Map;
export default GoogleApiWrapper({
  apiKey: ('AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio')
})(MapContainer)