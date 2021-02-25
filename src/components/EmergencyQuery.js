import React, { Component } from 'react';
import './EmergencyQuery.css'
import Ripples from 'react-ripples'
import * as firebase from 'firebase/app';
// import Ripples from 'react-ripples';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";



export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            button: true,
            queries: [],
            cnic: null,
            first_name: null,
            last_name: null,
            query: null,
            query_status: null,
        }
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(){
        this.setState({
          button:!this.state.button
        })
      }
    
    componentDidMount() {
        this.getQueryData();

        setInterval(() => {
            this.getQueryData();
            console.warn("kdbcjkbckajs")
        }, 5000

        )

    }

    getQueryData = async () => { //get violations data from firebase
        let tempdata = []
        const db = firebase.firestore();
        const snapshot = await db.collection('queries').get();

        snapshot.forEach((doc) => {
            let tempobj = { 'uid': doc.id, 'cnic': doc.data().cnic, 'first_name': doc.data().first_name, 'last_name': doc.data().last_name, 'query': doc.data().query };
            tempdata.push(tempobj)
        });
        this.setState({ queries: tempdata })

    }

    addQueryData = async (add_id,add_status) => {
        const db = firebase.firestore();
        const docRef = db.collection('queries').doc(add_id);
        await docRef.update(
            {
                query_status: add_status
            }
          )  
    }

    

    render() {
        // console.log("Values = ", this.state.violations);


        return (
            <div className={'queryMainDiv'}  /*container div*/ >

                <div className={'queryInnerDiv'} /*inner container div*/>

                    <div className={'queryHeader'} /*container div of place & radius*/>

                        <div className={'queryLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Pandemic%20Control.png?alt=media&token=36e2120b-4201-429b-abda-6847fa47dd59" className={'queryLogoPic'} />
                        </div>

                        <h1 style={{ color: 'white' }}>Query List</h1>

                        <div className={'queryLogout'}>
                            <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
                                <Ripples color="#DCDCDC" during={1200} className={'queryLogoutButton'}>
                                    <button
                                        className={'queryLogoutButton1'}
                                    >
                                        Logout
                                </button>
                                </Ripples>
                            </Link>
                        </div>

                    </div>

                    <div className={'queryFooter'} /*container div for zones list & view map*/>

                        <div className={'query'} /*list container div*/>

                            <div className={'queryListInnerContainer'}>

                                <div className={'queryListRows'}>

                                    <div className={'queryListTextBox'}>

                                        <h1 className={'queryListTextHeading'}>
                                           FIRST NAME
                                        </h1>

                                    </div>

                                    <div className={'queryListTextBox'}>

                                        <h1 className={'queryListTextHeading'}>
                                            LAST NAME
                                        </h1>

                                    </div>

                                    <div className={'queryListTextBox'}>

                                        <h1 className={'queryListTextHeading'}>
                                            CNIC
                                        </h1>

                                    </div>

                                    <div className={'queryListTextBox'}>

                                        <h1 className={'queryListTextHeading'}>
                                            QUERY
                                        </h1>

                                    </div>

                                    <div className={'queryListLastTextBox'}>

                                        <h1 className={'queryListTextHeading'}>
                                            QUERY STATUS
                                        </h1>

                                    </div>

                                </div>

                                {this.state.queries.map(value => (

                                    <div className={'queryListRows'}>

                                        <div className={'queryListTextBox'}>

                                            <h1 className={'text'}>
                                            {value.first_name}
                                            </h1>
                                        </div>

                                        <div className={'queryListTextBox'}>

                                            <h1 className={'text'}>
                                            {value.last_name}
                                            </h1>
                                        </div>

                                        <div className={'queryListTextBox'}>

                                            <h1 className={'text'}>
                                               
                                                {value.cnic}

                                            </h1>
                                          
                                        </div>

                                        <div className={'queryListTextBox'}>

                                            <h1 className={'text'}>
                                                {value.query}
                                            </h1>

                                        </div>

                                        <div className={'queryListLastTextBox'}>
                                        {/* {value.uid} */}
                                            <div className={'queryAcceptButtonDiv'}>
                                                <Ripples color="#DCDCDC" during={1200} className={'acceptButtonTrue1'}>
                                                {/* {value.uid} */}
                                                <button className={'acceptButtonTrue'}
                                                // onClick={() => { this.handleClick}}
                                                // onClick={this.handleClick}
                                                onClick={() => { this.addQueryData(value.uid,'Your Request Has Been Accepted')}}
                                                >
                                                    Accept                                           
                                                </button>
                                                </Ripples>
                                            </div> 
                                           
                                            <div className={'queryDenyButtonDiv'}>
                                                <Ripples color="#DCDCDC" during={1200} className={'denyButtonTrue1'}>

                                                <button className={'denyButtonTrue'}
                                                // onClick={() => { this.deleteCordinates(value.uid) }}
                                                // onClick={this.handleClick}
                                                onClick={() => { this.addQueryData(value.uid,'Your Request Has Been Denied')}}
                                                >
                                                    Deny
                                            </button>
                                            </Ripples>
                                            </div>
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