import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";

class SignIn extends Component {

    employeeApi = 'http://localhost:8080/logIn';
    getUserInfo = 'http://localhost:8080/getUser';

    constructor(props) {
        super(props);
        this.isLoggedIn = Cookies.get('userForEmployee') != null;
    }

    signIn(data, login) {
        return fetch(`${this.employeeApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((token) => {
                Cookies.set('token', 'Bearer_'+token.token);
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
                Cookies.set('userForEmployee', data);
                onSuccess();
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let username = data.get("username");
        let password = data.get("password");
        let user = {username, password};
        this.signIn(user, () => {
            this.logUser(username, () => window.location.reload());
        });
    };

    renderPage() {
        const {t} = this.props;

        if (!this.isLoggedIn) {
            return (
                <div className="uk-margin">
                    <div className="uk-container">
                        <form method="post" onSubmit={this.handleSubmit}>
                            <div className="uk-margin">
                                <label>{t('username')}</label>
                                <input className="uk-input" type="text" name="username"/>
                            </div>
                            <div className="uk-margin">
                                <label>{t('password')}</label>
                                <input className="uk-input" type="password" name="password"/>
                            </div>
                            <button type="submit" className="uk-button uk-button-primary">{t('login')}</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            // let user = JSON.parse(Cookies.get('userForEmployee'));
            return (
                <div className="uk-margin">
                    <div className="uk-container">
                        <form method="post">
                            <div className="uk-margin">
                                <label>{t('username')}</label>
                                <input className="uk-input" type="text" name="username"/>
                            </div>
                            <div className="uk-margin">
                                <label>{t('password')}</label>
                                <input className="uk-input" type="text" name="password"/>
                            </div>
                            <div className="uk-margin">
                                <label>{t('repeat password')}</label>
                                <input className="uk-input" type="text" name="repeatPassword"/>
                            </div>
                            <button type="submit" className="uk-button uk-button-primary">{t('update')}</button>
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
export default withTranslation()(SignIn);