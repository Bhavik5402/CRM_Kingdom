import { showLoader, hideLoader } from "utility/helper";
import { HttpStatusCodes } from "utility/enums/http-status-code.ts";

export const createCommonApiCall = async (args) => {
  const { requestBody, apiService } = args;
  try {
    const response = requestBody ? await apiService(requestBody) : apiService();
    if (response && response.status !== HttpStatusCodes.Unauthorized) {
      const { data } = response;
      if (data && data.isSuccessfull) {
        return data;
      } else {
        console.log("Something went wrong");
      }
    }
  } catch (ex) {
    console.log("Error occured in api call: ", ex);
  } finally {
  }
};
