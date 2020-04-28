import React, {Component} from "react";
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
            <section className="login_part section_padding">
                <div className="container">
                    <div className="login_part_form">
                        <form method="post" onSubmit={this.handleSubmit}>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('email')}</label>
                                <input className="form-control" type="text"
                                       pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                                       name="email"/>
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('password')}</label>
                                <input className="form-control" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                       type="password"
                                       name="password"/>
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('repeat password')}</label>
                                <input className="form-control" type="password"
                                       pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                       name="repeatPassword"/>
                            </div>
                            <button type="submit" className="btn_3">{t('register')}</button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default withTranslation()(Register);