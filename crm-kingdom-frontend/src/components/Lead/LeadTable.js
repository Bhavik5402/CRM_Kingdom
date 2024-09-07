import React, { useContext, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    IconButton,
    Box,
    Collapse,
    TablePagination,
    TableSortLabel,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Grid,
    Tooltip,
    Chip,
    Typography,
} from "@mui/material";
import {
    Edit,
    Delete,
    Visibility as VisibilityIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import "./LeadTableStyle.css";
import { useNavigate } from "react-router-dom";
import leadService from "services/lead-service";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import { createCommonApiCall } from "utility/helper/create-api-call";
import { WarningModal } from "components/Common/warning-modal";
import { MenuContext } from "Context/MenuContext";
import { UserContext } from "Context/UserContext";
const LeadTable = ({
    leads,
    totalCount,
    onFilterChange,
    onSortChange,
    onPageChange,
    onDeleteLead,
    countries,
    stages,
    users,
    onStageChange,
    onUploadFile
}) => {
    const menuDetails = useContext(MenuContext);
    const contextUser = useContext(UserContext);
    console.log("Lead users = ", users);
    console.log("Stages  = ", stages);
    const [filterOpen, setFilterOpen] = useState(true);
    const [filters, setFilters] = useState({
        companyname: "",
        countryid: "",
        stageid: "",
        leadby: "",
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("companyname");
    const [nextStages, setNextStages] = useState([]);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const [visibleColumns, setVisibleColumns] = useState({
        companyName: true,
        country: true,
        stage: true,
        leadBy: true,
        arrivedDate: true,
        importManager: true
    });
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleAddLead = () => {
        if(stages && stages.length > 0){
            navigate(AppRoutings.AddLead);

        }
        else{
            setSuccessErrorContext({
                isSuccessErrorOpen: true,
                title: "Error",
                message: "Please enter atleast 1 stage.",
                isSuccess: false,
            });
        }
    };
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [stageDialogOpen, setStageDialogOpen] = useState(false); // For stage change dialog
    const [selectedLead, setSelectedLead] = useState(null); // To keep track of the lead to be updated
    const [selectedStage, setSelectedStage] = useState(""); // For the selected stage
    const [remarks, setRemarks] = useState(""); // For remarks
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        onFilterChange(filters);
    };

    const handleClear = () => {
        setFilters({ companyname: "", countryid: "", stageid: "", leadby: "" });
        onFilterChange({});
    };

    const handleDelete = (lead) => {
        setOpenConfirmDialog(true);
        setSelectedLead(lead);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange(filters, newPage, rowsPerPage, order, orderBy)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        onPageChange(filters, page, parseInt(event.target.value, 10), order, orderBy)
    };

    const handleImportLeads = (event) => {
        const file = event.target.files[0];
        const validExtensions = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel
            "application/vnd.ms-excel", // Excel
            "text/csv", // CSV
            "text/csv", // CSV
        ];
        if (!(file && validExtensions.includes(file.type))) {
            setSuccessErrorContext({
                isSuccessErrorOpen: true,
                title: "Error",
                message: "Only excel file is allowed",
                isSuccess: false,
            });
        } else {
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    const truncateFileName = (fileName, maxLength = 20) => {
        if (fileName.length > maxLength) {
            return fileName.slice(0, maxLength) + "...";
        }
        return fileName;
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        onSortChange(filters, page, rowsPerPage, isAsc ? "desc" : "asc", property);
    };

    const handleColumnVisibilityChange = (column) => {
        setVisibleColumns({ ...visibleColumns, [column]: !visibleColumns[column] });
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleStageDialogOpen = (lead) => {
        console.log("Lead = ", lead);
        console.log("Stages = ", stages);
    
        // Find the sequence number of the selected stage
        const selectedStage = stages.find((stage) => stage.stageid === lead.stageId);
        const selectedStageSequenceNumber = selectedStage ? selectedStage.sequencenumber : null;
    
        // Get stages with sequence numbers greater than the selected stage's sequence number
        const nextStages = selectedStageSequenceNumber !== null 
            ? stages.filter((stage) => stage.sequencenumber > selectedStageSequenceNumber)
            : [];
    
        // Log for debugging
        console.log("Selected Stage Sequence Number = ", selectedStageSequenceNumber);
        console.log("Next Stages = ", nextStages);
        setNextStages(nextStages);
        setSelectedStage(nextStages[0]?.stageid);
        console.log("Selected Stages - ",selectedStage);
        setSelectedLead(lead);
        // setSelectedStage(lead.stageId);
        setStageDialogOpen(true);
    
        // You can pass `nextStages` to the dialog or store it in a state if you need to use it there
        // setAvailableNextStages(nextStages); // Example: store in state
    };
    

    const handleStageDialogClose = () => {
        setStageDialogOpen(false);
        setSelectedLead(null);
        setSelectedStage("");
    };

    const handleStageChange = (event) => {
        setSelectedStage(event.target.value);
    };

    const handleRemarksChange = (event) => {
        setRemarks(event.target.value);
    };

    const handleSaveStage = async () => {
        if (selectedLead && selectedStage) {
            handleStageDialogClose();
            onStageChange(selectedLead.id, selectedStage, remarks); // Pass remarks to the onStageChange callback
            setRemarks("");
        }
    };
    const handleEdit = (leadId) => {
        navigate(AppRoutings.EditLead.replace(":leadId", leadId));
    };

    const handleComplete = (leadId) => {
        const maxSequenceStage = stages.reduce((maxStage, currentStage) =>
            currentStage.sequencenumber > maxStage.sequencenumber ? currentStage : maxStage
        );

        onStageChange(leadId, maxSequenceStage.stageid);
    };

    const confirmDelete = () => {
        setOpenConfirmDialog(false);
        onDeleteLead(selectedLead.id);
        console.log("Selected lead - ", selectedLead.id);
    };

    const handleUploadExcel = async () => {
        if (!selectedFile) {
            alert("No file selected.");
            return;
        }


        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log("Uploaded file - ", selectedFile);
        onUploadFile(selectedFile);
    };

    return (
        <Paper className="table-container">
            <div>
                <Collapse in={filterOpen}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "16px",
                            flexWrap: "wrap",
                            marginTop: "20px",
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            size="small"
                            sx={{ flex: 1, minWidth: 250 }}
                        >
                            <InputLabel>Stage</InputLabel>
                            <Select
                                label="Stage"
                                name="stageid"
                                value={filters.stage}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {stages.map((stage) => (
                                    <MenuItem key={stage.stageid} value={stage.stageid}>
                                        {stage.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            size="small"
                            sx={{ flex: 1, minWidth: 250 }}
                        >
                            <InputLabel>Country</InputLabel>
                            <Select
                                label="Country"
                                name="countryid"
                                value={filters.country}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {countries.map((country) => (
                                    <MenuItem key={country.countryid} value={country.countryid}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            size="small"
                            sx={{ flex: 1, minWidth: 250 }}
                        >
                            <InputLabel>Lead By</InputLabel>
                            <Select
                                label="Lead By"
                                name="leadby"
                                value={filters.leadby}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.userid} value={user.userid}>
                                        {user.firstname + " " + user.lastname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{ marginLeft: 2, flex: 1 }}
                        >
                            Search
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClear}
                            sx={{ marginLeft: 2, flex: 1 }}
                        >
                            Clear
                        </Button>
                    </Box>
                </Collapse>
            </div>
            <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />

            <Box
                className="filter-container"
                sx={{
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <Button variant="contained" color="success" onClick={handleAddLead}>
                        Add Lead
                    </Button>
                </div>
                <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {selectedFile ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Tooltip title={selectedFile.name}>
                                <Chip
                                    label={truncateFileName(selectedFile.name)}
                                    onDelete={handleRemoveFile}
                                    deleteIcon={<CloseIcon />}
                                    color="primary"
                                    sx={{ maxWidth: 200 }}
                                />
                            </Tooltip>
                            <Button
                                sx={{ marginRight: 2 }}
                                variant="contained"
                                color="primary"
                                component="label"
                                onClick={handleUploadExcel}
                            >
                                Upload
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            sx={{ marginRight: 2 }}
                            variant="contained"
                            color="primary"
                            component="label"
                        >
                            Import
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                hidden
                                onChange={handleImportLeads}
                            />
                        </Button>
                    )}
                    <TextField
                        label="Search"
                        name="companyName"
                        value={filters.companyName}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                    />
                    <Button
                        variant="outlined"
                        onClick={handleDialogOpen}
                        startIcon={<VisibilityIcon />} // Add VisibilityIcon to the button
                    >
                        Columns
                    </Button>
                </Box>
            </Box>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Show/Hide Columns</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={1}>
                        {Object.keys(visibleColumns).map((column) => (
                            <Grid item key={column}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={visibleColumns[column]}
                                            onChange={() => handleColumnVisibilityChange(column)}
                                        />
                                    }
                                    label={column
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) => str.toUpperCase())}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {visibleColumns.companyName && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "companyname"}
                                        direction={orderBy === "companyname" ? order : "asc"}
                                        onClick={() => handleRequestSort("companyname")}
                                    >
                                        Company Name
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.country && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "countryid"}
                                        direction={orderBy === "countryid" ? order : "asc"}
                                        onClick={() => handleRequestSort("countryid")}
                                    >
                                        Country
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.stage && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "stageid"}
                                        direction={orderBy === "stageid" ? order : "asc"}
                                        onClick={() => handleRequestSort("stageid")}
                                    >
                                        Stage
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.leadBy && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "leadby"}
                                        direction={orderBy === "leadby" ? order : "asc"}
                                        onClick={() => handleRequestSort("leadby")}
                                    >
                                        Lead By
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.arrivedDate && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "createddate"}
                                        direction={orderBy === "createddate" ? order : "asc"}
                                        onClick={() => handleRequestSort("createddate")}
                                    >
                                        Arrived Date
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.importManager && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "managerusername"}
                                        direction={orderBy === "managerusername" ? order : "asc"}
                                        onClick={() => handleRequestSort("managerusername")}
                                    >
                                        Import Manager
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leads.length > 0 ? (
                            leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    {visibleColumns.companyName && (
                                        <TableCell>{lead.companyName}</TableCell>
                                    )}
                                    {visibleColumns.country && (
                                        <TableCell>{lead.country}</TableCell>
                                    )}
                                    {visibleColumns.stage && (
                                        <TableCell>
                                            {/* Replacing the button with a badge */}
                                            <span
                                                style={{
                                                    backgroundColor: lead.stageColor, // Using the stageColor for the badge
                                                    color: "#fff", // Text color, adjust if needed
                                                    padding: "5px 10px",
                                                    borderRadius: "5px",
                                                    fontSize: "0.875rem",
                                                }}
                                            >
                                                {lead.stage}
                                            </span>
                                        </TableCell>
                                    )}
                                    {visibleColumns.leadBy && <TableCell>{lead.leadBy}</TableCell>}
                                    {visibleColumns.arrivedDate && (
                                        <TableCell>{lead.arrivedDate}</TableCell>
                                    )}
                                    {visibleColumns.importManager && (
                                        <TableCell>{lead.importManager}</TableCell>
                                    )}
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(lead.id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(lead)}>
                                                <Delete />
                                            </IconButton>
                                            {(contextUser.usertype != 2 || ( menuDetails && menuDetails.includes(4))) && (
                                                <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                onClick={() => handleStageDialogOpen(lead)}
                                            >
                                                Complete
                                            </Button>
                                            )}
                                        </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body1">No records found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 15, 20]}
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Stage Change Dialog */}
            <Dialog
                open={stageDialogOpen}
                onClose={handleStageDialogClose}
                fullWidth={true}
                maxWidth="md"
                sx={{ "& .MuiDialog-paper": { width: "30%", maxWidth: "none" } }} // Set width to 80% of the screen
            >
                <DialogTitle>Update Stage</DialogTitle>
                <DialogContent>
                {nextStages.length > 0 ? (
                    <div>

                        <FormControl fullWidth>
                            <InputLabel>Stage</InputLabel>
                            <Select value={selectedStage} onChange={handleStageChange}>
                                {nextStages.map((stage) => (
                                    <MenuItem key={stage.stageid} value={stage.stageid}>
                                        {stage.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Remarks"
                            value={remarks}
                            onChange={handleRemarksChange}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                    </div>
                ) : (
                    <h3>This lead is already completed</h3>
                ) }
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleStageDialogClose} color="secondary">
                        Cancel
                    </Button>
                    {
                        nextStages.length > 0 &&
                        <Button onClick={handleSaveStage} color="primary">
                        Save
                    </Button>
                    }
                    
                </DialogActions>
            </Dialog>

            <WarningModal
                isModalOpen={openConfirmDialog}
                handleOnClickCloseModal={() => setOpenConfirmDialog(false)}
                title="Confirmation"
                warningMessage="Are you sure you want to delete this lead?"
                okButtonText="Delete"
                closeButtonText="Cancel"
                handleOnClickOk={confirmDelete}
            />
        </Paper>
    );
};

export default LeadTable;
