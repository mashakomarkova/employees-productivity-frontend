import React, {Component} from 'react';
import {withTranslation} from "react-i18next";

class ManagerHeader extends Component {

    render() {
        const {t} = this.props;
        return (
            <>
                <li className="nav-item"><a className="nav-link" href="/employeesWorkflow">{t('employees workflow')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/employeesProductivity">{t('employees productivity')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/employees">{t('employees')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/employees/byGender">{t('by gender')}</a></li>
            </>
        );
    }
}
export default withTranslation()(ManagerHeader);