import React, {Component} from 'react';

class EmployeeWorkflow extends Component {

    employeeApi = 'http://localhost:8080/findAllWorkflows';

    constructor(props) {
        super(props);
        this.state = {
            workflows: []
        };
        this.viewWorkflows()
            .then(workflows => {
                this.setState({workflows})
            });
    }

    viewWorkflows() {
        return fetch(`${this.employeeApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
    }

    render() {
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>User email</th>
                            <th>Date</th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.workflows.map((workflow) => {
                                return (
                                    <tr>
                                        <th>{workflow.id}</th>
                                        <th>{workflow.employee.user.email}</th>
                                        <th>{workflow.date}</th>
                                        <th>{workflow.startTime}</th>
                                        <th>{workflow.endTime}</th>
                                        <th><a href={`/employeesWorkflow/info/${workflow.id}`}>Details</a></th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default EmployeeWorkflow;