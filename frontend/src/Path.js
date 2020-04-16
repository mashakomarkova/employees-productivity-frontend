import React, {Component} from "react";
import {Router, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Register from "./register/Register";
import NotFound from "./NotFound";
import App from "./App";

class Path extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/reg" component={Register}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Path;