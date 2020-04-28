import React, {Component} from 'react';
import './App.css';
import Header from "./header/Header";
import {Route, Switch} from "react-router";
import Register from "./register/Register";
import {BrowserRouter} from "react-router-dom";
import SignIn from "./signIn/SignIn";
import Main from "./pages/Main";
import Footer from "./footer/Footer";
import Position from "./pages/Position";
import Employee from "./pages/Employee";
import EmployeeWorkflow from "./pages/EmployeeWorkflow";
import WorkflowDetails from "./pages/WorkflowDetails";
import TotalProductivity from "./pages/TotalProductivity";
import EmployeeDetails from "./pages/EmployeeDetails";
import ProductivityByGender from "./pages/ProductivityByGender";
import NotFound from "./NotFound";
import {withTranslation} from "react-i18next";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {height: props.height};
    }

    componentDidMount() {
        this.setState({height: window.innerHeight + 'px'});
    }

    render() {
        return (
            <div>
                <div className="app">
                    <BrowserRouter>
                    <Route path="/" component={Header}/>
                    <Switch>
                        <Route exact path="/home" component={Main}/>
                        <Route exact path="/reg" component={Register}/>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/signIn" component={SignIn}/>
                        <Route exact path="/position" component={Position}/>
                        <Route exact path="/employees" component={Employee}/>
                        <Route exact path="/employeesWorkflow" component={EmployeeWorkflow}/>
                        <Route exact path="/employeesWorkflowInfo/*" component={WorkflowDetails}/>
                        <Route exact path="/employeesProductivity" component={TotalProductivity}/>
                        <Route exact path="/employeesInfo/*" component={EmployeeDetails}/>
                        <Route exact path="/employees/byGender/" component={ProductivityByGender}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                    <Route path="/" component={Footer}/>
                </BrowserRouter>
                </div>
            </div>
        );
    }

}

export default withTranslation()(App);
