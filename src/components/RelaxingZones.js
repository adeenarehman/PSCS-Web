import React, { Component, useState } from "react";
// import { useState  } from 'react';
import "./RelaxingZones.css";
import { GoogleComponent } from "react-google-location";
import Ripples from "react-ripples";
import { Map, Circle, GoogleApiWrapper } from "google-maps-react";
import * as firebase from "firebase/app";
import firestore from "firebase/firestore";
import { firebaseConfig } from "./FirebaseConfig";
import Geocode from "react-geocode";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import Dropdown from "react-dropdown";
// import DateTimePicker from 'react-datetime-picker'
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

export class relaxingZones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map_center: {
        //latlng for view map
        lat: 24.916624,
        lng: 67.074067,
      },
      Zones: [],
      zoom: 11,
      place: {},
      zones_latitude: null, //for create zones
      zones_longitude: null, //for create zones
      radius: null, //for create zones
      zones_type: null,
      updated_radius: null,
      time: null,
      address: "",
      placeholder: "Search Places ...",
    };
    this.onInputChange = this.onInputChange.bind(this);
    // this.onTimeChange = this.onTimeChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  reloadPage = async () => {
    window.location.reload(true);
  };

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // onTimeChange(e) {
  //     this.setState({ time: e.target.value });
  // }

  _onSelect(option) {
    console.log("You selected ", option.value);
    console.log("You selected ", option.label);
    this.setState({ zones_type: option.value });
  }

  handleChange = (address) => {
    //send seaarch address
    this.setState({ address });
  };

  handleSelect = (address) => {
    //convert address to cordinates
    Geocode.setApiKey("AIzaSyB7Hwn_-eHX2Or_vobRHT0f4bejWcYPpx0");

    Geocode.setLanguage("en");
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        {
          this.setState({ zones_latitude: lat, zones_longitude: lng });
        }
      },
      (error) => {
        console.error(error);
      }
    );
    // console.log("ajkda: ",address);
    this.setState({ placeholder: address });
  };

  createCircle(lat, long, rad, zones_type) {
    //create circles/Zones
    if (zones_type == "Critical") {
      return (
        <Circle
          radius={rad}
          center={{ lat: lat, lng: long }}
          onMouseover={() => console.log("mouseover")}
          onClick={() => console.log("click")}
          onMouseout={() => console.log("mouseout")}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#FF0000"
          fillOpacity={0.5}
        />
      );
    } else {
      return (
        <Circle
          radius={rad}
          center={{ lat: lat, lng: long }}
          onMouseover={() => console.log("mouseover")}
          onClick={() => console.log("click")}
          onMouseout={() => console.log("mouseout")}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#20FF20"
          fillOpacity={0.5}
        />
      );
    }
  }

  componentDidMount() {
    this.getCordinates();
  }

  getCordinates = async () => {
    //get zones data from firebase
    let tempdata = [];
    const db = firebase.firestore();
    const snapshot = await db.collection("zones").get();
    snapshot.forEach((doc) => {
      let tempobj = {
        uid: doc.id,
        latitude: doc.data().latitude,
        zones_type: doc.data().zones_type,
        longitude: doc.data().longitude,
        place: doc.data().place,
        radius: doc.data().radius,
      };
      tempdata.push(tempobj);
    });
    this.setState({ Zones: tempdata });
  };

  addCordinates = async () => {
    const db = firebase.firestore();
    const docRef = db.collection("zones").doc();
    await docRef.set({
      latitude: this.state.zones_latitude,
      longitude: this.state.zones_longitude,
      radius: parseInt(this.state.radius, 10),
      zones_type: this.state.zones_type,
      place: this.state.address,
    });
    // await this.reloadPage();
    this.getCordinates();
  };

  deleteCordinates = async (delete_id) => {
    const db = firebase.firestore();

    const res = await db.collection("zones").doc(delete_id).delete();
    // await this.reloadPage();
    this.getCordinates();
  };

  updateRadius = async (update_id) => {
    const db = firebase.firestore();

    const res = await db
      .collection("zones")
      .doc(update_id)
      .update({ radius: parseInt(this.state.updated_radius) });
    // await this.reloadPage();
    this.getCordinates();
  };

  // dateTime  () {
  //            const [value, onChange] = this.setState(new Date());
  // }

  render() {
    console.log("Time is = ", this.state.time);

    // const [value, onChange] = useState(new Date());

    return (
      <div className={"relaxingMainPage"} /*container div*/>
        <div className={"relaxingInnerPage"} /*inner container div*/>
          <div
            className={
              "relaxingHeader"
            } /*container div of logo & Logout button*/
          >
            <div className={"relaxingLogoImg"}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_lock.png?alt=media&token=6a8c8a6c-7150-4d39-8b36-35078bff679a"
                className={"relaxingLogoPic"}
              />
            </div>

            <div className={"relaxingHeaderHeading"}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_text.png?alt=media&token=a540a39a-e153-4a04-89c3-3fe86660ba60"
                className={"relaxingHeading"}
              />
            </div>

            <div className={"relaxingLogout"}>
              <Ripples
                color="#DCDCDC"
                during={1200}
                className={"relaxingLogoutButton"}
              >
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <button className={"relaxingLogoutButton1"}>Logout</button>
                </Link>
              </Ripples>
            </div>
          </div>

          {/* FOOTER BOX DIV */}

          <div
            className={
              "relaxingFooterBox"
            } /*container div for zones list & relaxing time*/
          >
            {/* RELAXING TIME SETTING DIV*/}
            <div className={"relaxingTimeSelectBox"}>
              <div className={"relaxingDropdownBox"}>
                <Dropdown
                  options={this.state.Zones.map((value) => ({
                    value: value.uid,
                    label: value.place,
                  }))}
                  controlClassName="relaxingControlClassName"
                  className={"relaxingClassName"}
                  onChange={this._onSelect}
                  //  value={defaultOption}
                  menuClassName="relaxingMenuClassName"
                  placeholder="Select Zone Type"
                  placeholderClassName="relaxingPlaceholderClassName"
                />
              </div>

              <div style={{ backgroundColor: "white" }}>
                <DateTimePicker
                // onChange={this.dateTime}
                // value={value}
                // name={'time'}
                />
              </div>
            </div>

            {/*ZONES LIST WORK */}
            <div
              style={{
                height: "80vh",
                width: "100%",
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className={"relaxingListBox"} /*list container div*/>
                <div className={"relaxingListInnerContainer"}>
                  {this.state.Zones.map((value) => (
                    <div className={"relaxingSingleRow"}>
                      <div className={"relaxingTextDiv"}>
                        <p className={"relaxingText"}>{value.place}</p>
                      </div>

                      {/* <Popup
                                                trigger={
                                                    <button className={'relaxingButton'}
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

                                                
                                                <div className={'editPopup-InputDropdown'}>

                                                    <div className={'editInputBox'} >
                                                        <input className={'input1'}
                                                            type={'text'}
                                                            placeholder={'Radius...'}
                                                            name={'updated_radius'}
                                                            value={this.state.updated_radius}
                                                            onChange={this.onInputChange}

                                                        />
                                                    </div>

                                                    <button className={'editPopupButton'}
                                                        onClick={() => { this.updateRadius(value.uid) }}
                                                    >
                                                        Add Zone
                                                    </button>

                                                    <button className={'deleteButton'}
                                                        onClick={() => { this.deleteCordinates(value.uid) }}
                                                    >
                                                        Delete Zone
                                                    </button>
                                                      
                                                    </div>

                                                <div className={'editPopup-DeleteButton'}>

                                                </div>
                                            </Popup> */}
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
  apiKey: "AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio",
})(relaxingZones);
