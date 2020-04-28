import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import Cookies from "js-cookie";

class Graph extends Component {

    constructor(props) {
        super(props);
        const workflowBeans = JSON.parse(Cookies.get('workflowBeans'));
        console.log(workflowBeans);
        const productivity = [];
        const dates = [];
        if (workflowBeans != null) {
            workflowBeans.map(workflowBean => {
                productivity.push(workflowBean.productivity);
                dates.push(workflowBean.date);
            });
        }
        this.initialState = {
            labels: dates,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: productivity
                }
            ]
        };
    }

    componentWillMount() {
        this.setState(this.initialState);
    }

    render() {
        return (
            <Bar data={this.state}/>
        );
    }
};


export default class WorkflowLine extends Component {
    render() {
        return (
            <div>
                <h2>You can even make crazy graphs like this!</h2>
                <Graph/>
            </div>
        );
    }
}
