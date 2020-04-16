import React, {Component} from 'react';
import AuthorizedHeader from "./AuthorizedHeader";
import Cookies from 'js-cookie';
import UnAuthorizedHeader from "./UnauthorizedHeader";
import AdminHeader from "./AdminHeader";
import ManagerHeader from "./ManagerHeader";

class Header extends Component {

    constructor(props) {
        super(props);
        this.isLoggedIn = Cookies.get('user') != null;
    }

    renderHeader() {
        if (!this.isLoggedIn) {
            return <UnAuthorizedHeader/>
        } else {
            this.user = JSON.parse(Cookies.get('user'));
            if (this.user.role.name === 'admin') {
                return (
                    <>
                        <AuthorizedHeader/>
                        <AdminHeader/>
                    </>
                )
            } else if (this.user.role.name === 'manager') {
                return (
                    <>
                        <AuthorizedHeader/>
                        <ManagerHeader/>
                    </>
                )
            } else {
                return <AuthorizedHeader/>
            }
        }
    }

    render() {
        return (
            <div className="uk-navbar-container uk-navbar-transparent header">
                <nav>
                    <div className="uk-navbar-left">
                        <ul className="uk-navbar-nav">
                            <li><a href="/home">Home</a></li>
                            {this.renderHeader()}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;