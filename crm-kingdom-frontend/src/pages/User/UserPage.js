// src/pages/UserPage.js
import React from "react";
import UserTable from "components/User/UserTable";
import MainLayout from "Layout/MainLayout";
import './UserPage.css'
const UserPage = () => {
    const users = [
        { id: 1, username: "johndoe", email: "johndoe@example.com", LastModified: "23/04/2024 05:04 am", access: ["Add Page", "Edit Page", "Lead Creation"] },
        { id: 2, username: "janedoe", email: "janedoe@example.com", LastModified: "23/04/2024 05:04 am", access: ["Edit Page", "Lead Creation"] },
    ];

    return (
        <MainLayout>
            <div className="user-table">
                 <div className="table-header">
                    User Table
                 </div>
                <UserTable users={users} />
            </div>
        </MainLayout>
    );
};

export default UserPage;
