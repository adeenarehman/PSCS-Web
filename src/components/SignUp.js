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
import Form from 'react-validation/build/form';
// import validator from 'validator';
import { AiFillIdcard } from "react-icons/ai";
import { BsPerson, BsPersonFill, BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()



export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            cnic: '',
            designation: null,
        }
        this.onInputChange = this.onInputChange.bind(this);
        this._onSelect = this._onSelect.bind(this)

    };

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    _onSelect(option) {
        // console.log('You selected ', option.label)
        this.setState({ designation: option.label })
    }


    createUserWithEmailPassword = () => {
        console.log("Working");

        // console.log(this.state.email, this.state.password);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)

            .then((userCredential) => {
                toast('User Registered Successfully',
                    {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        hideProgressBar: true
                    })
                // console.log(auth().currentUser+ 'shh');        

                // Signed in 
                var user = userCredential.user;


                this.addUser(user.uid);

                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // alert(error)
                toast("" + error,
                    {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        hideProgressBar: true
                    })
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
        this.setState({
            first_name: '',
            last_name: '',
            cnic: '',
            password: '',
            email: '',
        })

    }

    signupValidation = () => {
        if (!this.state.first_name.trim()) 
        {
            toast("Error: Please Enter First Name",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true
                })
            return;
        }
        if (!this.state.last_name.trim()) 
        {
            toast("Error: Please Enter Last Name", 
                { position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true
                })
            return;
        }
        if (!this.state.email.trim()) 
        {
            toast("Error: Please Enter Email", 
                { position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true
                })
            return;
        }
        if (!this.state.password.trim()) 
        {
            toast("Error: Please Enter Password", 
                { position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true
                })
            return;
        }
        if (!this.state.cnic.trim()) 
        {
            toast("Error: Please Enter Id Card Number",
                { position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true
                })
            return;
        }
        if (this.state.cnic.length < 14) 
        {
            toast("Error: Invalid Id Card Number", 
                { position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true
                })
            return;
        }
        if (this.state.designation == null) 
        {
            toast("Error: Please Choose Designation", 
                { position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true
                })
            return;
        }
        else {
            this.createUserWithEmailPassword();
        }
    }


    render() {
        // console.log("Values = ", this.state.violations);
        const options =
            [
                'bureaucrat',
                'medical officer'
            ];

        // const required = (value) => {
        //     if (!value.toString().trim().length) {
        //       // We can return string or jsx as the 'error' prop for the validated Component
        //       return 'require';
        //     }
        //   };

        //   const defaultOption = options[0];

        return (
            <div className={'signupMainDiv'}  /*container div*/ >

                <div className={'signupInnerDiv'} /*inner container div*/>

                    <div className={'signupHeader'} /*container div of place & radius*/>

                        <div className={'signupLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Pandemic%20Control.png?alt=media&token=36e2120b-4201-429b-abda-6847fa47dd59" className={'signupLogoPic'} />
                        </div>

                        <h1 style={{ color: 'white', textDecoration: 'underline' }}>REGISTER</h1>

                        <div className={'signupLogout'}>
                            <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
                                <Ripples color="#DCDCDC" during={1200} className={'signupLogoutButtonRipples'}>
                                    <button
                                        className={'signupLogoutButton'}
                                    >
                                        Logout
                                </button>
                                </Ripples>
                            </Link>
                        </div>

                    </div>

                    <div className={'signupFooter'} /*container div for zones list & view map*/>

                        <div className={"signupAbout"}>
                            <h1 style={{ color: 'white', textDecoration: 'underline' }}>About</h1>

                            <p style={{ color: 'white', textAlign: 'justify', fontSize: '3vh' }}>
                                A system designed to control the spread of the virus. Keeping in mind the recent
                                pandemic situation (Covid-19) of the whole world. Red zones will be shown on the
                                map to the admin and all the civilians residing in the locked areas are registered
                                so that they can be easily tracked. If by any chance a person managed to get out of
                                the locked area, an alert/push notification will be sent to the admin and he/she can
                                take further actions. The civilians will be given any and all kinds of emergency services,
                                the admin will be directly notified if someone requests for a service, the admin will
                                forward this request to the relevant department e.g., Fire department,
                                Police department etc. with the details about the location and the necessary precautions
                                to be taken.
                            </p>
                        </div>

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
                                    maxLength={14}
                                />
                            </div>

                            <div className={'signupDropdownBox'}>
                                <Dropdown options={options} controlClassName='myControlClassName' className={'myClassName'}
                                    onChange={this._onSelect}
                                    //  value={defaultOption}
                                    menuClassName='myMenuClassName'
                                    placeholder="Select Designation..."
                                />
                            </div>



                            <Ripples color="#DCDCDC" during={1200} className={'signupButtonRipples'}>
                                <button className={'signupButton'}
                                    onClick={this.signupValidation}
                                // onClick={() => { this.signupValidation, this.reset() }}
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