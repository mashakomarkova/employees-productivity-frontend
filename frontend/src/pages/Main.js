import React, {Component} from "react";
import '../pages/Main.css'
import Cookies from 'js-cookie';

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-image">
                <h1>
                    Employee productivity
                </h1>
            </div>
        )
    }
}

export default Main;