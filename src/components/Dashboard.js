import React, { Component } from 'react';
import './Dashboard.css'
import { GoogleComponent } from 'react-google-location'
import Ripples from 'react-ripples'
import { Map, Circle, GoogleApiWrapper } from 'google-maps-react';
import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';



// const names = ['James', 'Paul', 'John', 'George', 'Ringo', 'James', 'Paul', 'John', 'George', 'Ringo', 'James', 'Paul', 'John', 'George', 'Ringo',];
const API_KEY = "AIzaSyDKMc4fu4GunH8TbX-ZEkJsrdEPkZEu31k"
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const names = ['James', 'Paul', 'John', 'George', 'Ringo'];

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 24.8607,
                lng: 67.0011
            },
            Zones: [],
            zoom: 13,
            place: {},
            lat: 24.854640,
            lng: 67.043271,
            radius: 350
        };

    }

    createCircle(lat, long, rad) {
        console.log("check lat = " + lat)
        console.log("check long = " + long)
        console.log("check radius = " + rad)

        {this.state.Zones.map(value => (
            // console.log("check value lat = "+value.latitude),
            // console.log("check value long = "+value.longitude)            
            // this.createCircle(value.latitude, value.longitude, value.radius)
           
            <Circle
                radius={rad}
                center={{ lat: value.latitude, long: value.longitude }}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.2}
            />
        ))}
        
    }

    componentDidMount() {
        this.getCordinates();
    }

    getCordinates = async () => {
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



    render() {
        // console.log("Zones = ", this.state.Zones);
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
                                color={'black'}
                                // locationBoxStyle={'custom-style'}
                                // locationListStyle= {'custom-style-list'}
                                onChange={(e) => { this.setState({ place: e }) }}
                            />
                        </div>


                        <div className={'inputBox'}>
                            <input className={'input1'}
                                type={'text'}
                                placeholder={'Radius'}
                            />
                        </div>

                        <Ripples color="#DCDCDC" during={1200} className={'addButton'}>
                            <button 
                            // onClick={this.addCordinates}
                             className={'addButton1'}
                             >Add</button>
                        </Ripples>

                    </div>

                    <div className={'footerBox'}>

                        <div className={'listBox'}>

                            <div style={{ height: '99%', width: '850px', overflowY: 'scroll', overflowX: 'hidden'}}>

                                {this.state.Zones.map(value => (

                                    <div style={{height: '8%', width: '825px', backgroundColor: "white", marginBottom: '0.5%',marginLeft: '0.4%',
                                                 alignItems: 'center', display: 'flex', justifyContent: 'space-around'}}>

                                        <div style={{ height: '100%', width: '700px', alignItems: 'center',
                                                      display: 'flex', marginLeft: '0.5%'}}>

                                            {value.place}
                                            
                                        </div>

                                        <div style={{ height: '85%', width: '150px', marginRight: '0.5%', borderColor: '#0D3AA9',
                                                      borderWidth: '1%' }}>

                                            <Ripples color="#DCDCDC" during={1200} className={'deleteButton'} >
                                                <button className={'deleteButton'}>DELETE</button>
                                            </Ripples>

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                        <div className={'mapBox'}>

                            <Map
                                initialCenter={this.state.center}
                                google={this.props.google}
                                // style={{ width: 500, height: 500, position: 'relative' }}
                                zoom={this.state.zoom}
                                onReady={this.createCircle()} 
                            >
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