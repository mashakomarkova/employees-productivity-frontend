import React, {Component} from 'react';

class WorkflowDetails extends Component {

    workflowApi = 'http://localhost:8080/findWorkFlow';

    constructor(props) {
        super(props);
        this.state = {
            workflow: {}
        };
    }

    componentDidMount() {
        this.viewWorkflow(window.location.href.substring(window.location.href.lastIndexOf('/')))
            .then(workflow => {
                this.setState({workflow});
            });
    }

    viewWorkflow(id) {
        return fetch(`${this.workflowApi}/${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
    }

    render() {
        if (!this.state.workflow.employee) {
            return null;
        }
        let startTime = new Date(this.state.workflow.workDate + 'T' + this.state.workflow.startTime + 'Z');
        let endTime = new Date(this.state.workflow.workDate + 'T' + this.state.workflow.endTime + 'Z');
        let totalHours = (endTime - startTime) / (1000 * 60 * 60);
        let numberOfSales = 0;
        this.state.workflow.commodityRealizations.map((realization) => {
            numberOfSales += realization.quantity;
        });
        let productivity = numberOfSales / totalHours;
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    <h1>Email: {this.state.workflow.employee.user.email}</h1>
                    <h1>First name: {this.state.workflow.employee.firstName}</h1>
                    <h1>Last name: {this.state.workflow.employee.lastName}</h1>
                    <h1>Gender: {this.state.workflow.employee.gender}</h1>
                    <h1>Date of birth: {this.state.workflow.employee.dateOfBirth}</h1>
                    <h1>Work day: {this.state.workflow.workDate}</h1>
                    <h1>Start time: {this.state.workflow.startTime}</h1>
                    <h1>End time: {this.state.workflow.endTime}</h1>
                    <h1>Total hours worked: {totalHours}</h1>
                    <h1>Productivity per hour: {productivity.toFixed(3)}</h1>
                    <h1>Commodity realization</h1>
                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>Commodity Id</th>
                            <th>quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.workflow.commodityRealizations.map((realization) => {
                                return (
                                    <tr>
                                        <th>{realization.commodityId}</th>
                                        <th>{realization.quantity}</th>
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

export default WorkflowDetails;