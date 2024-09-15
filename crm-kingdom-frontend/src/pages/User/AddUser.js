import { AddUserForm } from "components";
import Breadcrumbs from "components/Common/BreadCrumb";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "services/user-service";
import tokenManager from "utility/auth-guards/token-manager";
import { AppRoutings } from "utility/enums/app-routings.ts";

const AddUser = () => {
    // get params
    const { encUserId } = useParams();

    // local variables
    const navigate = useNavigate();

    // user states
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "users", "add-user"]);
    const [pageTitle, setPageTitle] = useState("Add User");

    //handle events and functions
    const handleSaveUser = (newUser) => {};

    const handleCancel = () => {
        navigate(AppRoutings.User);
    };

    // use effect
    useEffect(() => {
        if (encUserId) {
            setPageTitle("Edit User");
            setBreadcrumbRoute(["home", "users", "edit-user"]);
        }
    }, []);

    return (
        <div className="user-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            <AddUserForm
                onSave={handleSaveUser}
                onCancel={handleCancel}
                formTitle={pageTitle}
                encUserId={encUserId}
            />
        </div>
    );
};

export default AddUser;
