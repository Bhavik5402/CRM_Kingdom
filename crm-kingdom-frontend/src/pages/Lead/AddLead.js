import React, { useContext, useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import LeadCreationForm from "components/Lead/LeadCreationForm";

export default function AddLead() {
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "leads", "Add"]);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const pageTitle = "Add Lead";
    const navigate = useNavigate();

    const handleSaveLead = async (newLead) => {
        const reqObject = {
            lead: newLead,
        };
    };

    const handleCancel = () => {
        navigate(AppRoutings.Leads);
    };

    return (
        <div className="lead-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            <LeadCreationForm onSave={handleSaveLead} onCancel={handleCancel} pageTitle={"Add Lead"} />
        </div>
    );
}
