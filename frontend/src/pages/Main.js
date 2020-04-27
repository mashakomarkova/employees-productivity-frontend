import React, {Component} from "react";
import '../pages/Main.css'
import {withTranslation} from "react-i18next";

class Main extends Component {

    render() {
        const {t} = this.props;
        return (
            <div className="header-image">
                <h1 className="main_text">
                    {t('employee productivity')}
                </h1>
            </div>
        )
    }
}
export default withTranslation()(Main);