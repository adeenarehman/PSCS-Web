import React, { Component } from 'react';
import './Dashboard.css'
import Ripples from 'react-ripples'
import history from "../history";
import {BrowserRouter as Router,
Link,
} from "react-router-dom";

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        };
    
    render() {
        console.log("Values = ", this.state.zones);

        return (
            <div className={'mainDiv'}  /*container div*/ >

                <div className={'innerDiv'} /*inner container div*/>

                    <div className={'header'} /*container div of place & radius*/>

                        <div className={'logoImg'}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/Logo%2Btext.png?alt=media&token=56500bea-00cd-43f5-b5cd-7b82c98d2261" className={'logoPic'}/>
                        </div>
                        <div className={'logout'}>
                            <Ripples color="#DCDCDC" during={1200} className={'logoutButton'}>
                            <Link to="/signin">
                                <button 
                                    className={'logoutButton1'}
                                >
                                    Logout
                                </button>
                                </Link>
                            </Ripples>
                        </div>

                    </div>

                    <div className={'footer'} /*container div for zones list & view map*/>

                        
                        <div className={'leftBox'} /*list container div*/
                        
                        >
                            <div className={'leftpic'} >
                                <Link to="/viewfine">
                                <img src="https://firebasestorage.googleapis.com/v0/b/fyp-pscs-7e191.appspot.com/o/FineImg.png?alt=media&token=64bd2cf8-14a8-4413-bec8-cb50825a757a" className={'leftBoxImg'} />
                                </Link>
                            </div>

                            <Link to="/viewfine">
                            <text className={'leftText'}>View Violation</text>
                            </Link>

                        </div>
                            
                        
                        <div className={'rightBox'} /*Map container div*/
                         onClick={history.push('/viewmap')}
                        >

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