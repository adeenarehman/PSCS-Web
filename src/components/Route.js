import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Signin from './Signin'
import Dashboard from "./Dashboard"

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
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
