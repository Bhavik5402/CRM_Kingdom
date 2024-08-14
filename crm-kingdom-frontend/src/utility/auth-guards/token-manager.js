import Cookies from "js-cookie";
import { ENVIRONMENT } from "config";
import { Constants } from "utility/helper/constants";
import { AppRoutings } from "utility/enums/app-routings.ts";

const clearCookiesAndLocalStorage = () => {
    Cookies.remove(ENVIRONMENT + Constants.AppTokenKey);
    Cookies.remove(ENVIRONMENT + Constants.UserDetails);
};

const clearSession = (returnUrl) => {
    clearCookiesAndLocalStorage();
    if (window) {
        const url = returnUrl ? `${AppRoutings.Root}?back=${returnUrl}` : AppRoutings.Root;
        window.location.replace(url);
    }
};

const doEncryptDecrypt = (isEncrypt, data) => {
    if (data) {
        const CryptoJS = require("crypto-js");
        if (isEncrypt === true) {
            // Encrypt
            const ciphertext = CryptoJS.AES.encrypt(
                JSON.stringify(data),
                Constants.LocalAppEncryptkey
            ).toString();
            return ciphertext;
        }
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(data, Constants.LocalAppEncryptkey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }
    return "";
};

const getToken = () => {
    const encryptToken = Cookies.get(ENVIRONMENT + Constants.AppTokenKey);
    const token = doEncryptDecrypt(false, encryptToken);
    const sessionToken = token?.slice(1, -1);
    if (sessionToken) return sessionToken;
    else {
        clearCookiesAndLocalStorage();
        return undefined;
    }
};

const setAuthorization = (dtySecret, jwtToken, userDetails, menuPermissions) => {
    Cookies.set(ENVIRONMENT + Constants.AppTokenKey, doEncryptDecrypt(true, "bearer " + jwtToken), {
        expires: 30,
    });
    Cookies.set(ENVIRONMENT + Constants.UserDetails, doEncryptDecrypt(true, userDetails), {
        expires: 30,
    });
};
const getUserDetails = () => {
    const userDetailString = doEncryptDecrypt(
        false,
        Cookies.get(ENVIRONMENT + Constants.UserDetails)
    );
    if (userDetailString) {
        const userDetails = JSON.parse(JSON.parse(userDetailString ? userDetailString : ""));
        userDetails.menuPermissions = "";
        return userDetails;
    } else return undefined;
};

export default {
    clearCookiesAndLocalStorage,
    clearSession,
    setAuthorization,
    getToken,
    getUserDetails,
};
