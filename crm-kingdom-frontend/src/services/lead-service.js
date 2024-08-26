import { ProtectedEndPoints, UnProtectedEndPoints } from "./api-end-points.ts";
import httpClient from "./base-service";


const addLead = (request) => httpClient.post(ProtectedEndPoints.AddLead, request);
const GetLeadById = (request) => httpClient.post(ProtectedEndPoints.GetLeadById, request); 
const UpdateLead = (request) => httpClient.post(ProtectedEndPoints.UpdateLead, request); 

export default {
    addLead,
    GetLeadById,
    UpdateLead
};
