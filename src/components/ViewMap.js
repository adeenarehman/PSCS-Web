import React, { Component  } from 'react';
// import { useState  } from 'react';
import './ViewMap.css'
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
import {
    BrowserRouter as Router,
    Link, Redirect, useHistory
} from "react-router-dom";
// import { RadioGroup, RadioButton, ReversedRadioButton,RadioIcon } from 'react-radio-buttons';
import Dropdown from 'react-dropdown';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import DateTimePicker from 'react-datetime-picker'



export class ViewMap extends Component {

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
            zones_latitude: null,    //for create zones 
            zones_longitude: null,   //for create zones
            radius: null,           //for create zones
            zones_type: null,
            updated_radius: null,
            address: '',
            placeholder: 'Search Places ...',
        };
        this.onInputChange = this.onInputChange.bind(this);
        this._onSelect = this._onSelect.bind(this)

    }

    _onSelect(option) {
        // console.log('You selected ', option.label)
        this.setState({ zones_type: option.label })
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
        // console.log("ajkda: ",address);
        this.setState({ placeholder: address })
    };

    createCircle(lat, long, rad, zones_type) {  //create circles/Zones
        if (zones_type == 'Critical') {
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

        } else {
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
                    fillColor='#20FF20'
                    fillOpacity={0.5}
                />
            );
        }

    }

    componentDidMount() {
        this.getCordinates();
    }

    getCordinates = async () => { //get zones data from firebase
        let tempdata = []
        const db = firebase.firestore();
        const snapshot = await db.collection('zones').get();
        snapshot.forEach((doc) => {
            let tempobj = {
                'uid': doc.id, 'latitude': doc.data().latitude, 'zones_type': doc.data().zones_type,
                'longitude': doc.data().longitude, 'place': doc.data().place, 'radius': doc.data().radius
            };
            tempdata.push(tempobj)
        });
        this.setState({ Zones: tempdata })
    }

    addCordinates = async () => {
        const db = firebase.firestore();
        const docRef = db.collection('zones').doc();
        await docRef.set({
            latitude: this.state.zones_latitude,
            longitude: this.state.zones_longitude,
            radius: parseInt(this.state.radius, 10),
            zones_type: this.state.zones_type,
            place: this.state.address
        });
        // await this.reloadPage();
        this.getCordinates();
    }

    deleteCordinates = async (delete_id) => {
        const db = firebase.firestore();

        const res = await db.collection('zones').doc(delete_id).delete();
        // await this.reloadPage();
        this.getCordinates();

    }

    updateRadius = async (update_id) => {
        const db = firebase.firestore();

        const res = await db.collection('zones').doc(update_id).update({radius:parseInt(this.state.updated_radius)});
        // await this.reloadPage();
        this.getCordinates();

    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    reloadPage = async () => {
        window.location.reload(true)
    }

//     editPopup () {
//         return(
//         <Popup
//           trigger={<button className={'editButton'}
//         //   onClick={() => { this.editPopup() }}
//           >
//               EDIT
//   </button>}
//           modal
//           nested
//         >
//           {close => (
//             <div className="modal">
//               <button className="close" onClick={close}>
//                 &times;
//               </button>
//               <div>HElLO </div>
//             </div> 
//           )}
//         </Popup>
//         );
//       }

    render() {
        console.log("Values = ", this.state.zones);

        const options =
            [
                'Critical', 'Mild'
            ];       

        return (
            <div className={'mapMainPage'}  /*container div*/ >

                <div className={'mapInnerPage'} /*inner container div*/>

                    <div className={'mapHeader'} /*container div of logo & Logout button*/>

                        <div className={'mapLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_lock.png?alt=media&token=6a8c8a6c-7150-4d39-8b36-35078bff679a" className={'mapLogoPic'} />
                        </div>

                        <div className={'mapHeaderHeading'}>

                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_text.png?alt=media&token=a540a39a-e153-4a04-89c3-3fe86660ba60" className={'mapHeading'} />
                        </div>

                        <div className={'mapLogout'}>
                            <Ripples color="#DCDCDC" during={1200} className={'mapLogoutButton'}>
                                <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
                                    <button
                                        className={'mapLogoutButton1'}
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </Ripples>
                        </div>

                    </div>


{/* FOOTER BOX DIV */}

                    <div className={'footerBox'} /*container div for zones list & view map*/>

                        <div className={'headerBox'} /*container div of place & radius*/>

                            <div className={'searchBar'} /*search place div*/>

{/* PLACES AUTO-COMPLETE WORK */}
                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
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
                                                        ? {
                                                            backgroundColor: 'white', cursor: 'pointer', height: '6.5vh', alignItems: 'center', display: 'flex',
                                                            border: '0.4vh solid #026e7a',
                                                        }
                                                        : {
                                                            backgroundColor: '#fafafa', cursor: 'pointer', height: '6.5vh', alignItems: 'center', display: 'flex',
                                                            border: '0.2vh solid black'
                                                        };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
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

{/* INPUT RADIUS WORK */}
                            <div className={'inputBox'} /*input radius div*/>
                                <input className={'input1'}
                                    type={'text'}
                                    placeholder={'Radius...'}
                                    name={'radius'}
                                    value={this.state.radius}
                                    onChange={this.onInputChange}

                                />
                            </div>

{/*DROPDOWN FOR ZONE TYPE */}
                            <div className={'dropdownBox'} >

                                <Dropdown
                                    options={options} controlClassName='myMapControlClassName' className={'myMapClassName'}
                                    onChange={this._onSelect}
                                    //  value={defaultOption}   
                                    menuClassName='myMapMenuClassName'
                                    placeholder="Select Zone Type"
                                    placeholderClassName='myPlaceholderClassName'
                                />
                            </div>

                            
 {/* ADD ZONE POPUP */}
                            <Popup
                                trigger={
                                    <Ripples color="#DCDCDC" during={1200} className={'addButton'}>
                                        <button className={'addButton1'} onClick={() => { this.addCordinates(); }}>
                                            Add
                                        </button>
                                    </Ripples>
                                        }
                                modal
                                className={'add-popup'}
                            >
                                <div style={{fontSize: '2.5vh'}}>
                                    Zone Has Been Added Succesfully.
                                </div>
                                
                                    <button className={'closeButton'} // onClick={() => { this.addCordinates(); }}
                                    >
                                        OK
                                    </button>
                            </Popup>

{/* VIEW MAP POPUP */}
                            <Popup 
                                trigger={
                                    <Ripples color="#DCDCDC" during={1200} className={'addButton'}>
                                        <button className={'addButton1'}> View Map</button>
                                    </Ripples>
                                }
                                modal
                                nested
                                className={'map-popup'}
                            >
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
                                            this.createCircle(value.latitude, value.longitude, value.radius, value.zones_type)
                                        ))}
                                    </Map>

                                </div>
                            </Popup>

                            {/* <div className={'buttonDiv'}>

                                <button className={'deleteButton'}
                                onClick={() => { this.deleteCordinates(value.uid) }}
                                >
                                    EDIT
                                </button>
                            </div> */}
                        </div>

{/*ZONES LIST WORK */}
                        <div style={{ height: '80vh', width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>

                            <div className={'listBox'} /*list container div*/>

                                <div className={'listInnerContainer'}>

                                    {this.state.Zones.map(value => (

                                        <div className={'mapSingleRow'}>

                                            <div className={'mapTextDiv'}>

                                                <p className={'mapText'}>
                                                    {value.place}
                                                </p>

                                            </div>
                                            
                                            
{/* EDIT ZONE POPUP */}                  
                                            <Popup 
                                                trigger={
                                                    <button className={'editButton'}
                                                    // onClick={() => { this.deleteCordinates(value.uid) }}
                                                    >
                                                        EDIT
                                                    </button>
                                                }
                                                modal
                                                className={'edit-popup'}
                                            >
                                                
                                                <button className="close"                                                   
                                                >
                                                    &times;
                                                </button>

                        {/*EDIT ZONE DIV */}   <div className={'editPopup-InputDropdown'}> 
                                                    
                                                    <div className={'editInputBox'} /*input radius div*/>
                                                        <input className={'input1'}
                                                            type={'text'}
                                                            placeholder={'Radius...'}
                                                            name={'updated_radius'}
                                                            value={this.state.updated_radius}
                                                            onChange={this.onInputChange}

                                                        />
                                                    </div>

                                                   

                                                    <button className={'editPopupButton'}
                                                     onClick={() => { this.updateRadius(value.uid)}} 
                                                    >                         
                                                        Add Zone
                                                    </button>

                                                    <button className={'deleteButton'}
                                                        onClick={() => { this.deleteCordinates(value.uid) }}
                                                    >
                                                        Delete Zone
                                                    </button>
                {/*EDIT ZONE DIV FINISHED*/}    </div>

                                                <div className={'editPopup-DeleteButton'}>
                                                    
                                                </div>

                                            </Popup>

                                        </div>

                                        
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio')
})(ViewMap)