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
                <li className="nav-item"><a className="nav-link" href="/reg">{t('register')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/signIn">{t('sign in')}</a></li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                       role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Language
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                        <a className="dropdown-item" onClick={() => this.changeLanguage('ua')}>{t('ukrainian')}</a>
                        <a className="dropdown-item" onClick={() => this.changeLanguage('en')}>{t('english')}</a>
                    </div>
                </li>

            </>
        )
    }
}

export default withTranslation()(UnAuthorizedHeader);