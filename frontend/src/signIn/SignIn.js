import React, {Component} from 'react';
import Cookies from 'js-cookie';

class SignIn extends Component {

    employeeApi = 'http://localhost:8080/signIn';
    getUserInfo = 'http://localhost:8080/getUser';

    constructor(props) {
        super(props);
        this.isLoggedIn = Cookies.get('user') != null;
    }

    signIn(data, login) {
        return fetch(`${this.employeeApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(() => {
            login();
        });
    }

    logUser(email, onSuccess) {
        fetch(`${this.getUserInfo}/${email}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(data => {
                Cookies.set('user', data);
                onSuccess();
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let email = data.get("email");
        let password = data.get("password");
        let user = {email, password};
        this.signIn(user, () => {
            this.logUser(email, () => window.location.reload());
        });
    };

    renderPage() {
        if (!this.isLoggedIn) {
            return (
                <div className="uk-margin">
                    <div className="uk-container">
                        <form method="post" onSubmit={this.handleSubmit}>
                            <div className="uk-margin">
                                <input className="uk-input" type="text" name="email" placeholder="email"/>
                            </div>
                            <div className="uk-margin">
                                <input className="uk-input" type="password" name="password" placeholder="password"/>
                            </div>
                            <button type="submit" className="uk-button uk-button-primary">Login</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            let user = JSON.parse(Cookies.get('user'));
            return (
                <div className="uk-margin">
                    <div className="uk-container">
                        <form method="post">
                            <div className="uk-margin">
                                <input className="uk-input" type="text" name="email" placeholder="email"
                                       value={user.email}/>
                            </div>
                            <div className="uk-margin">
                                <input className="uk-input" type="text" name="password" placeholder="password"/>
                            </div>
                            <div className="uk-margin">
                                <input className="uk-input" type="text" name="repeatPassword"
                                       placeholder="repeat password"/>
                            </div>
                            <button type="submit" className="uk-button uk-button-primary">Update</button>
                        </form>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            this.renderPage()
        );
    }
}

export default SignIn;