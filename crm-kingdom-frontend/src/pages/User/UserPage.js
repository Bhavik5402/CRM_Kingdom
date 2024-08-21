import React, { useEffect, useState } from "react";
import AddUserForm from "components/User/AddUserForm";
import "./UserPage.css";
import Breadcrumbs from "components/Common/BreadCrumb";
import { UserTable } from "components";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";

const UserPage = () => {
    // local variables
    const navigate = useNavigate();

    // user states
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "users"]);
    const [pageTitle, setPageTitle] = useState("Users");

    // handle events and methods
    const handleAddUserClick = () => {
        navigate(AppRoutings.AddUser);
    };

    return (
        <div className="user-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            <div className="table-header">User Table</div>
            <UserTable onAddUser={handleAddUserClick} />
        </div>
    );
};

export default UserPage;
