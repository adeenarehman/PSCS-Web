import React, { Component } from 'react';
import './ViewFine.css'
import Ripples from 'react-ripples'
import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';
import {BrowserRouter as Router,
    Link,
    } from "react-router-dom";


export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            violations: [],
            place: {},
            uid: null,
            name: null,
            fine: null,
        }
    };

    componentDidMount() {
        this.getCordinates();
    }

    getCordinates = async () => { //get violations data from firebase
        let tempdata = []
        const db = firebase.firestore();
        const snapshot = await db.collection('violations').get();
        snapshot.forEach((doc) => {
            let tempobj = { 'uid': doc.id, 'name': doc.data().name, 'fine': doc.data().fine };
            tempdata.push(tempobj)
        });
        this.setState({ violations: tempdata })
    }

    render() {
        console.log("Values = ", this.state.violations);

        return (
            <div className={'mainDiv'}  /*container div*/ >

                <div className={'innerDiv'} /*inner container div*/>

                    <div className={'header'} /*container div of place & radius*/>

                        <div className={'logoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Logo%2Btext.png?alt=media&token=56500bea-00cd-43f5-b5cd-7b82c98d2261" className={'logoPic'} />
                        </div>

                        <h1>Violation List</h1>

                        <div className={'logout'}>
                        <Link to="/signin">
                            <Ripples color="#DCDCDC" during={1200} className={'logoutButton'}>
                                <button
                                    className={'logoutButton1'}
                                >
                                    Logout
                                </button>
                            </Ripples>
                        </Link>  
                        </div>

                    </div>

                    <div className={'footer'} /*container div for zones list & view map*/>

                        <div className={'fine'} /*list container div*/>

                            <div className={'listInnerContainer'}>

                                <div className={'rows'}>

                                    <div className={'textBox'}>

                                        <h1 className={'textHeading'}>
                                            USER ID
                                        </h1>

                                    </div>

                                    <div className={'textBox'}>

                                        <h1 className={'textHeading'}>
                                            NAME
                                        </h1>

                                    </div>

                                    <div className={'textHeadingBox'}>

                                        <h1 className={'textHeading'}>
                                            FINE
                                        </h1>

                                    </div>

                                </div>

                                {this.state.violations.map(value => (

                                    <div className={'rows'}>

                                        <div className={'textBox'}>

                                            <h1 className={'text'}>
                                                {value.uid}
                                            </h1>

                                        </div>

                                        <div className={'textBox'}>

                                            <h1 className={'text'}>
                                                {value.name}
                                            </h1>

                                        </div>

                                        <div className={'textHeadingBox'}>

                                            <h1 className={'text'}>
                                                {value.fine}
                                            </h1>

                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default Dashboard