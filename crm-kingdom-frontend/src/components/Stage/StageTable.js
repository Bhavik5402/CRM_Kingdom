import React, { useState } from "react";
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

export default function StageTable({
    stage,
    onAddStage,
    totalCount,
    onFilterChange,
    onSortChange,
    onPageChange,
    onDeleteStage,
}) {
    const [filterOpen, setFilterOpen] = useState(true);
    const [filters, setFilters] = useState({ name: "" });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedStageId, setSelectedStageId] = useState(null);
    const navigate = useNavigate();
    console.log("Stage - ",stage)
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
        console.log("Stage Id -",stageId);
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
            <div className="add-stage-button">
                <Button variant="contained" color="success" onClick={onAddStage}>
                    Add Stage
                </Button>
            </div>
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
            <TableContainer>
                <Table>
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
                                    <TableCell>{stg.name}</TableCell>
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
            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        padding: "20px",
                        textAlign: "center",
                    },
                }}
            >
                <DialogTitle>
                    <WarningIcon sx={{ fontSize: 50, color: "orange" }} />
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Confirm Deletion
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this stage? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        onClick={() => setOpenConfirmDialog(false)}
                        color="primary"
                        variant="outlined"
                        sx={{ minWidth: "120px" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        color="secondary"
                        variant="contained"
                        sx={{ minWidth: "120px" }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
