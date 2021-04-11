import React, { Component, useState } from 'react';
// import { useState  } from 'react';
import './RelaxingZones.css'
import { GoogleComponent } from 'react-google-location'
import Ripples from 'react-ripples'
import { Map, Circle, GoogleApiWrapper } from 'google-maps-react';
import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';
import Geocode from "react-geocode";
import {
    BrowserRouter as Router,
    Link, Redirect, useHistory
} from "react-router-dom";
import Dropdown from 'react-dropdown';
import DateTimePicker from 'react-datetime-picker'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export class relaxingZones extends Component {
    constructor(props) {
        super(props)
        this.state = {   
            Zones: [],
            uid_relaxing: '',
            place_relaxing: null,
            zones_type: null,
            startRelaxingTime:new Date,
            endRelaxingTime:new Date
        };
        
        this._onSelectZone = this._onSelectZone.bind(this)
    }
    
    
    reloadPage = async () => {
        window.location.reload(true)
    }
    
    _onSelectZone(option) {
        this.setState({ uid_relaxing: option.value });
        this.setState({ place_relaxing: option.label });
        // console.log("You selected ", this.state.uid_relaxing);
        console.log("You selected ", this.state.place_relaxing);
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

    // addCordinates = async () => {
    //     const db = firebase.firestore();
    //     const docRef = db.collection('zones').doc(this.state.uid_relaxing);
    //     await docRef.set({
    //         hour:this.state.hour,
    //     });
    //     // await this.reloadPage();
    //     this.getCordinates();
    // }

    updateData = async () => {
        let startTime = this.state.startRelaxingTime 
        let endTime = this.state.endRelaxingTime
        let startTimestamp = Date.parse(startTime) 
        let endTimestamp = Date.parse(endTime)

        const db = firebase.firestore();
        const res = await db.collection('zones').doc(this.state.uid_relaxing).update({
            startTime: startTimestamp,endTime: endTimestamp
        });
        // await this.reloadPage();
        toast('Relaxing Hour Added Successfully', 
                     {position: toast.POSITION.BOTTOM_CENTER})
        this.getCordinates();
    }

    onChangeStartRelaxingTime = (date)=>{
        // TODO: FIREBASE
        
        console.log(date,'onChangeStartRelaxingTime')
        this.setState({
            startRelaxingTime :date
        })
    }

    onChangeEndRelaxingTime = (date)=>{
        // console.log(date,'onChangeEndRelaxingTime')
        // TODO: FIREBASE
        this.setState({
            endRelaxingTime :date
        })
    }

    render() {
        // var x = Date()
        console.log("yella = "+this.state.startRelaxingTime)

        return (
            <div className={'relaxingMainPage'}  /*container div*/ >

                <div className={'relaxingInnerPage'} /*inner container div*/>

                    <div className={'relaxingHeader'} /*container div of logo & Logout button*/>

                        <div className={'relaxingLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_lock.png?alt=media&token=6a8c8a6c-7150-4d39-8b36-35078bff679a" className={'relaxingLogoPic'} />
                        </div>

                        <div className={'relaxingHeaderHeading'}>

                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_text.png?alt=media&token=a540a39a-e153-4a04-89c3-3fe86660ba60" className={'relaxingHeading'} />
                        </div>

                        <div className={'relaxingLogout'}>
                            <Ripples color="#DCDCDC" during={1200} className={'relaxingLogoutButton'}>
                                <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
                                    <button
                                        className={'relaxingLogoutButton1'}
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </Ripples>
                        </div>

                    </div>


                    {/* FOOTER BOX DIV */}

                    <div className={'relaxingFooterBox'} /*container div for zones list & relaxing time*/>

                        {/* RELAXING TIME SETTING DIV*/}
                        <div className={'relaxingTimeSelectBox'}>

                            <div className={'relaxingDropdownBox'} >
                                <Dropdown
                                    options={this.state.Zones.map((value) => ({
                                        value: value.uid,
                                        label: value.place,
                                    }))}
                                    controlClassName='relaxingControlClassName' className={'relaxingClassName'}
                                    onChange={this._onSelectZone}
                                    //  value={defaultOption}   
                                    menuClassName='relaxingMenuClassName'
                                    placeholder="Select Zone"
                                    placeholderClassName='relaxingPlaceholderClassName'
                                />
                            </div>

                            <div style={{
                                flexDirection: 'row', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                                height: '5vh', width: '50%', marginRight: '1%', marginLeft: '1%', color: 'white'
                            }}>

                                <p style={{fontSize:'2.5vh', fontWeight:'bold'}}>From:</p>
                                <div style={{backgroundColor:'white'}}>
                                <DateTimePicker
                                        onChange={this.onChangeStartRelaxingTime}
                                        value={this.state.startRelaxingTime}
                                    />
                                </div>
                                <p style={{fontSize:'2.5vh', fontWeight:'bold'}}>To:</p>
                                <div style={{backgroundColor:'white'}}>
                                <DateTimePicker
                                        onChange={this.onChangeEndRelaxingTime}
                                        value={this.state.endRelaxingTime}
                                    />
                                </div>                                    
                                
                            </div>
                            <div className={'relaxingLogout'}>
                                <Ripples color="#DCDCDC" during={1200} className={'relaxingLogoutButton'}>

                                    <button onClick={() => this.updateData()}
                                        className={'relaxingLogoutButton1'}
                                    >
                                        Submit
                                    </button>

                                </Ripples>
                            </div>
                        </div>

                        {/*ZONES LIST WORK */}
                        <div style={{ height: '80vh', width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>

                            <div className={'relaxingListBox'} /*list container div*/>

                                <div className={'relaxingListInnerContainer'}>

                                    {this.state.Zones.map(value => (

                                        <div className={'relaxingSingleRow'}>

                                            <div className={'relaxingTextDiv'}>

                                                <p className={'relaxingText'}>
                                                    {value.place}
                                                </p>

                                            </div>


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
})(relaxingZones)