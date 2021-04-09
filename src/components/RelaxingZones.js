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
// import DateTimePicker from 'react-datetime-picker'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

export class relaxingZones extends Component {
    constructor(props) {
        super(props)
        this.state = {   
            Zones: [],
            hour: null,
            mins: null,
            day: null,
            month: null,
            year: null,
            uid_relaxing: '',
            place_relaxing: null,
            zones_type: null,
            yella:null
        };
        
        this._onSelectZone = this._onSelectZone.bind(this)
        this._onSelectHour = this._onSelectHour.bind(this)
        this._onSelectMins = this._onSelectMins.bind(this)
        this._onSelectDay = this._onSelectDay.bind(this)
        this._onSelectMonth = this._onSelectMonth.bind(this)
        this._onSelectYear = this._onSelectYear.bind(this)    
        // this.onChangeTime = this.onChangeTime.bind(this)    
    }
    
    // componentDidMount(){

    //     const [value, onChange] = useState(new Date());
    // }

    // onChangeTime(event) {
    //     // this.setState({  yella:new Date() });
    //     this.setState({ [event.target.yella]: event.target.value });
    //     console.log(this.state.yella)
    // }

    reloadPage = async () => {
        window.location.reload(true)
    }
    
    _onSelectZone(option) {
        this.setState({ uid_relaxing: option.value });
        this.setState({ place_relaxing: option.label });
        // console.log("You selected ", this.state.uid_relaxing);
        console.log("You selected ", this.state.place_relaxing);
    }
    
    _onSelectHour(option) {
        // console.log('You selected ', hoursArray.label)
        this.setState({ hour: option.label })
        // console.log(this.state.hour)
    }

    _onSelectMins(option) {
        // console.log('You selected ', option.label)
        this.setState({ mins: option.label })
    }

    _onSelectDay(option) {
        // console.log('You selected ', option.label)
        this.setState({ day: option.label })
    }

    _onSelectMonth(option) {
        // console.log('You selected ', option.label)
        this.setState({ month: option.label })
        // console.log(this.state.month)
    }

    _onSelectYear(option) {
        // console.log('You selected ', option.label)
        this.setState({ year: option.label })
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
        const db = firebase.firestore();
        const res = await db.collection('zones').doc(this.state.uid_relaxing).update({
            hour: this.state.hour,
            mins: this.state.mins, day: this.state.day, month: this.state.month, year: this.state.year, key: 1
        });
        // await this.reloadPage();
        this.getCordinates();
    }

    render() {
        const hoursArray = [];
        const minsArray = [];
        const daysArray = [];
        const monthArray = [];
        const yearArray = [];

        for (let index = 1; index <= 24; index++) {
            hoursArray[index] = index;
        }

        for (let a = 0; a <= 60; a++) {
            minsArray[a] = a;
        }

        for (let b = 1; b <= 31; ++b) {
            daysArray[b] = b;
        }

        for (let d = 1; d <= 31; ++d) {
            monthArray[d] = d;
        }

        for (let c = 2021; c <= 2030; ++c) {
            yearArray[c] = c;
        }

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

                                {/* <DateTimePicker
                                    // name = {'yella'}
                                    value={this.state.yella}
                                    onChange={this.onChangeTime}
                                /> */}
                                <p style={{fontSize:'2.5vh'}}>Select Date & Time:</p>
                                <Dropdown
                                    options={hoursArray}
                                    controlClassName='relaxingControlClassName' className={'relaxingClassName'}
                                    onChange={this._onSelectHour}
                                    //  value={defaultOption}   
                                    menuClassName='relaxingMenuClassName'
                                    placeholder="Hrs"
                                    placeholderClassName='relaxingPlaceholderClassName'
                                />
                                <Dropdown
                                    options={minsArray}
                                    controlClassName='relaxingControlClassName' className={'relaxingClassName'}
                                    onChange={this._onSelectMins}
                                    //  value={defaultOption}   
                                    menuClassName='relaxingMenuClassName'
                                    placeholder="Mins"
                                    placeholderClassName='relaxingPlaceholderClassName'
                                />
                                <Dropdown
                                    options={daysArray}
                                    controlClassName='relaxingControlClassName' className={'relaxingClassName'}
                                    onChange={this._onSelectDay}
                                    //  value={defaultOption}   
                                    menuClassName='relaxingMenuClassName'
                                    placeholder="Day"
                                    placeholderClassName='relaxingPlaceholderClassName'
                                />
                                 <Dropdown
                                    options={monthArray}
                                    controlClassName='relaxingControlClassName' className={'relaxingClassName'}
                                    onChange={this._onSelectMonth}
                                    //  value={defaultOption}   
                                    menuClassName='relaxingMenuClassName'
                                    placeholder="Month"
                                    placeholderClassName='relaxingPlaceholderClassName'
                                />
                                 <Dropdown
                                    options={yearArray}
                                    controlClassName='relaxingControlClassName' className={'relaxingClassName'}
                                    onChange={this._onSelectYear}
                                    //  value={defaultOption}   
                                    menuClassName='relaxingMenuClassName'
                                    placeholder="Year"
                                    placeholderClassName='relaxingPlaceholderClassName'
                                />
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