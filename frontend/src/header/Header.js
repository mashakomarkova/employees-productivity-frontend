import React, {Component} from 'react';
import AuthorizedHeader from "./AuthorizedHeader";
import Cookies from 'js-cookie';
import UnAuthorizedHeader from "./UnauthorizedHeader";
import AdminHeader from "./AdminHeader";
import ManagerHeader from "./ManagerHeader";
import {withTranslation} from 'react-i18next';

class Header extends Component {

    constructor(props) {
        super(props);
        this.t = props.t;
        this.isLoggedIn = Cookies.get('userForEmployee') != null;
    }

    renderHeader() {
        if (!this.isLoggedIn) {
            return <UnAuthorizedHeader/>
        } else {
            this.user = JSON.parse(Cookies.get('userForEmployee'));
            console.log(this.user);
            if (!this.user) {
                return null;
            }
            if (!this.user.roles) {
                return null;
            }

            let render = this.user.roles.map((role) => {
                console.log(role);
                if (role.name === 'ROLE_ADMIN') {
                    return (
                        <>
                            <AuthorizedHeader/>
                            <AdminHeader/>
                        </>
                    )
                } else if (role.name === 'ROLE_MANAGER') {
                    return (
                        <>
                            <AuthorizedHeader/>
                            <ManagerHeader/>
                        </>
                    )
                } else {
                    return <AuthorizedHeader/>
                }
            })
            return render;
        }
    }

    render() {
        const {t} = this.props;
        return (
            <header className="main_menu home_menu">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-11">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <a className="navbar-brand" href="/"> <img src="img/logo.png" alt="logo"/>
                                </a>
                                <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item"><a className="nav-link" href="/home">{t("home")}</a>
                                        </li>
                                        {this.renderHeader()}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default withTranslation()(Header);
