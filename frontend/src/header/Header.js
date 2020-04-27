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
            <div className="uk-navbar-container uk-navbar-transparent header">
                <nav>
                    <div className="uk-navbar-left">
                        <ul className="uk-navbar-nav">
                            <li><a href="/home">{t("home")}</a></li>
                            {this.renderHeader()}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withTranslation()(Header);
