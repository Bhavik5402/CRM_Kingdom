// Protected API routes
export enum ProtectedEndPoints {

    // users
    GetAllUsers = "users/get-all",
    GetUserById = "users/get",
    CreateUser = "users/create",
    EditUser = "users/update",
    DeleteUser = "users/delete",

    GetAllStage = "stage/get-all",
    AddStage = "stage/add",
    DeleteStage = "stage/delete",
    GetStageById = "stage/get",
    UpdateStage = "stage/update",

    AddLead = "leads/create",
    UpdateLead = "leads/update",
    GetLeadById = "leads/get"

}

// Non-protected API routes - Public API routes
export enum UnProtectedEndPoints {
    UserLogin = "login",
    UserResetPassword = "reset-password",
    UserForgotPassword = "forgot-password"
}
