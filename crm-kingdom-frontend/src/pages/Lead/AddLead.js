import React, { useContext, useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import LeadCreationForm from "components/Lead/LeadCreationForm";
import LeadDetails from "components/Lead/LeadDetails";

export default function AddLead() {
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "leads", "Add"]);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const [formData, setFormData] = useState({
        companyName: "ABC Corp",
        email: "contact@abccorp.com",
        contactNo: "+1 234 567 890",
        mobileNo: "+1 987 654 321",
        website: "https://www.abccorp.com",
        facebook: "https://www.facebook.com/abccorp",
        linkedin: "https://www.linkedin.com/company/abccorp",
        instagram: "https://www.instagram.com/abccorp",
        address: "1234 Elm Street, Springfield, IL, 62704, USA",
        importManagerContactNo: "+1 555 123 4567",
        importManagerName: "John Doe",
        importManagerWhatsappNo: "+1 555 765 4321",
        importManagerEmailId: "john.doe@abccorp.com",
        leadBy: "Jane Smith",
        sourceBy: "Online Ad",
        remarks: "Interested in bulk orders."
    });
    const [isEditing, setIsEditing] = useState(true);
    const [pageTitle, setPageTitle] = useState("Add Lead");
    const navigate = useNavigate();

    const handleSaveLead = async (newLead) => {
        const reqObject = {
            lead: newLead,
        };
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
        navigate(AppRoutings.Leads);
    };

    return (
        <div className="lead-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            <LeadCreationForm onSave={handleSaveLead} onCancel={handleCancel} pageTitle={"Add Lead"} />
            {/* <LeadDetails data={formData} onEdit={handleEdit} onConfirm={handleConfirm} /> */}
        </div>
    );
}
