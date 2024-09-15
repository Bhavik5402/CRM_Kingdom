// Protected API routes
export enum ProtectedEndPoints {

    // users
    GetAllUsers = "users/get-all",
    GetUserById = "users/get",
    CreateUser = "users/create",
    EditUser = "users/update",
    DeleteUser = "users/delete",
    GetUsersByLeadId = "users/get/lead-users",

    GetAllStage = "stage/get-all",
    AddStage = "stage/add",
    DeleteStage = "stage/delete",
    GetStageById = "stage/get",
    UpdateStage = "stage/update",
    GetAllStagesByUserId = "stage/get/user-stages",

    AddLead = "leads/create",
    UpdateLead = "leads/update",
    GetLeadById = "leads/get",
    GetAllLeads = "leads/get-all",
    GetAllContries = "leads/country/list",
    GetStatesByCountry = "leads/states/list",
    GetCitiesByState = "leads/city/list",
    ChangeStage = "leads/change-stage",
    DeleteLead = "leads/delete",
    UploadExcel = "upload"

}

// Non-protected API routes - Public API routes
export enum UnProtectedEndPoints {
    UserLogin = "login",
    UserResetPassword = "reset-password",
    UserForgotPassword = "forgot-password"
}
