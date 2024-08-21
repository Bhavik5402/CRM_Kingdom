import React, { useState } from 'react';
import StageTable from 'components/Stage/StageTable';
import { Description } from '@mui/icons-material';
import AddStageForm from 'components/Stage/AddStageForm';
import Breadcrumbs from 'components/Common/BreadCrumb';

export default function Stage() {
    const [isAddingStage, setIsAddingStage] = useState(false);
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "stages"]);
    const [pageTitle, setPageTitle] = useState("Stages");


    const stage = [
        {
            id: 1,
            name: "new",
            sequence: 1,
            color: "red",
            description: "abkjflalsd;kfjalksdfj"
        },
        {
            id: 2,
            name: "in-progress",
            sequence: 2,
            color: "green",
            description: "abkjflalsd;kfjalksdfj"
        }
    ];

    const handleAddStageClick = () => {
        setIsAddingStage(true);
        setPageTitle("Add");
        setBreadcrumbRoute(["home", "stages", "Add"]);
    };

    const handleSaveStage = (newStage) => {
        // Handle the save logic here, e.g., add the new stage to the stages array
        setIsAddingStage(false);
    };

    const handleCancel = () => {
        setIsAddingStage(false);
        setPageTitle("Stages");
        setBreadcrumbRoute(["home", "stages"]);
    };

    return (
        <div className="stage-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />

            {isAddingStage ? (
                <AddStageForm onSave={handleSaveStage} onCancel={handleCancel} />
            ) : (
                <>
                    <div className="table-header">
                        Stage Table
                    </div>
                    <StageTable stage={stage} onAddStage={handleAddStageClick} />
                </>
            )}
        </div>
    );
}
