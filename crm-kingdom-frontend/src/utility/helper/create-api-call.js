import { HttpStatusCodes } from "utility/enums/http-status-code.ts";
import { hideLoader, openSucessErrorModal, showLoader } from "./common-functions";

export const createCommonApiCall = async (args) => {
    const {
        requestBody,
        apiService,
        setSuccessErrorContext,
        showPopup
    } = args;
    try {
        showLoader();
        const response = requestBody ? await apiService(requestBody) : apiService();

        if (response && response.status !== HttpStatusCodes.Unauthorized) {
            const { data } = response;
            hideLoader();
            if (data && data.isSuccessfull) {
                if (showPopup)
                    openSucessErrorModal(setSuccessErrorContext, "Success", data.message, true);
                return data;
            } else {
                if (showPopup)
                    openSucessErrorModal(setSuccessErrorContext, "Error", data.message, false);
            }
        }
    } catch (error) {
      hideLoader();
      if (error.status === HttpStatusCodes.NotFound) {
          openSucessErrorModal(setSuccessErrorContext, "Error", error.data?.message || "Not Found", false);
      } else {
          openSucessErrorModal(setSuccessErrorContext, "Error", "An unexpected error occurred", false);
      }
        console.log("Error occured in api call: ", error);
    } finally {
        hideLoader();
    }
};

