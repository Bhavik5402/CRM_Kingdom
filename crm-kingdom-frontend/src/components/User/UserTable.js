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
    Chip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Delete, Edit } from "@mui/icons-material";
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

    const handleEdit = (userId) => {
        // Handle edit action
        console.log(`Edit user with id: ${userId}`);
    };

    const handleDelete = (userId) => {
        // Handle delete action
        console.log(`Delete user with id: ${userId}`);
    };


    const centerStyle = {
        textAlign: "center"
    }

    const headrs = {
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: "center"
    }

    return (
        <Paper className="table-container">
            <Box className="filter-container"  sx={{marginTop:"20px"}}>
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
                            <TableCell sx={headrs}>Username</TableCell>
                            <TableCell sx={headrs}>Email</TableCell>
                            <TableCell sx={headrs}>Last Modified</TableCell>
                            <TableCell sx={headrs}>Access</TableCell>
                            <TableCell sx={headrs}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell sx={centerStyle}>{user.username}</TableCell>
                                <TableCell sx={centerStyle}>{user.email}</TableCell>
                                <TableCell sx={centerStyle}>{user.LastModified}</TableCell>
                                <TableCell sx={centerStyle}>
                                    {user.access.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            style={{ margin: '2px' }}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </TableCell>
                                <TableCell sx={centerStyle}>
                                    <Button
                                        color="primary"
                                        variant="text"  // No background, no border
                                        size="small"
                                        sx={{ marginRight: '8px' }}
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        color="secondary"
                                        variant="text"  // No background, no border
                                        size="small"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Delete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UserTable;
