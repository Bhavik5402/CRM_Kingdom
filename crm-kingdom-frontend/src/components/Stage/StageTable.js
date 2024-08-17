import React, { useState } from 'react';
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
    Chip,
    TablePagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Edit, Delete } from "@mui/icons-material";
import "./StageTableStyle.css";

export default function StageTable({ stage,onAddStage }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });
    const [filteredStages, setFilteredStages] = useState(stage);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        setFilteredStages(
            stage.filter(
                (stg) =>
                    stg.name.toLowerCase().includes(filters.name.toLowerCase())
            )
        );
        setPage(0); // Reset to the first page after filtering
    };

    const handleClear = () => {
        setFilters({ name: "" });
        setFilteredStages(stage);
        setPage(0); // Reset to the first page after clearing filters
    };

    const handleEdit = (stageId) => {
        console.log(`Edit stage with id: ${stageId}`);
    };

    const handleDelete = (stageId) => {
        console.log(`Delete stage with id: ${stageId}`);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const centerStyle = {
        textAlign: "center"
    };

    const headrs = {
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: "center"
    };

    return (
        <Paper className="table-container">
            <div className="add-stage-button">
                <Button variant="contained" color="success" onClick={onAddStage}>Add Stage</Button>
            </div>
            <Box className="filter-container" sx={{ marginTop: "20px" }}>
                <IconButton onClick={() => setFilterOpen(!filterOpen)}>
                    <FilterListIcon />
                </IconButton>
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
                            <TableCell sx={headrs}>Name</TableCell>
                            <TableCell sx={headrs}>Sequence</TableCell>
                            <TableCell sx={headrs}>Description</TableCell>
                            <TableCell sx={headrs}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {console.log(filteredStages)}
                        {filteredStages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stg) => (
                            <TableRow key={stg.id}>
                                <TableCell sx={centerStyle}>{stg.name}</TableCell>
                                <TableCell sx={centerStyle}>
                                    <Chip
                                        label={stg.sequence}
                                        sx={{ backgroundColor: stg.color, color: 'white' }}
                                    />
                                </TableCell>
                                <TableCell sx={centerStyle}>{stg.description}</TableCell>
                                <TableCell sx={centerStyle}>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        size="small"
                                        sx={{ marginRight: '8px' }}
                                        onClick={() => handleEdit(stg.id)}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        color="secondary"
                                        variant="text"
                                        size="small"
                                        onClick={() => handleDelete(stg.id)}
                                    >
                                        <Delete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={filteredStages.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
}
