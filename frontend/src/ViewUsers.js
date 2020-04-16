import React, {useEffect} from 'react';

function ViewUsers() {
    const [users, setUsers] = React.useState(
        []);
    useEffect(() => {
        fetch('http://localhost:8080/findAllUsers', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(result => {
                    setUsers(result);
                }
            );
    });
    return (
        <div>
            <table border="1">
                <tr>
                    <td>id</td>
                    <td>email</td>
                </tr>
                {users.map((user) => {
                    return <tr>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                    </tr>


                })}
            </table>
        </div>

    )
}

export default ViewUsers