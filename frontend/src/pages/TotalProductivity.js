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
            <div className="uk-margin">
                <div className="uk-container">
                    <form onSubmit={this.handleSubmit} method="get">
                        Find by date
                        <div className="uk-margin">
                            <input className="uk-input" type="date" name="productivityDate"/>
                        </div>
                        <button className="uk-button uk-button-primary" type="submit">Find</button>
                    </form>
                    <h1>{t('total time employees')}: {this.state.totalProductivityBean.totalTime}</h1>
                    <h1>{t('total sales')}: {this.state.totalProductivityBean.sales}</h1>
                    <h1>{t('productivity per hour')}: {(this.state.totalProductivityBean.sales / this.state.totalProductivityBean.totalTime).toFixed(3)}
                    </h1>
                </div>
            </div>
        )
    }
}
export default withTranslation()(TotalProductivity);