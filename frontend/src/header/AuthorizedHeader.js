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
        window.location.reload()
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <li><a onClick={this.logout}>{t('logout')}</a></li>
                <li><a href="/signIn">{this.user.email}</a></li>
            </>
        )
    }
}
export default withTranslation()(AuthorizedHeader);