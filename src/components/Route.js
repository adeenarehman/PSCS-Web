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

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>

                    <Route path="/">
                        <Signin />
                    </Route>

                    {/* <Route path="/dashboard">
                        <Dashboard />
                    </Route> */}

                </Switch>
            </div>
        </Router>
    );
}
