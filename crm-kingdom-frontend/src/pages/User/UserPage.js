import React from "react";
import UserTable from "components/User/UserTable";
import MainLayout from "Layout/MainLayout";
import './UserPage.css'
import Breadcrumbs from "components/common/BreadCrumb";

const UserPage = () => {
    const users = [
        { id: 1, username: "johndoe", email: "johndoe@example.com", LastModified: "23/04/2024 05:04 am", access: ["Add Page", "Edit Page", "Lead Creation"] },
        { id: 2, username: "janedoe", email: "janedoe@example.com", LastModified: "23/04/2024 05:04 am", access: ["Edit Page", "Lead Creation"] },
        { id: 3, username: "mikesmith", email: "mikesmith@example.com", LastModified: "22/04/2024 02:15 pm", access: ["View Page"] },
        { id: 4, username: "sarajones", email: "sarajones@example.com", LastModified: "21/04/2024 11:30 am", access: ["Add Page", "Edit Page"] },
        { id: 5, username: "davemiller", email: "davemiller@example.com", LastModified: "20/04/2024 08:45 am", access: ["Lead Creation"] },
        { id: 6, username: "annawilson", email: "annawilson@example.com", LastModified: "19/04/2024 07:50 am", access: ["Edit Page"] },
        { id: 7, username: "jamesbrown", email: "jamesbrown@example.com", LastModified: "18/04/2024 10:15 am", access: ["View Page", "Edit Page"] },
        { id: 8, username: "lindaclark", email: "lindaclark@example.com", LastModified: "17/04/2024 04:05 pm", access: ["Add Page", "View Page"] },
        { id: 9, username: "robertking", email: "robertking@example.com", LastModified: "16/04/2024 12:25 pm", access: ["Lead Creation", "Edit Page"] },
        { id: 10, username: "karendavis", email: "karendavis@example.com", LastModified: "15/04/2024 09:10 am", access: ["View Page", "Add Page"] },
        { id: 11, username: "danielmoore", email: "danielmoore@example.com", LastModified: "14/04/2024 06:55 am", access: ["Edit Page", "Lead Creation"] },
        { id: 12, username: "sharonlee", email: "sharonlee@example.com", LastModified: "13/04/2024 08:30 am", access: ["View Page"] },
        { id: 13, username: "paulwhite", email: "paulwhite@example.com", LastModified: "12/04/2024 11:20 am", access: ["Add Page"] },
        { id: 14, username: "nancymartin", email: "nancymartin@example.com", LastModified: "11/04/2024 01:45 pm", access: ["Lead Creation", "View Page"] },
        { id: 15, username: "scottthomas", email: "scottthomas@example.com", LastModified: "10/04/2024 05:35 pm", access: ["Add Page", "Edit Page", "View Page"] },
        { id: 16, username: "lisataylor", email: "lisataylor@example.com", LastModified: "09/04/2024 07:10 am", access: ["Lead Creation", "Add Page"] },
        { id: 17, username: "brianwalker", email: "brianwalker@example.com", LastModified: "08/04/2024 08:50 am", access: ["Edit Page", "View Page"] },
        { id: 18, username: "angelabaker", email: "angelabaker@example.com", LastModified: "07/04/2024 10:30 am", access: ["Add Page", "View Page", "Lead Creation"] },
        { id: 19, username: "chrisadams", email: "chrisadams@example.com", LastModified: "06/04/2024 01:10 pm", access: ["View Page"] },
        { id: 20, username: "amandawilson", email: "amandawilson@example.com", LastModified: "05/04/2024 03:55 pm", access: ["Lead Creation", "Add Page"] },
    ];

    const breadcrumbRoute = ["home", "users"];


    return (
        <MainLayout>
            <div className="user-table">
                <Breadcrumbs
                    icon="home"
                    title="Users"
                    route={breadcrumbRoute}
                    light={false}
                />
                <div className="table-header">
                    User Table
                </div>
                <UserTable users={users} />
            </div>
        </MainLayout>
    );
};

export default UserPage;
