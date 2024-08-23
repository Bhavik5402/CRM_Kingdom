import React, { useContext, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TablePagination,
    TableSortLabel,
} from "@mui/material";
import "./TableStyles.css";
import { UserTableSearch } from "./UserTableSearch";
import { UserTableRow } from "./UserTableRow";
import { DefaultPagination, SortOrder } from "utility/enums/filter-pagination-enums.ts";
import { rowsPerPageOptions, centerStyle, headers } from "utility/helper/constants";
import { createCommonApiCall } from "utility/helper/create-api-call";
import userService from "services/user-service";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import tokenManager from "utility/auth-guards/token-manager";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { WarningModal } from "components";

export const UserTable = ({ onAddUser }) => {
    // use context
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);

    // local variables
    const navigate = useNavigate();

    // state variables
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({ firstname: "", lastname: "", email: "" });
    const [page, setPage] = useState(DefaultPagination.Page);
    const [rowsPerPage, setRowsPerPage] = useState(DefaultPagination.PageSize);
    const [sortColumn, setSortColumn] = useState(DefaultPagination.SortColumn);
    const [sortDirection, setSortDirection] = useState(SortOrder.descending);
    const [isFilterSubmit, setIsFilterSubmit] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(0);

    // handle events and functions
    const handleGetUsers = async () => {
        const requestBody = {
            pageSize: rowsPerPage,
            pageIndex: page,
            sortColumn: sortColumn,
            sortDirection: sortDirection,
            filterObj: filters,
        };

        const data = await createCommonApiCall({
            requestBody,
            apiService: userService.getAllUsers,
            setSuccessErrorContext,
            showSuccessMessage: false,
            showErrorMessage: true,
        });

        if (data && data.isSuccessfull) {
            console.log(data.data);
            setUsers(data.data);
        }
    };

    const handleOnChangeSortDirection = (sortColumn) => {
        setPage(DefaultPagination.Page);
        setSortColumn(sortColumn);
        setSortDirection(
            sortDirection == SortOrder.ascending ? SortOrder.descending : SortOrder.ascending
        );
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        setPage(0); // Reset to the first page after filtering
        setIsFilterSubmit(!isFilterSubmit);
    };

    const handleClear = () => {
        setFilters({ firstname: "", lastname: "", email: "" });
        handleSearch();
    };

    const handleEdit = (userId) => {
        console.log(`Edit user with id: ${userId}`);

        // encrypt user id
        let encUserId = tokenManager.doEncryptDecrypt(true, userId);

        // replace any '/' with "_" and "+" with "-" in encUserId
        console.log("before replace encUserId", encUserId);
        encUserId = encUserId.replaceAll("/", "_").replaceAll("+", "-");

        // replace user id in edit user route
        navigate(AppRoutings.EditUser.replace(":encUserId", encUserId));
    };

    const handleDelete = (userId) => {
        console.log(`Delete user with id: ${userId}`);
        handleWarningModalOpen();
        setDeleteUserId(userId);
    };

    const handleDeleteConfirm = async () => {
        if (deleteUserId > 0) {
            const data = await createCommonApiCall({
                requestBody: { user: { userid: deleteUserId } },
                apiService: userService.deleteUser,
                showSuccessMessage: true,
                showErrorMessage: true,
                setSuccessErrorContext,
            });

            if (data && data.isSuccessfull) {
                setDeleteUserId(0);
                await handleGetUsers();
            }
        }
    };

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        await handleGetUsers();
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        await handleGetUsers();
    };

    const handleWarningModalOpen = () => setIsWarningModalOpen(true);

    const handleWarningModalClose = () => setIsWarningModalOpen(false);

    // use effects
    useEffect(() => {
        handleGetUsers();
    }, [page, rowsPerPage, sortColumn, sortDirection, isFilterSubmit]);

    return (
        <>
            <Paper className="table-container">
                <div className="add-user-button">
                    <Button variant="contained" onClick={onAddUser} color="success">
                        Add User
                    </Button>
                </div>
                <UserTableSearch
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    handleSearch={handleSearch}
                    handleClear={handleClear}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headers}>
                                    <TableSortLabel
                                        active={sortColumn === "firstname"}
                                        direction={
                                            sortDirection === SortOrder.ascending ? "asc" : "desc"
                                        }
                                        onClick={() => handleOnChangeSortDirection("firstname")}
                                    >
                                        First Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={headers}>
                                    <TableSortLabel
                                        active={sortColumn === "lastname"}
                                        direction={
                                            sortDirection === SortOrder.ascending ? "asc" : "desc"
                                        }
                                        onClick={() => handleOnChangeSortDirection("lastname")}
                                    >
                                        Last Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={headers}>
                                    <TableSortLabel
                                        active={sortColumn === "email"}
                                        direction={
                                            sortDirection === SortOrder.ascending ? "asc" : "desc"
                                        }
                                        onClick={() => handleOnChangeSortDirection("email")}
                                    >
                                        Email
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={headers}>
                                    <TableSortLabel
                                        active={sortColumn === "createddate"}
                                        direction={
                                            sortDirection === SortOrder.ascending ? "asc" : "desc"
                                        }
                                        onClick={() => handleOnChangeSortDirection("createddate")}
                                    >
                                        Last Modified
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={headers}>Access</TableCell>
                                <TableCell sx={headers}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 &&
                                users.map((user) => (
                                    <UserTableRow
                                        user={user}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                                ))}

                            {users.length == 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} sx={centerStyle}>
                                        No Records Found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={users.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Paper>
            <WarningModal
                isModalOpen={isWarningModalOpen}
                handleOnClickCloseModal={handleWarningModalClose}
                title="Confirmation"
                warningMessage="Are you sure you want to delete this user?"
                okButtonText="Delete"
                closeButtonText="Cancel"
                handleOnClickOk={handleDeleteConfirm}
            />
        </>
    );
};
