// Protected API routes
export enum ProtectedEndPoints {
    // users
    GetAllUsers = "users/get-all",
    GetUserById = "users/get",
    CreateUser = "users/create",
    EditUser = "users/update",
    DeleteUser = "users/delete",
}

// Non-protected API routes - Public API routes
export enum UnProtectedEndPoints {
    UserLogin = "login",
}
