import React, {Component} from 'react';

class ManagerHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <li><a href="/employeesWorkflow">View employees workflow</a></li>
                <li><a href="/employeesProductivity">View employees productivity</a></li>
                <li><a href="/employees">Employees</a></li>
                <li><a href="/employees/byGender">Productivity by gender</a></li>
            </>
        );
    }
}
export default ManagerHeader;