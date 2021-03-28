import React, { Component } from 'react';
import './Dashboard.css'
import Ripples from 'react-ripples'
import history from "../historyone";
import {
    BrowserRouter as Router,
    Link, Redirect, useHistory
} from "react-router-dom";


export class Dashboard extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {}
    //     };

    // goToViewFine = () =>{
    //     let history = useHistory();
    //     history.push("/viewfine");

    // }

    // goToViewFine = () =>{
    //     history.push('/viewfine');
    //     console.log("jdhhvchava")
    //     // window.location.reload(true);
    // }

    // goToViewFine = () =>{
    //     history.push('/viewfine');
    // }

    render() {
        // console.log("Values = ", this.state.zones);

        return (
            <div className={'dashboardMainDiv'}  /*container div*/ >

                <div className={'dashboardInnerDiv'} /*inner container div*/>

                    <div className={'dashboardHeader'} /*container div of logo & Logout button*/>

                        <div className={'dashboardLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_lock.png?alt=media&token=6a8c8a6c-7150-4d39-8b36-35078bff679a" className={'dashboardLogoPic'} />
                        </div>

                        <div className={'dashboardHeaderHeading'}>

                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_text.png?alt=media&token=a540a39a-e153-4a04-89c3-3fe86660ba60" className={'dashboardHeading'} />
                        </div>

                        <div className={'dashboardLogout'}>
                            <Ripples color="#DCDCDC" during={1200} className={'dashboardLogoutButton'}>
                                <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
                                    <button
                                        className={'dashboardLogoutButton1'}>
                                        Logout
                                    </button>
                                </Link>
                            </Ripples>
                        </div>

                    </div>

                    <div className={'dashboardFooter'} /*FOOTER DIV*/>

                        <div className={'dashboardBoxLeft'}>

                            <div className={'fineBox'} /*FINE BOX DIV*/>

                                <Link to="/viewfine">
                                    <div className={'finepic'}>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/FineImg.png?alt=media&token=64bd2cf8-14a8-4413-bec8-cb50825a757a" className={'fineBoxImg'} />
                                    </div>
                                </Link>

                                <Link to="/viewfine" style={{ textDecoration: 'none' }}>
                                    <text className={'fineText'}>Violations</text>
                                </Link>

                            </div>

                            <div className={'queryBox'} /*QUERY BOX DIV*/>

                                <Link to="/emergencyqueries">
                                    <div className={'querypic'}>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/queries.png?alt=media&token=78bafdbc-343e-4dd8-b3dd-14056ff893d4" className={'queryBoxImg'} />
                                    </div>
                                </Link>

                                <Link to="/emergencyqueries" style={{ textDecoration: 'none' }}>
                                    <text className={'queryText'}>Queries</text>
                                </Link>

                            </div>

                        </div>

                        <div className={'dashboardBoxCenter'}>

                            <div className={'relaxingBox'} /*RELAXING BOX DIV*/>

                                <Link to="/relaxingzones">
                                    <div className={'relaxingpic'}>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Relaxing.png?alt=media&token=fde08efe-e0e0-4979-96bc-7066826fc555" className={'relaxingBoxImg'} />
                                    </div>
                                </Link>

                                <Link to="/relaxingzones" style={{ textDecoration: 'none' }}>
                                    <text className={'relaxText'}>Relaxing Hours</text>
                                </Link>

                            </div>

                        </div>

                        <div className={'dashboardBoxRight'}>

                            <div className={'zoneBox'} /*ZONE BOX DIV*/>

                                <Link to="/viewmap">
                                    <div className={'zonePic'}>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Map1.png?alt=media&token=408c9edc-2107-4226-9955-d31b9c19f7f1" className={'zoneBoxImg'} />
                                    </div>
                                </Link>

                                <Link to="/viewmap" style={{ textDecoration: 'none' }}>
                                    <text className={'zoneText'}>Zones</text>
                                </Link>

                            </div>

                            <div className={'signupBox'} /*SIGN UP BOX DIV*/>

                                <Link to="/signup">
                                    <div className={'signupPic'}>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/signup2.png?alt=media&token=c5334c86-d3fa-4772-857e-ae1dadbaed0d" className={'signupBoxImg'} />
                                    </div>
                                </Link>

                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                    <text className={'signupText'}>SignUp</text>
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default Dashboard