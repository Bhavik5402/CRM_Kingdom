import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import LeadTable from "components/Lead/LeadTable";
import { createCommonApiCall } from "utility/helper/create-api-call";
import leadService from "services/lead-service";
import stageService from "services/stage-service"; // Import stage service
import userService from "services/user-service"; // Import user service
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import { UserContext } from "Context/UserContext";

export default function LeadPage() {
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "Lead"]);
    const [pageTitle, setPageTitle] = useState("Leads");
    const [leads, setLeads] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [countries, setCountries] = useState([]);
    const [stages, setStages] = useState([]); // State for stages
    const [users, setUsers] = useState([]); // State for users
    const [loadingCountries, setLoadingCountries] = useState(true);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const contextUser = useContext(UserContext);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await createCommonApiCall({
                    requestBody: {},
                    apiService: leadService.GetAllCountries, // Your custom API to get all countries
                    setSuccessErrorContext,
                    showSuccessMessage: false,
                    showErrorMessage: true,
                });
                if (response && response.isSuccessfull) {
                    setCountries(response.data);
                } else {
                    console.error("Error fetching countries", response.message);
                }
            } catch (error) {
                console.error("Error fetching countries", error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        fetchLeads(); // Fetch leads only after countries are loaded
        fetchStages(); // Fetch stages
        fetchUsers(); // Fetch users
    }, [loadingCountries]);

    const fetchStages = async () => {
        try {
            const response = await createCommonApiCall({
                requestBody: { userid: contextUser.userid },
                apiService: stageService.getAllStagesByUserId, // API to get all stages by user ID
                setSuccessErrorContext,
                showSuccessMessage: false,
                showErrorMessage: true,
            });
            if (response && response.isSuccessfull) {
                setStages(response.data);
            } else {
                console.error("Error fetching stages", response.message);
            }
        } catch (error) {
            console.error("Error fetching stages", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await createCommonApiCall({
                requestBody: { leadId: contextUser.userid },
                apiService: userService.getUsersByLeadId, // API to get all users by lead ID
                setSuccessErrorContext,
                showSuccessMessage: false,
                showErrorMessage: true,
            });
            if (response && response.isSuccessfull) {
                setUsers(response.data);
            } else {
                console.error("Error fetching users", response.message);
            }
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const fetchLeads = async (
        filters = {},
        page = 0,
        rowsPerPage = 5,
        order = "asc",
        orderBy = "companyname"
    ) => {
        const requestBody = {
            filterObj: filters,
            pageIndex: page,
            pageSize: rowsPerPage,
            sortColumn: orderBy,
            sortDirection: order,
        };
        console.log("Request body -", requestBody);
        const response = await createCommonApiCall({
            requestBody,
            apiService: leadService.GetAllLeads,
            setSuccessErrorContext,
            showSuccessMessage: false,
            showErrorMessage: true,
        });
        if (response && response.data) {
            const mappedLeads = response.data.rows.map((lead) => ({
                id: lead.leadid,
                companyname: lead.companyname,
                country: lead.country,
                stage: lead.stageDetails ? lead.stageDetails.name : "N/A",
                stageColor: lead.stageDetails ? lead.stageDetails.color : "#1976d2",
                leadBy: `${lead.leadGenerator.firstname} ${lead.leadGenerator.lastname}`,
                arrivedDate: new Date(lead.createddate)
                    .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })
                    .replace(",", ""),
                importManager: lead.managerusername,
                stageId: lead.stageDetails.stageid,
            }));
            console.log(mappedLeads);
            setLeads(mappedLeads);
            setTotalCount(response.data.count);
        }
    };

    const handleFilterChange = (filters, page, rowsPerPage, order, orderBy) => {
        fetchLeads(filters, page, rowsPerPage, order, orderBy);
    };

    const handleSortChange = (filters, page, rowsPerPage, order, orderBy) => {
        fetchLeads(filters, page, rowsPerPage, order, orderBy);
    };

    const handlePageChange = (filters, page, rowsPerPage, order, orderBy) => {
        fetchLeads(filters, page, rowsPerPage, order, orderBy);
    };

    const handleDeleteLead = async (leadId) => {
        const response = await createCommonApiCall({
            requestBody: { leadId: leadId },
            apiService: leadService.DeleteLead,
            setSuccessErrorContext,
            showSuccessMessage: true,
            showErrorMessage: true,
        });
        if (response) {
            fetchLeads(); // Refresh the list of leads
        }
    };

    const handleStageChange = async (leadId, stageId, remarks) => {
        const response = await createCommonApiCall({
            requestBody: { leadId: leadId, newStageId: stageId, remarks: remarks },
            apiService: leadService.ChangeStage,
            setSuccessErrorContext,
            showSuccessMessage: true,
            showErrorMessage: true,
        });
        if (response && response.isSuccessfull) {
            fetchLeads();
        }
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        // Create the API call
        const response = await createCommonApiCall({
            requestBody: formData,
            apiService: leadService.UploadExcelSheet,
            setSuccessErrorContext,
            showSuccessMessage: true,
            showErrorMessage: true,
        });

        if(response && response.isSuccessfull){
            await fetchLeads();
        }

        return response.isSuccessfull;
    };

    return (
        <div>
            <Breadcrumbs route={breadcrumbRoute} title={pageTitle} />
            <div className="table-header">Lead Table</div>
            <LeadTable
                leads={leads}
                totalCount={totalCount}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onPageChange={handlePageChange}
                onDeleteLead={handleDeleteLead}
                countries={countries}
                stages={stages} // Pass stages to the table
                users={users}
                onStageChange={handleStageChange}
                onUploadFile={handleFileUpload}
            />
        </div>
    );
}
