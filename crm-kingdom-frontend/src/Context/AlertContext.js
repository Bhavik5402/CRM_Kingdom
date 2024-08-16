import React, { useState } from "react";

const SuccessErrorModalContext = React.createContext();
const SuccessErrorModalDispatchContext = React.createContext();

function SuccessErrorModalProvider({ children }) {
	const [errorSuccessDetails, setErrorSuccessDetails] = useState({
		isSuccessErrorOpen: false,
		title: "",
		message: "",
		isSuccess: true,
		handleOnClickOk: undefined,
	});
	return (
		<SuccessErrorModalContext.Provider value={errorSuccessDetails}>
			<SuccessErrorModalDispatchContext.Provider value={setErrorSuccessDetails}>
				{children}
			</SuccessErrorModalDispatchContext.Provider>
		</SuccessErrorModalContext.Provider>
	);
}

export {
	SuccessErrorModalProvider,
	SuccessErrorModalContext,
	SuccessErrorModalDispatchContext,
};
