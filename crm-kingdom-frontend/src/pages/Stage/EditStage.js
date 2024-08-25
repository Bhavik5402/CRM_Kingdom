import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import AddStageForm from "components/Stage/AddStageForm";
import { useNavigate, useParams } from "react-router-dom";
import stageService from "services/stage-service";
import { createCommonApiCall } from "utility/helper/create-api-call";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import { AppRoutings } from "utility/enums/app-routings.ts";

export default function EditStage() {
    const { stageId } = useParams();
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "stage", "Edit"]);
    const pageTitle = "Edit Stage";
    const [initialValues, setInitialValues] = useState(null);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStageData = async () => {
            const response = await createCommonApiCall({
                requestBody: { stageId },
                apiService: stageService.getStageById, // Assume this is the API to get stage by ID
                setSuccessErrorContext,
                showPopup: false,
            });
            if (response && response.data) {
                console.log("StageData - ",response.data);
                setInitialValues(response.data);
            }
        };
        
        fetchStageData();
    }, [stageId, setSuccessErrorContext]);

    const handleSaveStage = async (updatedStage) => {
        // Call API to save updated stage details
        const response = await createCommonApiCall({
            requestBody: {stage : { ...updatedStage, stageId }},
            apiService: stageService.updateStage, // Assume this is the API to update stage
            setSuccessErrorContext,
            showPopup: true,
        });
        if (response && response.isSuccessfull) {
            navigate(AppRoutings.Stage);
        }
    };

    const handleCancel = () => {
        // Handle cancel (e.g., redirect, show a message, etc.)
        navigate(AppRoutings.Stage);
    };

    return (
        <div className="stage-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            {initialValues && (
                <AddStageForm
                    onSave={handleSaveStage}
                    onCancel={handleCancel}
                    pageTitle={pageTitle}
                    initialValues={initialValues} // Pass initial values to the form
                />
            )}
        </div>
    );
}
