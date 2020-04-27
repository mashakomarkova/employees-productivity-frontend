import React, {Component} from "react";
import '../register/Register.css'
import {withTranslation} from "react-i18next";

class Register extends Component {

    employeeApi = 'http://localhost:8080/createUser';
    myRef;

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    signUp(data, onSuccess) {
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
        let email = data.get("email");
        let password = data.get("password");
        let repeatPassword = data.get("repeatPassword");
        if (password !== repeatPassword) {
            alert("incorrect password confirmation");
        } else {
            let user = {email, password};
            this.signUp(user, () => window.location.reload());
        }
    };

    render() {
        const {t} = this.props;
        return (
            <div className="uk-margin">
                <div className="uk-container register">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="uk-margin">
                            <label>{t('email')}</label>
                            <input className="uk-input" type="text"
                                   pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                                   name="email"/>
                        </div>
                        <div className="uk-margin">
                            <label>{t('password')}</label>
                            <input className="uk-input" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                   type="password"
                                   name="password"/>
                        </div>
                        <div className="uk-margin">
                            <label>{t('repeat password')}</label>
                            <input className="uk-input" type="password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                   name="repeatPassword"/>
                        </div>
                        <button type="submit" className="uk-button uk-button-primary">{t('register')}</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default withTranslation()(Register);