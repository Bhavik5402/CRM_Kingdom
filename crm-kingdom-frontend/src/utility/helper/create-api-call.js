import { HttpStatusCodes } from "utility/enums/http-status-code.ts";
import { hideLoader, openSucessErrorModal, showLoader } from "./common-functions";

export const createCommonApiCall = async (args) => {
  const { requestBody, apiService, setSuccessErrorContext } = args;
  try {
    showLoader();
    const response = requestBody ? await apiService(requestBody) : apiService();
    console.log("Response ->>>> ",response )
    
    if (response && response.status !== HttpStatusCodes.Unauthorized) {
      const { data } = response;
      hideLoader();
      if (data && data.isSuccessfull) {
        openSucessErrorModal(
					setSuccessErrorContext,
					"Success",
					data.message,
					true
				);
        return data;
      } else {
        console.log("In else")
        openSucessErrorModal(
					setSuccessErrorContext,
					"Error",
					data.message,
					false
				);
      }
    }
  } catch (ex) {
    console.log("Error occured in api call: ", ex);
  } finally {
    hideLoader();
  }
};
