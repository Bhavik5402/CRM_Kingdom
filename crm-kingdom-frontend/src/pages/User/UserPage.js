// src/pages/UserPage.js
import React from "react";
import UserTable from "components/User/UserTable";

const UserPage = () => {
    const users = [
        { id: 1, username: "johndoe", email: "johndoe@example.com" },
        { id: 2, username: "janedoe", email: "janedoe@example.com" },
        // Add more users here...
    ];

    return (
        <>
            <div>
                <h1>Users</h1>
                <UserTable users={users} />
            </div>
        </>
    );
};

export default UserPage;
