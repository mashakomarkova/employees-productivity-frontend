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
        this.viewEmployeeById(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
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
            <section className="confirmation_part section_padding">
                <div className="container">
                    <div className="row">
                        <div className="single_confirmation_details">
                            <div className="col-lg-12 col-lx-12">
                                <ul>
                                    <li>
                                        <p>{t('employee first name')}</p>
                                        <span>:{this.state.employeeWorkflowBean.employee.firstName}
                                        </span>
                                    </li>
                                    <li>
                                        <p>{t('employee last name')}</p>
                                        <span>:{this.state.employeeWorkflowBean.employee.lastName}</span>
                                    </li>
                                    <li>
                                        <p>{t('total hours')}</p>  <span>: {totalTime}</span>
                                    </li>
                                    <li>
                                        <p>{t('total sales')}</p><span>: {realizationQuantity}</span>
                                    </li>
                                    <li>
                                        <p>{t('total productivity')}</p>
                                        <span>:{totalProductivity.toFixed(3)}</span>
                                    </li>

                                </ul>
                            </div>

                            <p>{t('commodity realization')}</p>

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
                </div>
            </section>
        )
    }
}

export default withTranslation()(EmployeeDetails);