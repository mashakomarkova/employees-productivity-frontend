import React, {Component} from 'react';
import Cookies from 'js-cookie';

class AdminHeader extends Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(Cookies.get('user'));
    }

    render() {
        return (
            <>
                <li><a href="/position">Add positions</a></li>
                <li><a href="/employees">Add employee</a></li>
            </>
        )
    }

}
export default AdminHeader