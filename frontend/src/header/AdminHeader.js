import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";

class AdminHeader extends Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(Cookies.get('userForEmployee'));
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <li><a href="/position">{t('add positions')}</a></li>
                <li><a href="/employees">{t('add employee')}</a></li>
            </>
        )
    }

}
export default withTranslation()(AdminHeader);