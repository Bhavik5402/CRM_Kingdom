import axios from "axios";
import { ProtectedEndPoints } from "services/api-end-points.ts";
import { BASE_API_URL } from "config";
import { openSucessErrorModal } from "utility/helper/common-functions";
import tokenManager from "utility/auth-guards/token-manager";
import { HttpStatusCodes } from "utility/enums/http-status-code.ts";

// Used to intercept the request before api enpoint is hit
axios.interceptors.request.use(
    async (config) => {
        const isExternalUrl = /^(http|https):\/\//i.test(config.url);
        console.log("In intercept", config.url);
        // config.headers["Access-Control-Allow-Origin"] = "*";
        const protectedUrl = Object.values(ProtectedEndPoints).find((url) => url === config.url);
        const isProtectedUrl = protectedUrl ? true : false;
        if (isProtectedUrl) {
            config.headers.Authorization = tokenManager.getToken();
        }
        if (config.url && !isExternalUrl) {
            config.url = BASE_API_URL + config.url;
        }
        const useDetails = tokenManager.getUserDetails();
        if (useDetails && useDetails.encUserName) config.headers.UserName = useDetails?.userId;
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);

// Used to intercept receieved response
axios.interceptors.response.use(
    (response) => {
        if (response.data.statusCode == HttpStatusCodes.Unauthorized) {
            console.log("UNauthorized");
            tokenManager.clearSession(window.location.pathname);
        }

        return response;
    },
    async (error) => {
        if (error.response) {
            return Promise.reject(error.response); // Pass the response to the catch block
        }
        return Promise.reject(error); // For other errors
    }
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    CancelToken: axios.CancelToken,
};
