import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";

class AuthorizedHeader extends Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(Cookies.get('userForEmployee'));
    }

    logout() {
        Cookies.remove('userForEmployee');
        Cookies.remove('token');
        window.location.replace("/signIn");
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <li className="nav-item"><a className="nav-link" onClick={this.logout}>{t('logout')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/signIn">{this.user.email}</a></li>
            </>
        )
    }
}
export default withTranslation()(AuthorizedHeader);