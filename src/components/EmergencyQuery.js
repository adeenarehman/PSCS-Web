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
import Modal from 'react-awesome-modal';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

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
            query_description: null,
            visible : false

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
            let tempobj = { 'uid': doc.id, 'cnic': doc.data().cnic, 'first_name': doc.data().first_name, 'last_name': doc.data().last_name,
                            'query': doc.data().query, 'query_description': doc.data().description  
                          };
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
          toast('Query Updated Successfully', 
                {position: toast.POSITION.BOTTOM_CENTER})
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
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
                                           NAME
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

                                    <div className={'queryListTextBox'}>

                                        <h1 className={'queryListTextHeading'}>
                                            QUERY DESCRIPTION
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
                                            {}
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

                                        <div className={'queryListTextBox'}>

                                        {/* <h3 style={{marginLeft:'9vh'}}
                                        onClick={() => this.openModal()}
                                        >
                                            Read Description     
                                        </h3>
                                           
                                           <Modal 
                                               visible={this.state.visible}
                                               width="600"
                                               height="300"
                                               effect="fadeInUp"
                                               onClickAway={() => this.closeModal()}
                                           >
                                               <div>
                                                    <h3 style={{display:'flex', justifyContent:'flex-start'}}>
                                                        {value.first_name}
                                                        {value.last_name}
                                                    </h3>

                                                    <p style={{height:'20vh', width:'100%',display:'flex', justifyContent:'center', overflowY:'scroll'}}>
                                                        {value.query_description}
                                                    </p>

                                                    <div style={{height:'10vh', width:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                        <a href="javascript:void(0);" style={{height:'5vh', width:'20%'}} >
                                                            <button className={'closePopupButton'}
                                                                onClick={() => this.closeModal()}
                                                            >
                                                                Close
                                                            </button>
                                                        </a>
                                                    </div>
                                               </div>
                                           </Modal> */}


                                                <h1 className={'text'}>

                                                   
                                                    <text className={'acceptButtonTrue'}
                                                    onClick={() => {alert(value.query_description)}}
                                                    >
                                                      Read Description                                           
                                                    </text>
                                                    
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
                                                onClick={() => { this.addQueryData(value.uid,'Your Request Has Been Accepted For')}}
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
                                                onClick={() => { this.addQueryData(value.uid,'Your Request Has Been Denied For')}}
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