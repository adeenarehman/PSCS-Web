import React, { Component } from 'react';
import './Dashboard.css'
import { GoogleComponent } from 'react-google-location'
import Ripples from 'react-ripples'
import { Map, Circle, GoogleApiWrapper } from 'google-maps-react';
import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import Geocode from "react-geocode";


// const names = ['James', 'Paul', 'John', 'George', 'Ringo', 'James', 'Paul', 'John', 'George', 'Ringo', 'James', 'Paul', 'John', 'George', 'Ringo',];
// const API_KEY = "AIzaSyB7Hwn_-eHX2Or_vobRHT0f4bejWcYPpx0"
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const names = ['James', 'Paul', 'John', 'George', 'Ringo'];

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            map_center: {       //latlng for view map
                lat: 24.916624,
                lng: 67.074067
            },
            Zones: [],
            zoom: 11,
            place: {},
            zones_latitude:null,    //for create zones 
            zones_longitude:null,   //for create zones
            radius: null,           //for create zones
            address: '',
            //latitude:null,
            //longitude:null
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

    handleChange = address => {     //send seaarch address
        this.setState({ address });
    };

    handleSelect = address => {   //convert address to cordinates
        Geocode.setApiKey("AIzaSyB7Hwn_-eHX2Or_vobRHT0f4bejWcYPpx0");

        Geocode.setLanguage("en");
        Geocode.fromAddress(address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                { this.setState({ zones_latitude: lat, zones_longitude: lng }) }
            },
            error => {
                console.error(error);
            }
        );
    };

    createCircle(lat, long, rad) {  //create circles/Zones
        return (
            <Circle
                radius={rad}
                center={{ lat: lat, lng: long }}
                onMouseover={() => console.log('mouseover')}
                onClick={() => console.log('click')}
                onMouseout={() => console.log('mouseout')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.5}
            />
        );
    }

    componentDidMount() {
        this.getCordinates();
    }

    getCordinates = async () => { //get zones data from firebase
        let tempdata = []
        const db = firebase.firestore();
        const snapshot = await db.collection('zones').get();
        snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
            tempdata.push(doc.data())

        });
        this.setState({ Zones: tempdata })
    }



    addCordinates = async () => {
        const db = firebase.firestore();
        const docRef = db.collection('Cordinates').doc();
        await docRef.set({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            radius: this.state.radius
        });
    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        console.log("Values = ", this.state.zones_latitude, this.state.zones_longitude);
        return (
            <div className={'mainPage'}  /*container div*/ >

                <div className={'innerPage'} /*inner container div*/>

                    <div className={'headerBox'} /*container div of place & radius*/>

                        <div className={'searchBar'} /*search place div*/>
                            {/* <GoogleComponent
                                apiKey={API_KEY}
                                placeholder={'Start typing location'}
                                language={'en'}
                                country={'country:pk'}
                                coordinates={true}
                                color={'black'}
                                shouldFetchSuggestions={this.state.place.length > 3}
                                // locationBoxStyle={'custom-style'}
                                locationListStyle= {'style-list'}
                                onChange={(e) => { this.setState({ place: e }) }}
                            /> */}

                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                shouldFetchSuggestions={this.state.address.length >= 2}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: 'grey', cursor: 'pointer' }
                                                    : { backgroundColor: 'grey', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style: { backgroundColor: 'white', position: 'sticky',
                                                            height:'5vh',width:'100%',},
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>


                        <div className={'inputBox'} /*input radius div*/>
                            <input className={'input1'}
                                type={'text'}
                                placeholder={'Radius'}
                                name={'radius'}
                                value={this.state.radius}
                                onChange={this.onInputChange}

                            />
                        </div>

                        <Ripples color="#DCDCDC" during={1200} className={'addButton'} /*Add zone button*/>
                            <button
                                // onClick={this.addCordinates}
                                className={'addButton1'}
                            >Add</button>
                        </Ripples>

                    </div>

                    <div className={'footerBox'} /*container div for zones list & view map*/>

                        <div className={'listBox'} /*list container div*/>

                            <div style={{ height: '99%', width: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>

                                {this.state.Zones.map(value => (

                                    <div style={{
                                        height: '8%', width: '99%', backgroundColor: "white", marginBottom: '0.5%', marginLeft: '0.4%',
                                        alignItems: 'center', display: 'flex', justifyContent: 'space-around'
                                    }}>

                                        <div style={{
                                            height: '100%', width: '80%', alignItems: 'center',
                                            display: 'flex', marginLeft: '0.5%'
                                        }}>

                                            <p style={{ fontSize: '2vh', height: '70%', width: '100%' }}>
                                                {value.place}
                                            </p>

                                        </div>

                                        <div style={{
                                            height: '85%', width: '20%', marginRight: '0.5%', borderColor: '#0D3AA9',
                                            borderWidth: '1%'
                                        }}>

                                            <Ripples color="#DCDCDC" during={1200} className={'deleteButton'} >
                                                <button className={'deleteButton'}>DELETE</button>
                                            </Ripples>

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                        <div className={'mapBox'} /*Map container div*/>

                            <Map
                                initialCenter={this.state.map_center}
                                google={this.props.google}
                                // style={{ width: 500, height: 500, position: 'relative' }}
                                zoom={this.state.zoom}
                            //onReady={this.createCircle()} 
                            >
                                {this.state.Zones.map(value => (
                                    // console.log("check value lat = "+value.latitude),
                                    // console.log("check value long = "+value.longitude),            
                                    this.createCircle(value.latitude, value.longitude, value.radius)
                                ))}
                            </Map>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio')
})(Dashboard)