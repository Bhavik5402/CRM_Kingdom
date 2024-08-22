import { ProtectedEndPoints, UnProtectedEndPoints } from "./api-end-points.ts";
import httpClient from "./base-service";

const getAllStages = (request) => httpClient.post(ProtectedEndPoints.GetAllStage, request);
const addStage = (request) => httpClient.post(ProtectedEndPoints.AddStage, request);
const deleteStage = (request) => httpClient.post(ProtectedEndPoints.DeleteStage, request);
const getStageById = (request) => httpClient.post(ProtectedEndPoints.GetStageById, request); 
const updateStage = (request) => httpClient.post(ProtectedEndPoints.UpdateStage, request); 

export default {
    getAllStages,
    addStage,
    deleteStage,
    getStageById,
    updateStage
};
