import React, {Component} from 'react';
import Cookies from 'js-cookie';

class AuthorizedHeader extends Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(Cookies.get('user'));
    }

    logout() {
        Cookies.remove('user');
        window.location.reload()
    }

    render() {
        return (
            <>
                <li><a onClick={this.logout}>Logout</a></li>
                <li><a href="/signIn">{this.user.email}</a></li>
            </>
        )
    }
}

export default AuthorizedHeader;