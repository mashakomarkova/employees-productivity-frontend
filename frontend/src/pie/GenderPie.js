import React, {Component} from "react";
import Pie from 'react-chartjs-2';

class GenderPie extends Component {

    constructor(props) {
        super(props);
        this.data = {
            labels: [
                'Male productivity',
                'Female productivity',
            ],
            datasets: [{
                data: [props.maleProductivity, props.femaleProductivity],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };
    }

    render() {
        return(
            <div>
                <Pie data={this.data} />
            </div>
        )
    }
}
export default GenderPie