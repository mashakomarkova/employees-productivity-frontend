import React, {Component} from 'react';

class TotalProductivity extends Component {

    productivityApi = 'http://localhost:8080/findTotalProductivity';

    constructor(props) {
        super(props);
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
            }
        }).then((response) => response.json())
    }

    findByDate(data) {
        return fetch(`${this.productivityApi}/${data}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
                    <h1>Total time employees worked: {this.state.totalProductivityBean.totalTime}</h1>
                    <h1>Total sales: {this.state.totalProductivityBean.sales}</h1>
                    <h1>Productivity per
                        hour: {(this.state.totalProductivityBean.sales / this.state.totalProductivityBean.totalTime).toFixed(3)}
                    </h1>
                </div>
            </div>
        )
    }
}

export default TotalProductivity