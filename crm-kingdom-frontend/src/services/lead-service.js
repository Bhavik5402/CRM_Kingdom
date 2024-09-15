import { ProtectedEndPoints, UnProtectedEndPoints } from "./api-end-points.ts";
import httpClient from "./base-service";


const addLead = (request) => httpClient.post(ProtectedEndPoints.AddLead, request);
const GetLeadById = (request) => httpClient.post(ProtectedEndPoints.GetLeadById, request); 
const UpdateLead = (request) => httpClient.post(ProtectedEndPoints.UpdateLead, request); 
const GetAllLeads = (request) => httpClient.post(ProtectedEndPoints.GetAllLeads, request); 
const GetAllCountries = (request) => httpClient.post(ProtectedEndPoints.GetAllContries, request); 
const GetAllStates = (request) => httpClient.post(ProtectedEndPoints.GetStatesByCountry, request); 
const GetAllCities = (request) => httpClient.post(ProtectedEndPoints.GetCitiesByState, request); 
const ChangeStage = (request) => httpClient.post(ProtectedEndPoints.ChangeStage, request); 
const DeleteLead = (request) => httpClient.post(ProtectedEndPoints.DeleteLead, request); 
const UploadExcelSheet = (request, config) => httpClient.post(ProtectedEndPoints.UploadExcel, request, config); 

export default {
    addLead,
    GetLeadById,
    UpdateLead,
    GetAllLeads,
    GetAllCountries,
    GetAllCities,
    GetAllStates,
    ChangeStage,
    DeleteLead,
    UploadExcelSheet
};
