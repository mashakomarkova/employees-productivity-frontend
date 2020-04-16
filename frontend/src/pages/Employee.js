import React, {Component} from 'react';
import Position from "./Position";

class Employee extends Component {

    position = new Position();
    addEmployeeApi = 'http://localhost:8080/createEmployee';
    allEmployeesApi = 'http://localhost:8080/viewAllEmployees';

    constructor(props) {
        super(props);

        this.state = {
            positions: [],
            employees: []
        };
        this.position.viewAllPosition().then(positions => {
            this.setState({positions})
        });
    }

    componentDidMount() {
        this.viewAllEmployees().then(employees => {
            this.setState({employees})
        });
    }

    viewAllEmployees() {
        return fetch(`${this.allEmployeesApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
    }

    addEmployee(data, onSuccess) {
        return fetch(`${this.addEmployeeApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    Add employee
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="uk-margin">
                            <input className="uk-input" name="firstName" type="text" placeholder="Enter first name"/>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" name="lastName" type="text" placeholder="Enter last name"/>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" name="gender" type="text" placeholder="Enter gender"/>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" name="dateOfBirth" type="date"
                                   placeholder="Enter date of birth"/>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" name="userId" type="text" placeholder="Enter user id"/>
                        </div>
                        <div className="uk-margin">
                            <select name="position" className="uk-select">
                                {
                                    this.state.positions.map((position) => {
                                        return (
                                            <option value={{
                                                id: position.id,
                                                name: position.name}}
                                            >{position.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <button type="submit" className="uk-button uk-button-primary">Add Employee</button>
                    </form>

                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Employee first name</th>
                            <th>Employee last name</th>
                            <th>Details</th>
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
                                        <th><a href={`/employees/info/${employee.id}`}>Details</a></th>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Employee;