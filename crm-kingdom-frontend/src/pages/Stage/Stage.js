import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import StageTable from "components/Stage/StageTable";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { createCommonApiCall } from "utility/helper/create-api-call";
import stageService from "services/stage-service";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";

export default function Stage() {
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "stages"]);
    const [pageTitle, setPageTitle] = useState("Stages");
    const [stages, setStages] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetchStages();
    }, []);

    const fetchStages = async (filters = {}, page = 0, rowsPerPage = 5, order = "asc", orderBy = "sequencenumber") => {
        const requestBody = {
            filterObj: filters,
            pageIndex: page , // Backend pages might start from 1
            pageSize: rowsPerPage,
            sortColumn: orderBy,
            sortDirection: order,
        };
        const response = await createCommonApiCall({
            requestBody,
            apiService: stageService.getAllStages,
            setSuccessErrorContext,
            showPopup : false
        });
        if (response && response.data) {
            const mappedStages = response.data.rows.map(stage => ({
                id: stage.stageid,
                name: stage.name,
                sequence: stage.sequencenumber,
                color: stage.color,
                description: stage.description,
            }));
            setStages(mappedStages);
            setTotalCount(response.data.count);
        }
    };

    const handleAddStageClick = () => {
        navigate(AppRoutings.AddStage);
    };

    const handleFilterChange = (filters, page, rowsPerPage, order, orderBy) => {
        fetchStages(filters, page, rowsPerPage, order, orderBy);
    };

    const handleSortChange = (filters, page, rowsPerPage, order, orderBy) => {
        fetchStages(filters, page, rowsPerPage, order, orderBy);
    };

    const handlePageChange = (filters, page, rowsPerPage, order, orderBy) => {
        fetchStages(filters, page, rowsPerPage, order, orderBy);
    };

    const handleDeleteStage = async (stageId) => {
        console.log("Handle stage - ",stageId);
        const response = await createCommonApiCall({
            requestBody: {stageId : stageId},
            apiService: stageService.deleteStage,
            setSuccessErrorContext,
            showPopup: true,
        });
        if (response) {
            fetchStages();  // Refresh the list of stages
        }
    };

    return (
        <div>
            <Breadcrumbs route={breadcrumbRoute} title={pageTitle} />
            <div className="table-header">Stage Table</div>
            <StageTable
                stage={stages}
                totalCount={totalCount}
                onAddStage={handleAddStageClick}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onPageChange={handlePageChange}
                onDeleteStage={handleDeleteStage}
            />
        </div>
    );
}
