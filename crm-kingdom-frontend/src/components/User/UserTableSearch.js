import { Box, Button, Collapse, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

export const UserTableSearch = (props) => {
    // extract props
    const { filters, handleFilterChange, handleSearch, handleClear } = props;

    // state variables
    const [filterOpen, setFilterOpen] = useState(true);

    return (
        <Box className="filter-container" sx={{ marginTop: "20px" }}>
            <div></div>
            <Collapse in={filterOpen}>
                <Box className="filter-form">
                    <TextField
                        label="First Name"
                        name="firstname"
                        value={filters.firstname}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        className="filter-input"
                    />
                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={filters.lastname}
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
    );
};
