import React, { useContext, useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import AddStageForm from "components/Stage/AddStageForm";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { createCommonApiCall } from "utility/helper/create-api-call";
import stageService from "services/stage-service";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";

export default function AddStage() {
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "stages", "Add"]);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const pageTitle = "Add Stage";
    const navigate = useNavigate();
    const handleSaveStage = async (newStage) => {
        const reqObject = {
            stage : newStage
        }
        const response = await createCommonApiCall({
            requestBody: reqObject,
            apiService: stageService.addStage,
            setSuccessErrorContext,
            showPopup: true,
        });
        if(response && response.statusCode == 200){
            navigate(AppRoutings.Stage);
        }
    };

    const handleCancel = () => {
        navigate(AppRoutings.Stage);
    };

    return (
        <div className="stage-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            <AddStageForm onSave={handleSaveStage} onCancel={handleCancel} pageTitle={"Add Stage"}/>
        </div>
    );
}
