import React, { useState } from "react";
import Breadcrumbs from "components/Common/BreadCrumb";
import LeadTable from "components/Lead/LeadTable";

export default function LeadPage() {
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "Lead"]);
    const [pageTitle, setPageTitle] = useState("Leads");
    const [leads, setLeads] = useState([
        {
            id: 1,
            companyName: "Acme Corp",
            country: "USA",
            stage: "Qualified",
            leadBy: "John Doe",
            arrivedDate: "2024-08-01",
            importManager: "Jane Smith",
        },
        {
            id: 2,
            companyName: "Globex Inc.",
            country: "Canada",
            stage: "In Progress",
            leadBy: "Alice Johnson",
            arrivedDate: "2024-08-10",
            importManager: "Bob Brown",
        },
        {
            id: 3,
            companyName: "Umbrella Corp",
            country: "UK",
            stage: "Proposal Sent",
            leadBy: "Charlie Davis",
            arrivedDate: "2024-08-15",
            importManager: "David Wilson",
        },
    ]);
    const [filteredLeads, setFilteredLeads] = useState(leads);
    const [totalCount, setTotalCount] = useState(leads.length);

    const handleFilterChange = (filters) => {
        let filtered = leads.filter((lead) => {
            return (
                (!filters.companyName || lead.companyName.includes(filters.companyName)) &&
                (!filters.country || lead.country.includes(filters.country)) &&
                (!filters.stage || lead.stage.includes(filters.stage)) &&
                (!filters.leadBy || lead.leadBy.includes(filters.leadBy))
            );
        });
        setFilteredLeads(filtered);
        setTotalCount(filtered.length);
    };

    const handleSortChange = (property, direction) => {
        let sortedLeads = [...filteredLeads].sort((a, b) => {
            if (direction === "asc") {
                return a[property] > b[property] ? 1 : -1;
            } else {
                return a[property] < b[property] ? 1 : -1;
            }
        });
        setFilteredLeads(sortedLeads);
    };

    const handlePageChange = (newPage, rowsPerPage) => {
        // For now, just log the new page and rows per page
        console.log(`Page: ${newPage}, Rows per page: ${rowsPerPage}`);
    };

    const handleDeleteLead = (leadId) => {
        const updatedLeads = filteredLeads.filter((lead) => lead.id !== leadId);
        setFilteredLeads(updatedLeads);
        setLeads(updatedLeads);
        setTotalCount(updatedLeads.length);
    };

    const handleImportLeads = () => {
        console.log("Import leads");
    };

    const handleExportLeads = () => {
        console.log("Export leads");
    };

    return (
        <div>
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            <div className="table-header">Lead Table</div>
            <LeadTable
                leads={filteredLeads}
                totalCount={totalCount}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onPageChange={handlePageChange}
                onDeleteLead={handleDeleteLead}
            />
        </div>
    );
}
