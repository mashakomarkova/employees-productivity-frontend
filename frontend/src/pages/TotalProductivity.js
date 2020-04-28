import React, {Component} from 'react';
import Cookies from "js-cookie";
import {withTranslation} from "react-i18next";

class TotalProductivity extends Component {

    productivityApi = 'http://localhost:8080/findTotalProductivity';

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
        this.state = {
            totalProductivityBean: {}
        };

    }

    componentDidMount() {
        this.viewTotalProductivity()
            .then(totalProductivityBean => {
                this.setState({totalProductivityBean});
            });
    }

    viewTotalProductivity() {
        return fetch(`${this.productivityApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    findByDate(data) {
        return fetch(`${this.productivityApi}/${data}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
        }).then((response) => response.json());
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let date = data.get('productivityDate');
        this.findByDate(date)
            .then((totalProductivityBean) => {
                this.setState({totalProductivityBean})
            });
    };

    render() {
        if (!this.state.totalProductivityBean) {
            return null;
        }
        const {t} = this.props;
        return (
            <section className="confirmation_part section_padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="confirmation_tittle">
                        <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit} method="get">
                            Find by date
                            <div className="col-md-12 form-group p_star">
                                <input className="form-control" type="date" name="productivityDate"/>
                            </div>
                            <button className="btn_3" type="submit">Find</button>
                        </form>
                        </div>
                        </div>
                    </div>
                    <div className="single_confirmation_details">
                        <div className="col-lg-6 col-lx-4">
                            <ul>
                                <li>
                                    <p>
                                        {t('total time employees')}</p>
                                    <span>:
                                        {this.state.totalProductivityBean.totalTime}
                                    </span>

                                </li>
                                <li>
                                    <p>
                                        {t('total sales')}
                                    </p>
                                    <span>:
                                        {this.state.totalProductivityBean.sales}
                                    </span>
                                </li>
                                <li>
                                    <p>
                                        {t('productivity per hour')} </p>
                                    <span>
                                    : {(this.state.totalProductivityBean.sales / this.state.totalProductivityBean.totalTime).toFixed(3)}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withTranslation()(TotalProductivity);