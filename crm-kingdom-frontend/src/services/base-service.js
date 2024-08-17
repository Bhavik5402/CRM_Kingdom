import axios from "axios";
import { ProtectedEndPoints } from "services/api-end-points.ts";
import { BASE_API_URL } from "config";
import { openSucessErrorModal } from "utility/helper/common-functions";
import tokenManager from "utility/auth-guards/token-manager";

// Used to intercept the request before api enpoint is hit
axios.interceptors.request.use(
    async (config) => {
        // config.headers["Access-Control-Allow-Origin"] = "*";
        const protectedUrl = Object.values(ProtectedEndPoints).find((url) => url === config.url);
        const isProtectedUrl = protectedUrl ? true : false;
		if (isProtectedUrl) {
			config.headers.Authorization = tokenManager.getToken();
		}
		if (config.url) {
			config.url = BASE_API_URL + config.url;
		}
		const useDetails = tokenManager.getUserDetails();
		if (useDetails && useDetails.encUserName)
			config.headers.UserName = useDetails?.userId;
		return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Used to intercept receieved response
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("API call error : ", error);
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
