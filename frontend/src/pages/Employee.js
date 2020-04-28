import React, {Component} from 'react';
import Position from "./Position";
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";
import PositionService from "../service/PositionService";

class Employee extends Component {

    addEmployeeApi = 'http://localhost:8080/createEmployee';
    allEmployeesApi = 'http://localhost:8080/viewAllEmployees';
    allPositionsApi = 'http://localhost:8080/allPositions';

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
        this.state = {
            positions: [],
            employees: []
        };
        this.position = new PositionService(this.allPositionsApi, this.token);
    }

    componentDidMount() {
        this.viewAllEmployees().then(employees => {
            this.setState({employees})
        });
        this.position.viewAllPosition().then(positions => {
            this.setState({positions})
        });
    }

    viewAllEmployees() {
        return fetch(`${this.allEmployeesApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    addEmployee(data, onSuccess) {
        return fetch(`${this.addEmployeeApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify(data)
        }).then(() => onSuccess());
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let firstName = data.get('firstName');
        let lastName = data.get('lastName');
        let gender = data.get('gender');
        let dateOfBirth = data.get('dateOfBirth');
        let userId = data.get('userId');
        let employeePosition = data.get('position');
        let position = {employeePosition};
        let employee = {firstName, lastName, gender, dateOfBirth, userId, position};
        this.addEmployee(employee, () => window.location.reload());
    };

    render() {
        const {t} = this.props;

        if (!this.state.employees) {
            return null;
        }
        if (!this.state.positions) {
            return null;
        }
        return (
            <div className="container">
                {t('add employee')}
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="col-md-12 form-group p_star">
                        <label>{t('first name')}</label>
                        <input className="form-control" name="firstName" type="text"/>
                    </div>
                    <label>{t('last name')}</label>
                    <div className="col-md-12 form-group p_star">
                        <input className="form-control" name="lastName" type="text"/>
                    </div>
                    <label>{t('gender')}</label>
                    <div className="col-md-12 form-group p_star">
                        <input className="form-control" name="gender" type="text"/>
                    </div>
                    <label>{t('dateOfBirth')}</label>
                    <div className="col-md-12 form-group p_star">
                        <input className="form-control" name="dateOfBirth" type="date"/>
                    </div>
                    <label>{t('enter id')}</label>
                    <div className="col-md-12 form-group p_star">
                        <input className="form-control" name="userId" type="text"/>
                    </div>
                    <div className="col-md-12 form-group p_star">
                        <select name="position" className="form-control form-select">
                            {
                                this.state.positions.map((position) => {
                                    return (
                                        <option value={{
                                            id: position.id,
                                            name: position.name
                                        }}
                                        >{position.name}</option>
                                    )
                                })}
                        </select>
                    </div>
                    <button type="submit" className="uk-button uk-button-primary">{t('add employee')}</button>
                </form>

                <table className="uk-table uk-table-striped">
                    <thead>
                    <tr>
                        <th>{t('id')}</th>
                        <th>{t('employee first name')}</th>
                        <th>{t('employee last name')}</th>
                        <th>{t('details')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.employees.map((employee) => {
                            return (
                                <tr>
                                    <th>{employee.id}</th>
                                    <th>{employee.firstName}</th>
                                    <th>{employee.lastName}</th>
                                    <th><a href={`/employeesInfo/${employee.id}`}>Details</a></th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withTranslation()(Employee);