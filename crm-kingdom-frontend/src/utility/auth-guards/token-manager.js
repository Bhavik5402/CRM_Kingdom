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
            ).toString(CryptoJS.format.Base64);
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

const setAuthorization = (jwtToken, userDetails, menuDetails) => {
    Cookies.set(ENVIRONMENT + Constants.AppTokenKey, doEncryptDecrypt(true, "bearer " + jwtToken), {
        expires: 1 / 24,
    });
    Cookies.set(ENVIRONMENT + Constants.UserDetails, doEncryptDecrypt(true, userDetails), {
        expires: 1 / 24,
    });
    Cookies.set(ENVIRONMENT + Constants.MenuDetails, doEncryptDecrypt(true, menuDetails), {
        expires: 1 / 24,
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

const getMenuDetails = () => {
    const menuDetailString = doEncryptDecrypt(
        false,
        Cookies.get(ENVIRONMENT + Constants.MenuDetails)
    );
    if (menuDetailString) {
        const menuDetails = JSON.parse(JSON.parse(menuDetailString ? menuDetailString : ""));
        return menuDetails;
    } else return undefined;
};

export default {
    clearCookiesAndLocalStorage,
    clearSession,
    setAuthorization,
    getToken,
    getUserDetails,
    doEncryptDecrypt,
    getMenuDetails,
};
