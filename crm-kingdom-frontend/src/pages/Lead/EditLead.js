import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import LeadCreationForm from "components/Lead/LeadCreationForm";
import { createCommonApiCall } from "utility/helper/create-api-call";
import leadService from "services/lead-service";

export default function EditLead() {
   
    const { leadId } = useParams();
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "lead", "Edit"]);
    const pageTitle = "Edit Lead";
    const [initialValues, setInitialValues] = useState(null);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLeadData = async () => {
            const response = await createCommonApiCall({
                requestBody: { leadId },
                apiService: leadService.GetLeadById, // Assume this is the API to get stage by ID
                setSuccessErrorContext,
                showPopup: false,
            });
            if (response && response.data) {
                setInitialValues(response.data);
                console.log("Initial Values - ",initialValues);
            }
        };
        
        fetchLeadData();
    }, [leadId, setSuccessErrorContext]);
    
    const handleSaveLead = async (updatedLead) => {
        // Call API to save updated stage details
        console.log("Updated WhatsappNumber - ",updatedLead);
        const response = await createCommonApiCall({
            requestBody: {updatelead : { ...updatedLead, leadId }},
            apiService: leadService.UpdateLead, // Assume this is the API to update stage
            setSuccessErrorContext,
            showPopup: true,
        });
        if (response && response.isSuccessfull) {
            navigate(AppRoutings.Leads);
        }
    };

    const handleCancel = () => {
        // Handle cancel (e.g., redirect, show a message, etc.)
        navigate(AppRoutings.Leads);
    };
    return (
        <div className="lead-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            {initialValues && (<LeadCreationForm onSave={handleSaveLead} onCancel={handleCancel} pageTitle={pageTitle}  initialValues={initialValues}/>)}
        </div>
    );
}
