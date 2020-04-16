import React, {Component} from "react";

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="uk-position-fixed uk-position-bottom footer">
                <div className="p-3 mb-2 uk-text-center">
                    Mariia Komarkova
                </div>
            </div>
        )
    }
}
export default Footer;