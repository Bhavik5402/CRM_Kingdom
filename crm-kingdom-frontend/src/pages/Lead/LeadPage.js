import React, { useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import LeadCreationForm from "components/Lead/LeadCreationForm";
import LeadDetails from "components/Lead/LeadDetails";

export default function LeadPage() {
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "Add Lead"]);
    const [pageTitle, setPageTitle] = useState("Add Lead");
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(true);

    const handleSave = (values) => {
        setFormData(values);
        setPageTitle("Lead Details");
        setBreadcrumbRoute(["home", "Lead Details"]);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setPageTitle("Edit Lead");
        setBreadcrumbRoute(["home", "Edit Lead"]);
        setIsEditing(true);
    };

    const handleConfirm = () => {
        console.log("Confirmed: ", formData);
        // You can add more logic here for the confirmation action, e.g., sending data to the backend.
    };

    const handleCancel = () => {
        setFormData(null);
        setPageTitle("Add Lead");
        setBreadcrumbRoute(["home", "Add Lead"]);
        setIsEditing(true);
    };

    return (
        <div className="lead-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            {isEditing ? (
                <LeadCreationForm onSave={handleSave} onCancel={handleCancel} initialValues={formData} />
            ) : (
                <LeadDetails data={formData} onEdit={handleEdit} onConfirm={handleConfirm} />
            )}
        </div>
    );
}
