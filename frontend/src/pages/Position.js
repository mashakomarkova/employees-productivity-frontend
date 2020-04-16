import React, {Component} from 'react';

class Position extends Component {

    employeeApi = 'http://localhost:8080/createPosition';
    allPositionsApi = 'http://localhost:8080/allPositions';

    constructor(props) {
        super(props);
        this.state = {
            positions : []
        };
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
            }
        }).then((response) => response.json())
    }

    addPosition(data, onSuccess) {
        return fetch(`${this.employeeApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
                            <th>Id</th>
                            <th>Position</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.positions.map((position) => {
                                return (
                                    <tr>
                                        <th>{position.id}</th>
                                        <th>{position.name}</th>
                                        <th><a onClick="">Edit</a></th>
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

export default Position;