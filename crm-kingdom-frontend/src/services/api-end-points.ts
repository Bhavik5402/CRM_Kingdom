// Protected API routes
export enum ProtectedEndPoints {
    GetAllStage = "stage/get-all",
    AddStage = "stage/add",
    DeleteStage = "stage/delete",
    GetStageById = "stage/get",
    UpdateStage = "stage/update"
}

// Non-protected API routes - Public API routes
export enum UnProtectedEndPoints {
    UserLogin = "login"
}
