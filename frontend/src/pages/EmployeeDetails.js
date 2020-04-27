import React, {Component} from 'react';
import Cookies from "js-cookie";
import {withTranslation} from "react-i18next";

class EmployeeDetails extends Component {

    employeeApi = 'http://localhost:8080/viewAllEmployees';

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
        this.state = {
            employeeWorkflowBean: {}
        };
    }

    componentDidMount() {
        this.viewEmployeeById(window.location.href.substring(window.location.href.lastIndexOf('/')+1))
            .then(employeeWorkflowBean => {
                this.setState({employeeWorkflowBean})
            });
    }

    viewEmployeeById(id) {
        return fetch(`${this.employeeApi}/${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    render() {
        if (!this.state.employeeWorkflowBean) {
            return null;
        }
        if (!this.state.employeeWorkflowBean.employee) {
            return null;
        }
        if (!this.state.employeeWorkflowBean.workflows) {
            return null;
        }
        let totalProductivity = 0;
        let totalTime = 0;
        let realizationQuantity = 0;
        this.state.employeeWorkflowBean.workflows.map((workflow) => {
            let startTime = new Date(workflow.workDate + 'T' + workflow.startTime + 'Z');
            let endTime = new Date(workflow.workDate + 'T' + workflow.endTime + 'Z');
            totalTime += (endTime - startTime) / (1000 * 60 * 60);
            workflow.commodityRealizations.map((realization => {
                realizationQuantity += realization.quantity;
                return realizationQuantity;
            }));
            totalProductivity += realizationQuantity / totalTime;
            return totalProductivity;
        });
        const {t} = this.props;
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    <h1>{t('employee first name')} {this.state.employeeWorkflowBean.employee.firstName}</h1>
                    <h1>{t('employee last name')} {this.state.employeeWorkflowBean.employee.lastName}</h1>
                    <h1>{t('total hours')} : {totalTime}</h1>
                    <h1>{t('total sales')}: {realizationQuantity}</h1>
                    <h1>{t('total productivity')}: {totalProductivity.toFixed(3)}</h1>
                    <h1>{t('commodity realization')}</h1>
                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>{t('work date')}</th>
                            <th>{t('start time')}</th>
                            <th>{t('end time')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.employeeWorkflowBean.workflows.map((workflow) => {
                                return (
                                    <tr>
                                        <th>{workflow.workDate}</th>
                                        <th>{workflow.startTime}</th>
                                        <th>{workflow.endTime}</th>
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
export default withTranslation()(EmployeeDetails);