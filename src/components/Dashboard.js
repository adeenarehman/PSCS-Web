import React, { Component } from 'react';
import './Dashboard.css'
import Ripples from 'react-ripples'
import history from "../historyone";
import {BrowserRouter as Router,
Link,  useHistory 
} from "react-router-dom";


export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        };
    
        // goToViewFine = () =>{
        //     let history = useHistory();
        //     history.push("/viewfine");

        // }

        goToViewFine = () =>{
            history.push('/viewfine');
            // window.location.reload(true);
        }

        // goToViewFine = () =>{
        //     history.push('/viewfine');
        // }

    render() {
        console.log("Values = ", this.state.zones);

        return (
            <div className={'mainDiv'}  /*container div*/ >

                <div className={'innerDiv'} /*inner container div*/>

                    <div className={'dashboardHeader'} /*container div of place & radius*/>

                        <div className={'dashboardLogoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_lock.png?alt=media&token=6a8c8a6c-7150-4d39-8b36-35078bff679a" className={'dashboardLogoPic'}/>
                        </div>

                        <div className={'dashboardHeaderHeading'}>

                        <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/white_text.png?alt=media&token=a540a39a-e153-4a04-89c3-3fe86660ba60" className={'dashboardHeading'}/>
                        </div>

                        <div className={'dashboardLogout'}>
                            <Ripples color="#DCDCDC" during={1200} className={'dashboardLogoutButton'}>
                            {/* <Link to="/signin"> */}
                                <button 
                                    className={'dashboardLogoutButton1'}
                                >
                                    Logout
                                </button>
                                {/* </Link> */}
                            </Ripples>
                        </div>

                    </div>

                    <div className={'footer'} /*container div for zones list & view map*/>

                        
                        <div className={'leftBox'} /*list container div*/
                         onClick={this.goToViewFine()}
                        >
                            <div className={'leftpic'}
                            
                            >
                                
                                {/* <Link to="/viewfine"> */}
                                <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/FineImg.png?alt=media&token=64bd2cf8-14a8-4413-bec8-cb50825a757a" className={'leftBoxImg'} />
                                {/* </Link> */}
                            </div>

                            {/* <Link to="/viewfine"> */}
                            <text className={'leftText'}>View Violation</text>
                            {/* </Link> */}

                        </div>
                            
                        
                        <div className={'rightBox'} /*Map container div*/>

                            <Link to="/viewmap">    
                            <div className={'rightpic'}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/map.PNG?alt=media&token=347b0ed1-3224-422c-9ed0-2a0ee4440280" className={'rightBoxImg'}/>
                            </div>
                            </Link>

                            <Link to="/viewmap">
                            <text className={'rightText'}>View Map</text>
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default Dashboard