import React, {Component} from 'react';
import Cookies from "js-cookie";
import {withTranslation} from "react-i18next";

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
            <section className="confirmation_part section_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="order_details_iner">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th scope="col" colSpan="2">Parameter</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>{t('user email')}</th>
                                        <th> {this.state.workflow.employee.user.email}</th>
                                    </tr>
                                    <tr>
                                        <th>{t('employee first name')}:</th>
                                        <th>{this.state.workflow.employee.firstName}</th>
                                    </tr>
                                    <tr>
                                        <th> {t('employee last name')}:</th>
                                        <th> {this.state.workflow.employee.lastName}</th>
                                    </tr>
                                    <tr>
                                        <th>{t('gender')}:</th>
                                        <th> {this.state.workflow.employee.gender}</th>
                                    </tr>
                                    <tr>
                                        <th>{t('employee date of birth')}:</th>
                                        <th>{this.state.workflow.employee.dateOfBirth}</th>
                                    </tr>
                                    <tr>
                                        <th>{t('work date')}:</th>
                                        <th>{this.state.workflow.workDate}</th>
                                    </tr>
                                    <tr>
                                        <th>Start time:</th>
                                        <th>{this.state.workflow.startTime}</th>
                                    </tr>
                                    <tr>
                                        <th>End time:</th>
                                        <th>{this.state.workflow.endTime}</th>
                                    </tr>
                                    <tr>
                                        <th>{t('total hours')}:</th>
                                        <th>{totalHours}</th>
                                    </tr>
                                    <tr>
                                        <th>{t('productivity per hour')}:</th>
                                        <th>{productivity.toFixed(3)}</th>
                                    </tr>
                                    <tr>
                                        <th>{t('commodity realization')}</th>
                                    </tr>
                                    </tbody>
                                </table>
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
                    </div>
                </div>
            </section>
        )
    }
}

export default withTranslation()(WorkflowDetails);