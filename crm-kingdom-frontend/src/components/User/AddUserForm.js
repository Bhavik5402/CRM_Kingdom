import React from "react";
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

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    workDescription: Yup.string().required("Work Description is required"),
});

const AddUserForm = ({ onSave, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            workDescription: "",
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
            };

            console.log("Form Data - ",formData);
        },
    });

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

    return (
        <Paper className="table-container">
            <div>
                <h2>Add User</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
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
                                    formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                                        ? "error"
                                        : ""
                                }`}
                                onPhoneNumberChange={(isValid, value, countryData) =>
                                    formik.setFieldValue("phoneNumber", value)
                                }
                            />
                        </FormControl>
                        {formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber) && (
                            <div className="custom-phone-error">{formik.errors.phoneNumber}</div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="workDescription"
                            name="workDescription"
                            label="Work Description"
                            multiline
                            rows={4}
                            value={formik.values.workDescription}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.workDescription &&
                                Boolean(formik.errors.workDescription)
                            }
                            helperText={
                                formik.touched.workDescription && formik.errors.workDescription
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
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={formik.isSubmitting}
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

export default AddUserForm;
