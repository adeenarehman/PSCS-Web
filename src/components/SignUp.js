import React, { Component } from 'react';
import './SignUp.css'
import Ripples from 'react-ripples'
import * as firebase from 'firebase/app';
// import Ripples from 'react-ripples';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './FirebaseConfig';
import 'firebase/auth';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import { AiFillIdcard } from "react-icons/ai";
import { BsPerson, BsPersonFill, BsFillEnvelopeFill, BsLockFill} from "react-icons/bs";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            // password: null,
            cnic: '',
            designation: ''
        }
        this.onInputChange = this.onInputChange.bind(this);  
        this._onSelect = this._onSelect.bind(this)
 
     };

     onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    _onSelect (option) {
        // console.log('You selected ', option.label)
        this.setState({designation: option.label})
      }


    createUserWithEmailPassword = () => {
        // console.log(this.state.email, this.state.password);
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    
    .then((userCredential) => {
        // console.log(auth().currentUser+ 'shh');        

        // Signed in 
        var user = userCredential.user;
        toast('User Registered Successfully', 
            {position: toast.POSITION.BOTTOM_CENTER})

        this.addUser(user.uid);

        // ...
      })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error)
  });
}

addUser = async (userid) => {
    const db = firebase.firestore();
    const docRef = db.collection('users').doc(userid);
    await docRef.set({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        // password: this.state.password,
        cnic: this.state.cnic,
        designation: this.state.designation,
    });
    // await this.reloadPage();
    // this.getCordinates();
}
    

    render() {
        // console.log("Values = ", this.state.violations);
        const options = 
        [
            'bureaucrat', 
            'medical officer'
        ];

        //   const defaultOption = options[0];

        return (
            <div className={'signupMainDiv'}  /*container div*/ >

                <div className={'signupInnerDiv'} /*inner container div*/>

                    <div className={'signupHeader'} /*container div of place & radius*/>

                        <div className={'signupLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Pandemic%20Control.png?alt=media&token=36e2120b-4201-429b-abda-6847fa47dd59" className={'signupLogoPic'} />
                        </div>

                        <h1 style={{ color: 'white' }}>Register</h1>

                        <div className={'signupLogout'}>
                            <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
                                <Ripples color="#DCDCDC" during={1200} className={'signupLogoutButton'}>
                                    <button
                                        className={'signupLogoutButton1'}
                                    >
                                        Logout
                                </button>
                                </Ripples>
                            </Link>
                        </div>

                    </div>

                    <div className={'signupFooter'} /*container div for zones list & view map*/>

                        <div className={'signupFormBox'}>

                        <div className={'signup'}>
                            Register
                        </div>

                        <div className={'signupContainer'}>
                                <BsPersonFill style={{ height: 27, width: 27, color: '#21618C' }} />
                                <input className={'signupInput'}
                                    type={'text'}
                                    placeholder={'First Name'}
                                    name={'first_name'}
                                    value={this.state.first_name}
                                    onChange={this.onInputChange}

                                />
                            </div>

                            <div className={'signupContainer'}>
                            <BsPersonFill style={{ height: 27, width: 27, color: '#21618C' }} />
                                <input className={'signupInput'}
                                    type={'text'}
                                    placeholder={'Last Name'}
                                    name={'last_name'}
                                value={this.state.last_name}
                                onChange={this.onInputChange}

                                />
                            </div>

                            <div className={'signupContainer'}>
                            <BsFillEnvelopeFill style={{ height: 27, width: 27, color: '#21618C' }} />
                                <input className={'signupInput'}
                                    type={'text'}
                                    placeholder={'Email'}
                                    name={'email'}
                                value={this.state.email}
                                onChange={this.onInputChange}
                                />
                            </div>

                            <div className={'signupContainer'}>
                            <BsLockFill style={{ height: 27, width: 29, color: '#21618C' }} />
                                <input className={'signupInput'}
                                    type={'password'}
                                    placeholder={'Password'}
                                    name={'password'}
                                value={this.state.password}
                                onChange={this.onInputChange}

                                />
                            </div>

                            <div className={'signupContainer'}>
                                <AiFillIdcard style={{ height: 27, width: 27, color: '#21618C' }} />
                                <input className={'signupInput'}
                                    type={'number-pad'}
                                    placeholder={'ID Card Number'}
                                    name={'cnic'}
                                value={this.state.cnic}
                                onChange={this.onInputChange}
                                />
                            </div>

                            <div className={'signupDropdownBox'}>
                                <Dropdown options={options} controlClassName='myControlClassName' className={'myClassName'}
                                onChange={this._onSelect} 
                                //  value={defaultOption}
                                menuClassName='myMenuClassName'
                                placeholder="Select Designation..." />
                            </div>

                            

                            <Ripples color="#DCDCDC" during={1200} className={'signupButton'}>
                                <button className={'signupButton'}
                                onClick={this.createUserWithEmailPassword} 
                                >
                                    SIGN UP
                                </button>
                            </Ripples>
                        </div>

                    </div >
                </div >
            </div>
        );
    }
}


export default Dashboard