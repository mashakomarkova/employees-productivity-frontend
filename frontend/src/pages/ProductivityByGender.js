import React, {Component} from 'react';

class ProductivityByGender extends Component {

    productivityApi = 'http://localhost:8080/findGenderProductivity';

    constructor(props) {
        super(props);
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
            }
        }).then((response) => response.json())
    }

    render() {
        if (!this.state.genderProductivity.femaleProductivity && !this.state.genderProductivity.maleProductivity) {
            return null;
        }

        return (
            <div className="uk-margin">
                <div className="uk-container">
                    <h1>Female productivity: {this.state.genderProductivity.femaleProductivity.toFixed(3)}</h1>
                    <h1>Male productivity: {this.state.genderProductivity.maleProductivity.toFixed(3)}</h1>
                </div>
            </div>
        )
    }
}

export default ProductivityByGender;