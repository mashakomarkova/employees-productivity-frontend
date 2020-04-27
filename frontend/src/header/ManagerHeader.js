import React, {Component} from 'react';
import {withTranslation} from "react-i18next";

class ManagerHeader extends Component {

    render() {
        const {t} = this.props;
        return (
            <>
                <li><a href="/employeesWorkflow">{t('employees workflow')}</a></li>
                <li><a href="/employeesProductivity">{t('employees productivity')}</a></li>
                <li><a href="/employees">{t('employees')}</a></li>
                <li><a href="/employees/byGender">{t('by gender')}</a></li>
            </>
        );
    }
}
export default withTranslation()(ManagerHeader);