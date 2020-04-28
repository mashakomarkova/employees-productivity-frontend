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
                Cookies.set('token', 'Bearer_' + token.token);
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
                <section className="login_part section_padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <div className="login_part_text text-center">
                                    <div className="login_part_text_iner">
                                        <h2>New to our Shop?</h2>
                                        <p>There are advances being made in science and technology
                                            everyday, and a good example of this is the</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="login_part_form">
                                    <form className="row contact_form" method="post" onSubmit={this.handleSubmit}>
                                        <div className="col-md-12 form-group p_star">
                                            <label>{t('username')}</label>
                                            <input className="form-control" type="text" name="username"/>
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <label>{t('password')}</label>
                                            <input className="form-control" type="password" name="password"/>
                                        </div>
                                        <button type="submit" className="btn_3">{t('login')}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        } else {
            // let user = JSON.parse(Cookies.get('userForEmployee'));
            return (
                <section className="login_part section_padding">
                    <div className="container">
                        <form method="post">
                            <div className="col-md-12 form-group p_star">
                                <label>{t('username')}</label>
                                <input className="form-control" type="text" name="username"/>
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('password')}</label>
                                <input className="form-control" type="text" name="password"/>
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('repeat password')}</label>
                                <input className="form-control" type="text" name="repeatPassword"/>
                            </div>
                            <button type="submit" className="btn_3">{t('update')}</button>
                        </form>
                    </div>
                </section>
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