import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import i18n from '../i18n.js';

class UnAuthorizedHeader extends Component {
    changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <li><a href="/reg">{t('register')}</a></li>
                <li><a href="/signIn">{t('sign in')}</a></li>
                <li>
                    <a onClick={() => this.changeLanguage('ua')}>{t('ukrainian')}</a>
                </li>
                <li>
                    <a onClick={() => this.changeLanguage('en')}>{t('english')}</a>
                </li>

            </>
        )
    }
}

export default withTranslation()(UnAuthorizedHeader);