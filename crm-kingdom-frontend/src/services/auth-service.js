import { UnProtectedEndPoints } from "./api-end-points.ts";
import httpClient from "./base-service";

const userLogin = (request) => httpClient.post(UnProtectedEndPoints.UserLogin, request);

export default {
    userLogin,
};
