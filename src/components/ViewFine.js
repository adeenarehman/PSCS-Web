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
            first_name: null,
            fine: null,
        }
    };

    componentDidMount() {
        this.getViolationData();

        setInterval(()=>{
            this.getViolationData();
            console.warn("kdbcjkbckajs")
        },5000
        
        )   

    }

    getViolationData = async () => { //get violations data from firebase
        let tempdata = []
        const db = firebase.firestore();
        const snapshot = await db.collection('violations').get();

        snapshot.forEach((doc) => {
            let tempobj = { 'uid': doc.id, 'first_name': doc.data().first_name, 'fine': doc.data().fine };
            tempdata.push(tempobj)
        });
        this.setState({ violations: tempdata })

    }

    render() {
        // console.log("Values = ", this.state.violations);

        return (
            <div className={'fineMainDiv'}  /*container div*/ >

                <div className={'fineInnerDiv'} /*inner container div*/>

                    <div className={'fineHeader'} /*container div of place & radius*/>

                        <div className={'fineLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Pandemic%20Control.png?alt=media&token=36e2120b-4201-429b-abda-6847fa47dd59" className={'fineLogoPic'} />
                        </div>

                        <h1 style={{color : 'white'}}>Violation List</h1>

                        <div className={'fineLogout'}>
                        <Link to="/signin" style={{textDecoration: 'none', width:'100%'}}>
                            <Ripples color="#DCDCDC" during={1200} className={'fineLogoutButton'}>
                                <button
                                    className={'fineLogoutButton1'}
                                >
                                    Logout
                                </button>
                            </Ripples>
                        </Link>  
                        </div>

                    </div>

                    <div className={'fineFooter'} /*container div for zones list & view map*/>

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
                                                {value.first_name}
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