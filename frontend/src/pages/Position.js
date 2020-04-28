import React, {Component} from 'react';
import Cookies from "js-cookie";
import {withTranslation} from "react-i18next";

class Position extends Component {

    employeeApi = 'http://localhost:8080/createPosition';
    allPositionsApi = 'http://localhost:8080/allPositions';

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
        this.state = {
            positions: []
        };

    }

    componentDidMount() {
        this.viewAllPosition().then(positions => {
            this.setState({positions})
        });
    }

    viewAllPosition() {
        return fetch(`${this.allPositionsApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    addPosition(data, onSuccess) {
        return fetch(`${this.employeeApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify(data)
        }).then(() => onSuccess());
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let name = data.get('name');
        this.addPosition({name}, () => window.location.reload());
    };

    render() {
        if (!this.state.positions) {
            return null;
        }
        const {t} = this.props;
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    Add position
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="uk-margin">
                            <input className="uk-input" name="name" type="text" placeholder="Enter position name"/>
                        </div>
                        <button type="submit" className="uk-button uk-button-primary">Add position</button>
                    </form>

                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>{t('id')}</th>
                            <th>{t('position')}</th>
                            <th>{t('edit')}</th>
                            <th>{t('remove')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.positions.map((position) => {
                                return (
                                    <tr>
                                        <th>{position.id}</th>
                                        <th>{position.name}</th>
                                        <th>
                                            <a onClick="">{t('edit')}</a>
                                        </th>
                                        <th>
                                            <a onClick="">{t('remove')}</a>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default withTranslation()(Position);