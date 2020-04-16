import React, {Component} from 'react';

class UnAuthorizedHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <li><a href="/reg">Register</a></li>
                <li><a href="/signIn">Sign in</a></li>
            </>
        )
    }
}

export default UnAuthorizedHeader;