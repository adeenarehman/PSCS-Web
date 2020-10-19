import React, { Component } from 'react';
import './Dashboard.css'
import { GoogleComponent } from 'react-google-location'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const API_KEY = "AIzaSyAGKFNn0Gk9EFj35JTLG5G77RQ3XHD8hH8"


class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            place: {},
            //   center: {
            //     lat: 24.8607,
            //     lng: 67.0011
            //   },
            //   zoom: 13
        };
    }

    render() {
        return (
            <div className={'mainPage'}>

                <div className={'innerPage'}>

                    <div className={'searching'}>

                        <div className={'inputBox'}>
                            {/* <HiOutlineMail style={{ height: 30, width: 30, color: '#0D3AA9' }} /> */}
                            <input className={'input'}
                                type={'text'}
                                placeholder={'Radius'}
                            />
                        </div>

                        <div className={'searchBar'}>
                            <GoogleComponent
                                apiKey={API_KEY}
                                placeholder={'Start typing location'}
                                language={'en'}
                                country={'country:pk'}
                                coordinates={true}
                                // locationBoxStyle={'custom-style'}
                                // locationListStyle= {'custom-style-list'}
                                onChange={(e) => { this.setState({ place: e }) }}
                            />
                        </div>

                        <div className={'create'}>
                            CREATE
                            {/* <Link to="/dashboard">Signin</Link> */}
                        </div>

                        {/* <PlacesAutocomplete
                            // value={this.state.address}
                            onChange={(e) => { this.setState({ place: e }) }}
                        /> */}
                    </div>
                    <div className={'listing'}></div>

                </div>
            </div>
        );
    }
}

export default Dashboard;