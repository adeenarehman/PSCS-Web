import React, { Component } from 'react';
import './Dashboard.css'
import { GoogleComponent } from 'react-google-location'
import GoogleMapReact from 'google-map-react';
import Ripples from 'react-ripples'

import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import PlacesAutocomplete from 'react-places-autocomplete';



const API_KEY = "AIzaSyAGKFNn0Gk9EFj35JTLG5G77RQ3XHD8hH8"
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const names = ['James', 'Paul', 'John', 'George', 'Ringo'];

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 24.8607,
                lng: 67.0011
            },
            zoom: 13,
            place: {},
            latitute: '24.860770',
            longitude: '67.063822',
            radius: '100'
        };
    }

    componentDidMount() {
        this.getCordinates();
    }

    getCordinates = async () => {
        const db = firebase.firestore();
        const snapshot = await db.collection('Users').get();
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    }

    addCordinates = async () => {
        const db = firebase.firestore();
        const docRef = db.collection('Cordinates').doc();
        await docRef.set({
            latitute: this.state.latitute,
            longitude: this.state.longitude,
            radius: this.state.radius
        });
    }
     


    render() {
        return (
            <div className={'mainPage'}>

                <div className={'innerPage'}>

                    <div className={'headerBox'}>


                        <div className={'searchBar'}>

                            {/* <GooglePlacesAutocomplete
                                apiKey="AIzaSyAGKFNn0Gk9EFj35JTLG5G77RQ3XHD8hH8"
                                selectProps={{
                                    placeholder: 'Start Typing Location...',
                                  }}
                            /> */}

                            <GoogleComponent
                                apiKey={API_KEY}
                                placeholder={'Start typing location'}
                                language={'en'}
                                country={'country:pk'}
                                coordinates={true}
                                color= {'black'}
                                // locationBoxStyle={'custom-style'}
                                // locationListStyle= {'custom-style-list'}
                                onChange={(e) => { this.setState({ place: e }) }}
                            />
                        </div>


                        <div className={'inputBox'}>
                            <input className={'input'}
                                type={'text'}
                                placeholder={'Radius'}
                            />
                        </div>

                        <Ripples color="#DCDCDC" during={1200} className={'addButton'}>
                            <button onClick={this.addCordinates} className={'addButton'}>Add</button>
                        </Ripples>

                    </div>

                    <div className={'footerBox'}>

                        <div className={'listBox'}>

                            {names.map(name => (
                                <li>
                                    {this.getCordinates}
                                    {name}
                                    <button className={'deleteButton'} >DELETE</button>
                                </li>
                            ))}


                            {/* <button onClick={this.addCordinates}>Add</button>

                            <div className={'create'}>
                                CREATE
                                    {/* <Link to="/dashboard">Signin</Link> */}
                            {/* </div> */}

                            {/* <PlacesAutocomplete
                                    // value={this.state.address}
                                    onChange={(e) => { this.setState({ place: e }) }}
                                /> */}

                        </div>
                        <div className={'mapBox'}>

                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyA_d3pS7JqjFnGWc9hHkvT2MUQvAKo5Bio' }}
                                defaultCenter={this.state.center}
                                defaultZoom={this.state.zoom}
                            />

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;