import React, { Component } from 'react';
import './ViewFine.css'
import Ripples from 'react-ripples'
import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';
import {BrowserRouter as Router,
    Link,
    } from "react-router-dom";
import Modal from 'react-awesome-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
    


export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            violations: [],
            place: {},
            uid: null,
            first_name: null,
            fine: null,
            last_name:null,
            violation_status:null,
            // violation_payment:null,
            zone_id:null,
            show:false,
            exit_time:null,
            exit_zone:null,
            model_f_name:null,
            model_l_name:null,
            model_e_time:null,
            // model_e_zone:null,
            zoneName: [],
        }
    };

    componentDidMount() {
        this.getViolationData();

        setInterval(()=>{
            this.getViolationData();
            console.warn("kdbcjkbckajs")
        },30000
        
        )   

    }

    getViolationData = async () => { //get violations data from firebase
        let tempdata = []
        const db = firebase.firestore();
        const snapshot = await db.collection('violations').get();

        snapshot.forEach((doc) => {
            let tempobj = { 'uid': doc.id, 'first_name': doc.data().first_name, 'last_name': doc.data().last_name,
            'fine': doc.data().fine, 'violation_status': doc.data().violation_status, 'zone_id': doc.data().zone_id,
            'exit_time': doc.data().exit_time,};
            tempdata.push(tempobj)
        });
        this.setState({ violations: tempdata })
    }

    // getViolationData = async () => { //get violations data from firebase
    //     let tempdata = []
    //     const db = firebase.firestore();

    //     var docRef = db.collection("zones").doc();

    // docRef.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //         snapshot.forEach((doc) => {
    //                 let tempobj = { 'place': doc.data().place};
    //                 tempdata.push(tempobj)
    //             });
    //             console.log("TempData:", tempdata);

    //             this.setState({ zoneName: tempdata })
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
    //     // let tempdata = []
    //     // const db = firebase.firestore();
    //     // const snapshot = await db.collection('violations').get();

    //     // 
    // }

    
    

    addViolationData = async (add_id, status) => {

        this.setState({ status: 'yes' })
        const db = firebase.firestore();
        const docRef = db.collection('violations').doc(add_id);
        await docRef.update(
            {
                // violation_payment: payment,
                violation_status: status
            }
        )
        toast('Violation Status Updated Successfully',
            { position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                hideProgressBar: true
            })
    }

    openModal(f_name, l_name, e_time, e_zone) {

        var theDate = new Date(e_time);
        var dateString = theDate.toGMTString();

        this.setState({
            visible: true,
            model_f_name: f_name,
            model_l_name: l_name,
            model_e_time: dateString,
            model_e_zone: e_zone

        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
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

                        <h1 style={{color : 'white', textDecoration: 'underline'}}>VIOLATION LIST</h1>

                        <div className={'fineLogout'}>
                        <Link to="/signin" style={{textDecoration: 'none', width:'100%'}}>
                            <Ripples color="#DCDCDC" during={1200} className={'fineLogoutButtonRipples'}>
                                <button
                                    className={'fineLogoutButton'}
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
                                            NAME
                                        </h1>

                                    </div>

                                    <div className={'textBox'}>

                                        <h1 className={'textHeading'}>
                                            FINE
                                        </h1>

                                    </div>

                                    <div className={'textBox'}>

                                        <h1 className={'textHeading'}>
                                            VIOLATION STATUS
                                        </h1>

                                    </div>

                                    <div className={'textBox'}>

                                        <h1 className={'textHeading'}>
                                            DETAILS
                                        </h1>

                                    </div>

                                    <div className={'textHeadingBox'}>

                                        <h1 className={'textHeading'}>
                                            SELECT
                                        </h1>

                                    </div>

                                </div>

                                {this.state.violations.map(value => (

                                    <div className={'rows'}>

                                        <div className={'textBox'}>

                                            <p className={'text'}>
                                                {value.first_name}
                                                {' '}
                                                {value.last_name}                                            
                                            </p>

                                        </div>

                                        <div className={'textBox'}>

                                            <p className={'text'}>
                                                {value.fine}
                                            </p>

                                        </div>

                                        <div className={'textBox'}>

                                        <p className={'text'}>
                                                {value.violation_status}
                                            </p>

                                        </div>

                                        <div className={'textBox'}>

                                            <p className={'text'}>
                                                <text style={{textDecoration:'underline', cursor:'pointer', fontStyle:'italic'}}
                                                    // onClick={() => { alert(value.zone_id) }}
                                                    onClick={() => this.openModal(value.first_name, value.last_name,
                                                                                    value.exit_time, value.zone_id)}
                                                    variant="primary"
                                                >
                                                    Read Description
                                                </text>

                                            </p>

                                        </div>

                                        <Modal
                                                visible={this.state.visible}
                                                width="600"
                                                height="300"
                                                effect="fadeInUp"
                                                onClickAway={() => this.closeModal()}
                                            >

                                                <div style={{display:'flex', justifyContent:'space-between',
                                                            flexDirection:'column', height:'300px', width:'600px'}}>
                                                    
                                            <div style={{margin:'2vh'}}>
                                                <p style={{fontSize:'2.3vh'}}>
                                                   First Name: {this.state.model_f_name} <br/>
                                                   Last Name: {this.state.model_l_name} <br/>
                                                   Time Exited: {this.state.model_e_time} <br/>
                                                   Zone Exited: {this.state.model_e_zone} <br/>
                                                </p> 
                                            </div>    

                                            <div style={{height: '10vh', width: '100%', display: 'flex', alignItems: 'center',
                                                         justifyContent: 'center' }}>

                                                <a href="javascript:void(0);" style={{ height: '5vh', width: '20%' }} >
                                                    <button className={'closePopupButton'}
                                                        onClick={() => this.closeModal()}
                                                    >
                                                        Close
                                                    </button>
                                                </a>

                                            </div>
                                                </div>

                                        </Modal>

                                        <div className={'textHeadingBox'}>

                                            <div className={'violationPaidButtonDiv'}>
                                                    <Ripples color="#DCDCDC" during={1200} className={'paidButtonRipples'}>
                                                        <button className={'paidButton'}
                                                            // onClick={() => { this.handleClick}}
                                                            // onClick={this.handleClick}
                                                            onClick={() => { this.addViolationData(value.uid, 'Paid') }}
                                                        >
                                                            Paid
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