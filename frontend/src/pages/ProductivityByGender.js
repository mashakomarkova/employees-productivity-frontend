import React, {Component} from 'react';
import GenderPie from "../pie/GenderPie";
import Cookies from "js-cookie";
import {withTranslation} from "react-i18next";

class ProductivityByGender extends Component {

    productivityApi = 'http://localhost:8080/findGenderProductivity';

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
        this.state = {
            genderProductivity: {}
        };
    }

    componentDidMount() {
        this.viewTotalProductivity()
            .then(genderProductivity => {
                this.setState({genderProductivity});
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

    render() {
        const {t} = this.props;
        if (!this.state.genderProductivity.femaleProductivity && !this.state.genderProductivity.maleProductivity) {
            return null;
        }
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    <h1>{t('female productivity')}: {this.state.genderProductivity.femaleProductivity.toFixed(3)}</h1>
                    <h1>{t('male productivity')}: {this.state.genderProductivity.maleProductivity.toFixed(3)}</h1>
                    <GenderPie maleProductivity={this.state.genderProductivity.maleProductivity.toFixed(3)}
                               femaleProductivity={this.state.genderProductivity.femaleProductivity.toFixed(3)}/>
                </div>
            </div>
        )
    }
}
export default withTranslation()(ProductivityByGender);