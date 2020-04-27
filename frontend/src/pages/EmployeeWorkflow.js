import React, {Component} from 'react';
import Cookies from "js-cookie";
import {withTranslation} from "react-i18next";

class EmployeeWorkflow extends Component {

    employeeApi = 'http://localhost:8080/findAllWorkflows';
    employeeWorkflowByDateApi = 'http://localhost:8080/findWorkflows';

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
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
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let workFlowDate = data.get('workFlowDate');
        return fetch(`${this.employeeWorkflowByDateApi}/${workFlowDate}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json()).then(workflows => {
            this.setState({workflows})
        });
    };

    render() {
        const {t} = this.props;
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    <h1>Enter workflow date</h1>
                    <form method="get" onSubmit={this.handleSubmit}>
                        <div className="uk-margin">
                            <input type="date" className="uk-input" name="workFlowDate"/>
                        </div>
                        <button className="uk-button uk-button-primary" type="submit">Find</button>
                    </form>
                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>{t('id')}</th>
                            <th>{t('user email')}</th>
                            <th>{t('work date')}</th>
                            <th>{t('start time')}</th>
                            <th>{t('end time')}</th>
                            <th>{t('details')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.workflows.map((workflow) => {
                                return (
                                    <tr>
                                        <th>{workflow.id}</th>
                                        <th>{workflow.employee.user.email}</th>
                                        <th>{workflow.workDate}</th>
                                        <th>{workflow.startTime}</th>
                                        <th>{workflow.endTime}</th>
                                        <th><a href={`/employeesWorkflow/info/${workflow.id}`}>{t('details')}</a></th>
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
export default withTranslation()(EmployeeWorkflow);