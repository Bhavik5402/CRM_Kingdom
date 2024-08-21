import { TableCell, TableRow, Button, Chip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import { centerStyle } from "utility/helper/constants";

export const UserTableRow = (props) => {
    // extract props
    const { user, handleEdit, handleDelete } = props;

    return (
        <TableRow key={user.id}>
            <TableCell sx={centerStyle}>{user.firstname}</TableCell>
            <TableCell sx={centerStyle}>{user.lastname}</TableCell>
            <TableCell sx={centerStyle}>{user.email}</TableCell>
            <TableCell sx={centerStyle}>
                {new Date(user.createddate).toLocaleString()}
            </TableCell>
            <TableCell sx={centerStyle}>
                {user.access.map((item, index) => (
                    <Chip
                        key={index}
                        label={item}
                        style={{ margin: "2px" }}
                        color="primary"
                        variant="outlined"
                    />
                ))}
            </TableCell>
            <TableCell sx={centerStyle}>
                <Button
                    color="primary"
                    variant="text"
                    size="small"
                    sx={{ marginRight: "8px" }}
                    onClick={() => handleEdit(user.userid)}
                >
                    <Edit />
                </Button>
                <Button
                    color="secondary"
                    variant="text"
                    size="small"
                    onClick={() => handleDelete(user.userid)}
                >
                    <Delete />
                </Button>
            </TableCell>
        </TableRow>
    );
};
