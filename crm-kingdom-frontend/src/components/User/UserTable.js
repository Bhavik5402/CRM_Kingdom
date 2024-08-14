// src/components/UserTable.js
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
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./TableStyles.css";

const UserTable = ({ users }) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ username: "", email: "" });
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
                    user.email.toLowerCase().includes(filters.email.toLowerCase())
            )
        );
    };

    const handleClear = () => {
        setFilters({ username: "", email: "" });
        setFilteredUsers(users);
    };

    return (
        <Paper className="table-container">
            <Box className="filter-container">
                <IconButton onClick={() => setFilterOpen(!filterOpen)}>
                    <FilterListIcon />
                </IconButton>
                <Collapse in={filterOpen}>
                    <Box className="filter-form">
                        <TextField
                            label="Username"
                            name="username"
                            value={filters.username}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            className="filter-input"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={filters.email}
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
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UserTable;
