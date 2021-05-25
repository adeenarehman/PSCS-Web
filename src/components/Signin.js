import React, { Component } from 'react';
// import { HiOutlineMail } from "react-icons/hi";
// import { FiLock } from "react-icons/fi";
import { BsPerson, BsPersonFill, BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";

import Ripples from 'react-ripples'
import './Signin.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './FirebaseConfig';
import history from "../history";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Signin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

        signInWithEmailPassword = () => {
        // console.log(this.state.email, this.state.password);
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function (result) {
                toast('Signin Successfull', 
                     {position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        hideProgressBar: true
                    })

                history.push('/dashboard');
                window.location.reload(false); 
            })

            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                // alert(errorMessage)
                toast("" + errorMessage, 
                    {position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 5000,
                        hideProgressBar: true
                    })
            });
    }


    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

   

    render() {
        return (
            <div className={'mainContainer'}>

                <div className={'innerContainer'}>

                    <div className={'innerLeftContainer'}>
                        {/*<img src={Background} className={'logo'}/>*/}
                        {/* <center><h1 style={{ marginBottom: '35%', color: 'blue' }}>PANDEMIC SITUATION CONTROLLING SYSTEM</h1></center> */}
                        <div className={'logoContainer'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Logo%2Btext.png?alt=media&token=93540c12-a601-4ab2-ac0d-31c48ebc8cac" className={'logo'}/>
                        </div>

                    </div>

                    <div className={'innerRightContainer'}>

                        <div className={'heading'}>Login</div>

                        <div className={'inputContainer'}>
                            <BsFillEnvelopeFill style={{ height: 27, width: 25, color: '#21618C' }} />                            
                            <input className={'input'}
                                type={'text'}
                                placeholder={'Email'}
                                name={'email'}
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className={'inputContainer'}>
                            <BsLockFill style={{ height: 27, width: 29, color: '#21618C' }} />                            
                            <input className={'input'}
                                type={'password'}
                                placeholder={'Password'}
                                name={'password'}
                                value={this.state.password}
                                onChange={this.onInputChange}
                            />
                        </div>

                        <Ripples color="#DCDCDC" during={1200} className={'loginButtonRipples'}>
                            <button onClick={this.signInWithEmailPassword} className={'loginButton'}>
                                LOGIN
                            </button>
                        </Ripples>
                    </div>

                </div>

            </div>
        );
    }
}


const firebaseAppAuth = firebaseApp.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Signin);



// export default Signin