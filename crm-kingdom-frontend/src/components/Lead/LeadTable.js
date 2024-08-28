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
} from "@mui/material";
import {
    Edit,
    Delete,
    Visibility as VisibilityIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import "./LeadTableStyle.css";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
const LeadTable = ({
    leads,
    totalCount,
    onFilterChange,
    onSortChange,
    onPageChange,
    onDeleteLead,
}) => {
    const [filterOpen, setFilterOpen] = useState(true);
    const [filters, setFilters] = useState({ companyName: "", country: "", stage: "", leadBy: "" });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("companyName");
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const [visibleColumns, setVisibleColumns] = useState({
        companyName: true,
        country: true,
        stage: true,
        leadBy: true,
        arrivedDate: true,
        importManager: true,
        action: true,
    });
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleAddLead = () => {
        navigate(AppRoutings.AddLead);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        onFilterChange(filters);
    };

    const handleClear = () => {
        setFilters({ companyName: "", country: "", stage: "", leadBy: "" });
        onFilterChange({});
    };

    const handleDelete = (leadId) => {
        onDeleteLead(leadId);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        onPageChange(0, parseInt(event.target.value, 10));
    };

    const handleImportLeads = (event) => {
        const file = event.target.files[0];
        const validExtensions = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
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
        onSortChange(property, isAsc ? "desc" : "asc");
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

    const handleEdit = (leadId) => {
        navigate(AppRoutings.EditLead.replace(":leadId", leadId));
    }

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
                                name="stage"
                                value={filters.stage}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* Map your stage options here */}
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
                                name="country"
                                value={filters.country}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* Map your country options here */}
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
                                name="leadBy"
                                value={filters.leadBy}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* Map your lead by options here */}
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
                                accept=".xlsx,.xls"
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
                                        active={orderBy === "companyName"}
                                        direction={orderBy === "companyName" ? order : "asc"}
                                        onClick={() => handleRequestSort("companyName")}
                                    >
                                        Company Name
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.country && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "country"}
                                        direction={orderBy === "country" ? order : "asc"}
                                        onClick={() => handleRequestSort("country")}
                                    >
                                        Country
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.stage && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "stage"}
                                        direction={orderBy === "stage" ? order : "asc"}
                                        onClick={() => handleRequestSort("stage")}
                                    >
                                        Stage
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.leadBy && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "leadBy"}
                                        direction={orderBy === "leadBy" ? order : "asc"}
                                        onClick={() => handleRequestSort("leadBy")}
                                    >
                                        Lead By
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.arrivedDate && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "arrivedDate"}
                                        direction={orderBy === "arrivedDate" ? order : "asc"}
                                        onClick={() => handleRequestSort("arrivedDate")}
                                    >
                                        Arrived Date
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.importManager && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "importManager"}
                                        direction={orderBy === "importManager" ? order : "asc"}
                                        onClick={() => handleRequestSort("importManager")}
                                    >
                                        Import Manager
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {visibleColumns.action && <TableCell>Action</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead.id}>
                                {visibleColumns.companyName && (
                                    <TableCell>{lead.companyName}</TableCell>
                                )}
                                {visibleColumns.country && <TableCell>{lead.country}</TableCell>}
                                {visibleColumns.stage && <TableCell>{lead.stage}</TableCell>}
                                {visibleColumns.leadBy && <TableCell>{lead.leadBy}</TableCell>}
                                {visibleColumns.arrivedDate && (
                                    <TableCell>{lead.arrivedDate}</TableCell>
                                )}
                                {visibleColumns.importManager && (
                                    <TableCell>{lead.importManager}</TableCell>
                                )}
                                {visibleColumns.action && (
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(lead.id)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(lead.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default LeadTable;
