export const openSucessErrorModal = (
	setSuccessErrorContext,
	title,
	message,
	isSuccess,
	handleOnClickOk
) => {
    console.log("Something went wrong")
	setSuccessErrorContext({
		isSuccessErrorOpen: true,
		title,
		message,
		isSuccess,
		handleOnClickOk,
	});
};

const loaderDiv =
	typeof window !== "undefined" && document.getElementById("loader");

export const showLoader = () => {
	if (loaderDiv) {
		loaderDiv.style.opacity = "1";
		loaderDiv.style.visibility = "visible";
	}
};

export const hideLoader = () => {
	if (loaderDiv) {
		loaderDiv.style.opacity = "0";
		loaderDiv.style.visibility = "hidden";
	}
};