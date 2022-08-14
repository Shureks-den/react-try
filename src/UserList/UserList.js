import React, { useState, useEffect } from 'react';

import './UserList.scss';

function User(props) {
    return (
        <div className='user-container'>
            <div className='user'> {props.name} </div>
        </div>
    )
}

export default function UserList(props) {
    const [users, setUsers] = useState([]);
    const usersList = users.map((name, id) =>
        <User key={id}
            name={name} />
    );
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/users', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: "include",
            });
            const body = await response.json();
            setUsers(body);
        })();
    });
    

    return (
        <div>
            <div className='title'> Список юзеров </div>
            <div className='user-list'>
                {usersList}
            </div>
        </div>

    )
}