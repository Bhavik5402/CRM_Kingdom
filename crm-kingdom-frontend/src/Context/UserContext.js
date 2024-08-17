import React, { useState } from "react";
import tokenManager from "utility/auth-guards/token-manager";
const UserContext = React.createContext();
const UserDispatchContext = React.createContext();

function UserProvider({ children }) {
	const user = tokenManager.getUserDetails();
	const [userDetails, setUserDetails] = useState(user);
	return (
		<UserContext.Provider value={userDetails}>
			<UserDispatchContext.Provider value={setUserDetails}>
				{children}
			</UserDispatchContext.Provider>
		</UserContext.Provider>
	);
}

export { UserProvider, UserContext, UserDispatchContext };
