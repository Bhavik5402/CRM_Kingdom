import { ProtectedEndPoints } from "./api-end-points.ts";
import httpClient from "./base-service";

const getAllUsers = (request) => httpClient.post(ProtectedEndPoints.GetAllUsers, request);

const getUserById = (request) => httpClient.post(ProtectedEndPoints.GetUserById, request);

const createUser = (request) => httpClient.post(ProtectedEndPoints.CreateUser, request);

const editUser = (request) => httpClient.post(ProtectedEndPoints.EditUser, request);

const deleteUser = (request) => httpClient.post(ProtectedEndPoints.DeleteUser, request);

const getUsersByLeadId = (request) => httpClient.post(ProtectedEndPoints.GetUsersByLeadId, request);

export default {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUsersByLeadId
};
