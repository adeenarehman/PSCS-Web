import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Signin from './Signin';
import Dashboard from "./Dashboard";
import ViewMap from "./ViewMap";
import ViewFine from "./ViewFine";
import EmergencyQueries from "./EmergencyQuery";
import SignUp from "./SignUp";


export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    

                    <Route path="/emergencyqueries">
                        <EmergencyQueries />
                    </Route>

                    <Route path="/viewfine">
                        <ViewFine />
                    </Route>

                    <Route path="/viewmap">
                        <ViewMap />
                    </Route>

                    <Route path="/signup">
                        <SignUp />
                    </Route>

                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>

                    <Route path="/">
                        <Signin />
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}
