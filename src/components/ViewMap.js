import React, { Component } from 'react';
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
import Modal from 'react-awesome-modal';
import Popup from 'reactjs-popup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

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
            updated_zones_type: null,
            address: '',
            placeholder: 'Search Places ...',
            visible: false,
            startTime: '',
            endTime: '',
            key: 0,

        };
        this.onInputChange = this.onInputChange.bind(this);
        this._onSelect = this._onSelect.bind(this);
        this._onSelect1 = this._onSelect1.bind(this);
    }

    _onSelect(option) {
        // console.log('You selected ', option.label)
        this.setState({ zones_type: option.label })
    }

    _onSelect1(option) {
        // console.log('You selected ', option.label)
        this.setState({ updated_zones_type: option.label })
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

    componentDidMount() {
        this.getCordinates();
        setInterval(() => {
            this.getCordinates();
            // console.warn("kdbcjkbckajs")
        }, 1000

        )
        // this.onChnageKey();
    }

    updateKeyToOne = async (uid, key) => {
        const db = firebase.firestore();
        const res = await db.collection('zones').doc(uid).update({
            key: key
        });
    }

    updateKeyToZero = async (uid, key) => {
        const db = firebase.firestore();
        const res = await db.collection('zones').doc(uid).update({
            key: key,
            startTime: null,
            endTime: null
        });
    }

    onChangeKey(uid, startTime, endTime) {
        var today = Date()
        var currentTime = Date.parse(today)

        if (startTime == currentTime) {
            // alert("key updated to 1")
            this.updateKeyToOne(uid, 1)
        }

        else if (endTime == currentTime) {
            this.updateKeyToZero(uid, 0)
            // alert("key updated to 0")
        }
    }

    createCircle(uid, lat, long, rad, zones_type, startTime, endTime, key) {  //create circles/Zones
        this.onChangeKey(uid, startTime, endTime, key)

        if (zones_type == 'Critical') {
            if (key == 1) {
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
                        fillColor='#ECFF03' //yellow colour
                        fillOpacity={0.5}
                    />
                );
            }

            else if (key == 0) {
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
                        fillColor='#FF0000' //red colour
                        fillOpacity={0.5}
                    />
                );
            }
        }

        else if (zones_type == 'Mild') {
            if (key == 1) {
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
                        fillColor='#ECFF03' //yellow colour
                        fillOpacity={0.5}
                    />
                );
            }
    
            else if (key == 0) {
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
                        fillColor='#0BFF03' //green colour
                        fillOpacity={0.5}
                    />
                );
            }
        }
    }


    getCordinates = async () => { //get zones data from firebase
        let tempdata = []
        const db = firebase.firestore();
        const snapshot = await db.collection('zones').get();
        snapshot.forEach((doc) => {
            let tempobj = {
                'uid': doc.id, 'latitude': doc.data().latitude, 'zones_type': doc.data().zones_type, 'longitude': doc.data().longitude,
                'place': doc.data().place, 'radius': doc.data().radius, 'startTime': doc.data().startTime, 'endTime': doc.data().endTime,
                'key': doc.data().key,
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
            place: this.state.address,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            key: this.state.key,
        });
        toast('Zone Added Successfully', 
                     {position: toast.POSITION.BOTTOM_CENTER})
        // await this.reloadPage();
        this.getCordinates();
    }

    deleteCordinates = async (delete_id) => {
        const db = firebase.firestore();
        const res = await db.collection('zones').doc(delete_id).delete();
        toast('Zone Deleted Successfull', 
                     {position: toast.POSITION.BOTTOM_CENTER})
        // await this.reloadPage();
        this.getCordinates();

    }

    updateRadius = async (update_id) => {
        console.log("Musibat= " + update_id)
        const db = firebase.firestore();
        const res = await db.collection('zones').doc(update_id).update({ radius: parseInt(this.state.updated_radius), zones_type: this.state.updated_zones_type });
        // await this.reloadPage();
        toast('Zone Updated Successfull', 
                     {position: toast.POSITION.BOTTOM_CENTER})
        this.getCordinates();

    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    reloadPage = async () => {
        window.location.reload(true)
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    render() {
        // console.log("Values = ", this.state.zones);

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
                                                            backgroundColor: 'white', cursor: 'pointer', height: 'auto', alignItems: 'center', display: 'flex',
                                                            border: '0.4vh solid #026e7a',
                                                        }
                                                        : {
                                                            backgroundColor: '#fafafa', cursor: 'pointer', height:'auto', alignItems: 'center', display: 'flex',
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
                            <Ripples color="#DCDCDC" during={1200} className={'addButton'}>
                                <button className={'addButton1'} onClick={() => { this.addCordinates(); }}>
                                    Add
                                        </button>
                            </Ripples>

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
                                            // console.log("check value hour = "+value.hour),            
                                            // this.createCircle(value.latitude, value.longitude, value.radius, value.zones_type,
                                            //     value.startTime, value.endTime, value.key
                                            //     )
                                            this.createCircle(value.uid, value.latitude, value.longitude, value.radius, value.zones_type,
                                                value.startTime, value.endTime, value.key
                                            )

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

                                            <button className={'deleteButton'}
                                                onClick={() => { this.deleteCordinates(value.uid) }}
                                            >
                                                Delete
                                            </button>

                                            <input type="button" value="Edit" onClick={() => this.openModal()} className={'editButton'} />

                                            <Modal
                                                visible={this.state.visible}
                                                width="600"
                                                height="140"
                                                effect="fadeInUp"
                                                onClickAway={() => this.closeModal()}
                                            >
                                                <div>

                                                    <div className={'editPopup-InputDropdown'}>
                                                        <div className={'editInputBox'} /*input radius div*/>
                                                            <input className={'input1'}
                                                                type={'text'}
                                                                placeholder={'Radius...'}
                                                                name={'updated_radius'}
                                                                value={this.state.updated_radius}
                                                                onChange={this.onInputChange}
                                                            />
                                                        </div>

                                                        <div className={'editDropdownBox'} >
                                                            <Dropdown
                                                                options={options} controlClassName='myMapControlClassName' className={'myMapClassName'}
                                                                onChange={this._onSelect1}
                                                                //  value={defaultOption}   
                                                                menuClassName='myMapMenuClassName'
                                                                placeholder="Select Zone Type"
                                                                placeholderClassName='myPlaceholderClassName'
                                                            />
                                                        </div>

                                                        <button className={'editPopupButton'}
                                                            onClick={() => { this.updateRadius(value.uid) }}
                                                        >
                                                            Update
                                                    </button>

                                                    </div>

                                                    <div style={{ height: '10vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                                        <a href="javascript:void(0);" style={{ height: '5vh', width: '20%' }} >
                                                            <button className={'closePopupButton'}
                                                                onClick={() => this.closeModal()}
                                                            >
                                                                Close
                                                         </button>
                                                        </a>

                                                    </div>

                                                </div>
                                            </Modal>

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