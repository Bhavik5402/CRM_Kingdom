// src/pages/UserPage.js
import React from "react";
import UserTable from "components/User/UserTable";
import MainLayout from "Layout/MainLayout";

const UserPage = () => {
    const users = [
        { id: 1, username: "johndoe", email: "johndoe@example.com" },
        { id: 2, username: "janedoe", email: "janedoe@example.com" },
        // Add more users here...
    ];

    return (
        <MainLayout>
            <div>
                <h1>Users</h1>
                <UserTable users={users} />
            </div>
        </MainLayout>
    );
};

export default UserPage;
