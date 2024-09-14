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
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Edit, Delete, Warning as WarningIcon } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./StageTableStyle.css";
import { useNavigate } from "react-router-dom";
import { WarningModal } from "components/Common/warning-modal";
import { MenuContext } from "Context/MenuContext";
import { UserContext } from "Context/UserContext";

export default function StageTable({
    stage,
    onAddStage,
    totalCount,
    onFilterChange,
    onSortChange,
    onPageChange,
    onDeleteStage,
}) {
    const menuDetails = useContext(MenuContext);
    const contextUser = useContext(UserContext);
    const [filterOpen, setFilterOpen] = useState(true);
    const [filters, setFilters] = useState({ name: "" });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedStageId, setSelectedStageId] = useState(null);
    const navigate = useNavigate();
    console.log("Stage - ", stage);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        onFilterChange(filters, page, rowsPerPage, order, orderBy);
        setPage(0);
    };

    const handleClear = () => {
        setFilters({ name: "" });
        setPage(0);
        onFilterChange({}, 0, rowsPerPage, order, orderBy);
    };

    const handleEdit = (stageId) => {
        console.log(`Edit stage with id: ${stageId}`);
        navigate(`/stage/edit/${stageId}`);
    };

    const handleDelete = (stageId) => {
        console.log("Stage Id -", stageId);
        setSelectedStageId(stageId);
        setOpenConfirmDialog(true);
    };

    const confirmDelete = () => {
        setOpenConfirmDialog(false);
        onDeleteStage(selectedStageId);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange(filters, newPage, rowsPerPage, order, orderBy);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        onPageChange(filters, 0, newRowsPerPage, order, orderBy);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        onSortChange(filters, page, rowsPerPage, !isAsc ? "asc" : "desc", property);
    };

    return (
        <Paper className="table-container">
            {(contextUser.usertype != 2 || ( menuDetails && menuDetails.includes(2))) && (
                <div className="add-stage-button">
                    <Button variant="contained" color="success" onClick={onAddStage}>
                        Add Stage
                    </Button>
                </div>
            )}

            <Box className="filter-container" sx={{ marginTop: "20px" }}>
                {/* <IconButton onClick={() => setFilterOpen(!filterOpen)}>
                    <FilterListIcon />
                </IconButton> */}
                <Collapse in={filterOpen}>
                    <Box className="filter-form">
                        <TextField
                            label="Name"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            className="filter-input"
                        />
                        <Button variant="contained" color="primary" onClick={handleSearch}>
                            Search
                        </Button>
                        <Button variant="outlined" onClick={handleClear}>
                            Clear
                        </Button>
                    </Box>
                </Collapse>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? order : "asc"}
                                    onClick={() => handleRequestSort("name")}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "sequencenumber"}
                                    direction={orderBy === "sequencenumber" ? order : "asc"}
                                    onClick={() => handleRequestSort("sequencenumber")}
                                >
                                    Sequence
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "description"}
                                    direction={orderBy === "description" ? order : "asc"}
                                    onClick={() => handleRequestSort("description")}
                                >
                                    Description
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stage.length > 0 ? (
                            stage.map((stg) => (
                                <TableRow key={stg.id}>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                display: "inline-block",
                                                padding: "4px 12px",
                                                borderRadius: "12px",
                                                backgroundColor: stg.color,
                                                color: "#fff", // White text color for contrast
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                textTransform: "capitalize", // Ensures the name is in capitalized form
                                                marginRight: "8px",
                                            }}
                                        >
                                            {stg.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{stg.sequence}</TableCell>
                                    <TableCell>{stg.description}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            size="small"
                                            sx={{ marginRight: "8px" }}
                                            onClick={() => handleEdit(stg.id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleDelete(stg.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body1">No records found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={totalCount}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <WarningModal
                isModalOpen={openConfirmDialog}
                handleOnClickCloseModal={() => setOpenConfirmDialog(false)}
                title="Confirmation"
                warningMessage="Are you sure you want to delete this stage?"
                okButtonText="Delete"
                closeButtonText="Cancel"
                handleOnClickOk={confirmDelete}
            />
        </Paper>
    );
}
