import React, {Component} from 'react';
import Cookies from "js-cookie";
import {withTranslation} from "react-i18next";
import './WorkflowDetails.css'

class WorkflowDetails extends Component {

    workflowApi = 'http://localhost:8080/findWorkFlow';

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
        this.state = {
            workflow: {}
        };
    }

    componentDidMount() {
        this.viewWorkflow(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
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
                'Authorization': this.token
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
            return numberOfSales += realization.quantity;
        });
        let productivity = numberOfSales / totalHours;
        const {t} = this.props;
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    <div className="grid-container">
                        <div className="grid-item">
                            <div className="item-info">
                                <h3 className="item-name">{t('user email')}</h3>
                            </div>
                            {this.state.workflow.employee.user.email}</div>
                        <div
                            className="grid-item">{t('employee first name')}: {this.state.workflow.employee.firstName}</div>
                        <div
                            className="grid-item">{t('employee last name')}: {this.state.workflow.employee.lastName}</div>
                        <div className="grid-item">{t('gender')}: {this.state.workflow.employee.gender}</div>
                        <div
                            className="grid-item">{t('employee date of birth')}: {this.state.workflow.employee.dateOfBirth}</div>
                        <div className="grid-item">{t('work date')}: {this.state.workflow.workDate}</div>
                        <div className="grid-item">Start time: {this.state.workflow.startTime}</div>
                        <div className="grid-item">End time: {this.state.workflow.endTime}</div>
                        <div className="grid-item">{t('total hours')}: {totalHours}</div>
                        <div className="grid-item">{t('productivity per hour')}: {productivity.toFixed(3)}</div>
                        <div className="grid-item">{t('commodity realization')}</div>
                    </div>
                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>{t('commodity id')}</th>
                            <th>{t('quantity')}</th>
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

export default withTranslation()(WorkflowDetails);