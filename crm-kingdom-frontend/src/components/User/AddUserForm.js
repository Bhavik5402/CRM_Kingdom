import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormLabel,
} from "@mui/material";
import IntlTelInput from "react-intl-tel-input-18";
import "react-intl-tel-input-18/dist/main.css";
import axios from "axios";
import { UserAccess } from "../../utility/helper/constants"; // Import the UserAccess constant
import "./TableStyles.css";
import { createCommonApiCall } from "utility/helper/create-api-call";
import userService from "services/user-service";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import { useNavigate } from "react-router-dom";
import { AppRoutings } from "utility/enums/app-routings.ts";
import { UserTypes } from "utility/enums/user-types.ts";
import { UserContext } from "Context/UserContext";
import tokenManager from "utility/auth-guards/token-manager";

const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phonenumber: Yup.string().required("Phone Number is required"),
    workdescription: Yup.string().required("Work Description is required"),
});

export const AddUserForm = ({ onSave, onCancel, formTitle, encUserId }) => {
    // context variables
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const contextUser = useContext(UserContext);

    // Local variables
    const navigate = useNavigate();

    // use states
    const [isEditData, setIsEditData] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            workdescription: "",
            access: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const accessData = {};

            Object.keys(UserAccess).forEach((key) => {
                const accessInfo = UserAccess[key];
                accessData[accessInfo.id] = values.access.includes(accessInfo.label);
            });

            const formData = {
                ...values,
                access: accessData,
                usertype: UserTypes.User,
                createdby: contextUser.userid,
            };

            createCommonApiCall({
                requestBody: { user: formData },
                apiService: isEditData ? userService.editUser : userService.createUser,
                showSuccessMessage: true,
                showErrorMessage: true,
                setSuccessErrorContext,
            }).then((data) => {
                if (data && data.isSuccessfull) {
                    navigate(AppRoutings.User);
                }
            });
        },
    });

    // handle events and functions
    const handleGetEditUserData = async () => {
        const userId = tokenManager.doEncryptDecrypt(
            false,
            encUserId.replaceAll("_", "/").replaceAll("-", "+")
        );

        const data = await createCommonApiCall({
            requestBody: { userId: userId },
            apiService: userService.getUserById,
            showSuccessMessage: false,
            showErrorMessage: true,
            setSuccessErrorContext,
        });

        if (data && data.isSuccessfull) {
            formik.setValues(data.data);
        }
    };

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        let newAccess = [...formik.values.access];

        if (newAccess.includes(value)) {
            newAccess = newAccess.filter((access) => access !== value);
        } else {
            newAccess.push(value);
        }

        formik.setFieldValue("access", newAccess);
    };

    // use effect
    useEffect(() => {
        if (encUserId) {
            setIsEditData(true);
            handleGetEditUserData();
        }
    }, []);

    return (
        <Paper className="table-container">
            <div>
                <h2>{formTitle}</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstname"
                            label="First Name"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastname"
                            label="Last Name"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <IntlTelInput
                                placeholder="Enter Phone Number"
                                fieldId="phoneNumber"
                                containerClassName="intl-tel-input"
                                inputClassName={`form-control custom-phone-input ${
                                    formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
                                        ? "error"
                                        : ""
                                }`}
                                onPhoneNumberChange={(isValid, value, countryData) =>
                                    formik.setFieldValue("phonenumber", value)
                                }
                                value={formik.values.phonenumber}
                            />
                        </FormControl>
                        {formik.touched.phonenumber && Boolean(formik.errors.phonenumber) && (
                            <div className="custom-phone-error">{formik.errors.phonenumber}</div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="workDescription"
                            name="workdescription"
                            label="Work Description"
                            multiline
                            rows={4}
                            value={formik.values.workdescription}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.workdescription &&
                                Boolean(formik.errors.workdescription)
                            }
                            helperText={
                                formik.touched.workdescription && formik.errors.workdescription
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">User Access</FormLabel>
                            <FormGroup row>
                                {Object.entries(UserAccess).map(([key, accessInfo]) => (
                                    <FormControlLabel
                                        key={key}
                                        control={
                                            <Checkbox
                                                value={accessInfo.label}
                                                checked={formik.values.access.includes(
                                                    accessInfo.label
                                                )}
                                                onChange={handleCheckboxChange}
                                            />
                                        }
                                        label={accessInfo.label}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                        {/* {formik.touched.access && Boolean(formik.errors.access) && (
                                <div className="custom-checkbox-error">{formik.errors.access}</div>
                            )} */}
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={formik.isSubmitting}
                            sx={{ marginRight: "10px" }}
                        >
                            Save
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={onCancel}
                            disabled={formik.isSubmitting}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};
