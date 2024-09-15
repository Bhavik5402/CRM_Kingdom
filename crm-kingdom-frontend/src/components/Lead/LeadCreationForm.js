import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import "./LeadCreationForm.css";
import leadService from "services/lead-service";
import { createCommonApiCall } from "utility/helper/create-api-call";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";

const API_KEY = "ckZjZFVaN3EzZGVEWUlCYzBETlRBVTVYMzdza1NJY29hZkdLTWtSOA=="; // Replace with your actual API key

const LeadCreationForm = ({ onSave, onCancel, initialValues }) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);

    // Define fetchStates and fetchCities functions
    const fetchStates = async (countryId) => {
        try {
            const response = await createCommonApiCall({
                requestBody: { countryid: countryId },
                apiService: leadService.GetAllStates, // Your custom API method
                setSuccessErrorContext,
                showPopup: false,
            });
            if (response && response.isSuccessfull) {
                setStates(response.data);
                if (initialValues && initialValues.stateid) {
                    fetchCities(initialValues.stateid);
                }
            } else {
                console.error("Error fetching states", response.message);
            }
        } catch (error) {
            console.error("Error fetching states", error);
        }
    };

    const fetchCities = async (stateId) => {
        try {
            const response = await createCommonApiCall({
                requestBody: { stateid: stateId },
                apiService: leadService.GetAllCities, // Your custom API method
                setSuccessErrorContext,
                showPopup: false,
            });
            if (response && response.isSuccessfull) {
                setCities(response.data);
            } else {
                console.error("Error fetching cities", response.message);
            }
        } catch (error) {
            console.error("Error fetching cities", error);
        }
    };

    const formik = useFormik({
        initialValues: initialValues || {
            companyname: "",
            email: "",
            phonenumber: "",
            whatsappnumber: "",
            website: "",
            countryid: "",
            stateid: "",
            cityid: "",
            address: "",
            managerusername: "",
            manageremailid: "",
            managerphonenumber: "",
            managerwhatsappnumber: "",
            instagram: "",
            facebook: "",
            linkedin: "",
            country: "",
            state: "",
            city: "",
        },
        validationSchema: Yup.object({
            companyname: Yup.string().required("Company Name is required"),
            website: Yup.string().required("website is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            phonenumber: Yup.string()
                .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
                .required("Contact No is required"),
            // countryid: Yup.string().required("Country is required"),
            country: Yup.string().required("Country is required"),
            // stateid: Yup.string().required("State is required"),
            state: Yup.string().required("State is required"),
            // cityid: Yup.string().required("City is required"),
            city: Yup.string().required("City is required"),
            address: Yup.string().required("Address is required"),
            managerusername: Yup.string().required("Import Manager Name is required"),
            manageremailid: Yup.string()
                .email("Invalid email address")
                .required("Import Manager Email is required"),
            whatsappnumber: Yup.string()
                .notRequired()
                .matches(/^\d{7,15}$/, "WhatsApp number must be between 7 and 15 digits"),
            managerwhatsappnumber: Yup.string()
                .notRequired()
                .matches(/^\d{7,15}$/, "WhatsApp number must be between 7 and 15 digits"),
            managerphonenumber: Yup.string()
                .notRequired()
                .matches(/^\d{7,15}$/, "phone number must be between 7 and 15 digits"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            const countryObj = countries.find((country) => country.iso2 === values.countryid);
            const stateObj = states.find((state) => state.iso2 === values.stateid);
            const cityObj = cities.find((city) => city.name === values.cityid);

            const transformedValues = {
                ...values,
                countryid: countryObj ? countryObj.id : values.countryid,
                stateid: stateObj ? stateObj.id : values.stateid,
                cityid: cityObj ? cityObj.id : values.cityid,
            };

            console.log("Transformed Values - ", transformedValues);
            onSave(transformedValues);
            setSubmitting(false);
        },
    });

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await createCommonApiCall({
                    requestBody: {},
                    apiService: leadService.GetAllCountries, // Your custom API to get all countries
                    setSuccessErrorContext,
                    showPopup: false,
                });
                if (response && response.isSuccessfull) {
                    setCountries(response.data);
                    if (initialValues && initialValues.countryid) {
                        fetchStates(initialValues.countryid);
                    }
                    setLoading(false);
                } else {
                    console.error("Error fetching countries", response.message);
                }
            } catch (error) {
                console.error("Error fetching countries", error);
            }
        };

        fetchCountries();
    }, [initialValues]);

    const handleCountryChange = async (event) => {
        const countryId = event.target.value;
        formik.setFieldValue("countryid", countryId);
        formik.setFieldValue("stateid", "");
        formik.setFieldValue("cityid", "");
        setStates([]);
        setCities([]);

        if (countryId) {
            fetchStates(countryId);
        }
    };

    const handleStateChange = async (event) => {
        const stateId = event.target.value;
        formik.setFieldValue("stateid", stateId);
        formik.setFieldValue("cityid", "");
        setCities([]);

        if (stateId) {
            fetchCities(stateId);
        }
    };

    const inputSize = {
        style: {
            fontSize: "15px",
            margin: "0px 0px 20px 0px",
        },
    };

    return (
        <Paper className="table-container">
            <div>
                <h2>{initialValues ? "Edit Lead" : "Add Lead"}</h2>
            </div>
            <div className="custom-form">
                <form onSubmit={formik.handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                name="companyname"
                                value={formik.values.companyname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.companyname && Boolean(formik.errors.companyname)
                                }
                                helperText={formik.touched.companyname && formik.errors.companyname}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Contact No"
                                name="phonenumber"
                                value={formik.values.phonenumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
                                }
                                helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="WhatsApp No"
                                name="whatsappnumber"
                                value={formik.values.whatsappnumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.whatsappnumber &&
                                    Boolean(formik.errors.whatsappnumber)
                                }
                                helperText={
                                    formik.touched.whatsappnumber && formik.errors.whatsappnumber
                                }
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                value={formik.values.website}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.website && Boolean(formik.errors.website)}
                                helperText={formik.touched.website && formik.errors.website}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                InputProps={inputSize}
                            />
                        </Grid>

                        {/* <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                name="countryid"
                                value={formik.values.countryid}
                                onChange={handleCountryChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.countryid && Boolean(formik.errors.countryid)}
                                label="Country"
                                select
                                disabled={loading}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {countries.map((country) => (
                                    <MenuItem key={country.countryid} value={country.countryid}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {formik.touched.countryid && formik.errors.countryid && (
                                <FormHelperText error>{formik.errors.countryid}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                name="stateid"
                                value={formik.values.stateid}
                                onChange={handleStateChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.stateid && Boolean(formik.errors.stateid)}
                                label="State"
                                select
                                disabled={loading || !states.length}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {states.map((state) => (
                                    <MenuItem key={state.stateid} value={state.stateid}>
                                        {state.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {formik.touched.stateid && formik.errors.stateid && (
                                <FormHelperText error>{formik.errors.stateid}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="City"
                            name="cityid"
                            value={formik.values.cityid}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cityid && Boolean(formik.errors.cityid)}
                            helperText={formik.touched.cityid && formik.errors.cityid}
                            InputProps={inputSize}
                            select
                            disabled={loading || !cities.length}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {cities.map((city) => (
                                <MenuItem key={city.cityid} value={city.cityid}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid> */}

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                multiline
                                rows={4}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Import Manager Name"
                                name="managerusername"
                                value={formik.values.managerusername}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.managerusername &&
                                    Boolean(formik.errors.managerusername)
                                }
                                helperText={
                                    formik.touched.managerusername && formik.errors.managerusername
                                }
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Import Manager Email"
                                name="manageremailid"
                                value={formik.values.manageremailid}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.manageremailid &&
                                    Boolean(formik.errors.manageremailid)
                                }
                                helperText={
                                    formik.touched.manageremailid && formik.errors.manageremailid
                                }
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Import Manager Contact No"
                                name="managerphonenumber"
                                value={formik.values.managerphonenumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.managerphonenumber &&
                                    Boolean(formik.errors.managerphonenumber)
                                }
                                helperText={
                                    formik.touched.managerphonenumber &&
                                    formik.errors.managerphonenumber
                                }
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Import Manager WhatsApp No"
                                name="managerwhatsappnumber"
                                value={formik.values.managerwhatsappnumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.managerwhatsappnumber &&
                                    Boolean(formik.errors.managerwhatsappnumber)
                                }
                                helperText={
                                    formik.touched.managerwhatsappnumber &&
                                    formik.errors.managerwhatsappnumber
                                }
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Instagram Link"
                                name="instagram"
                                value={formik.values.instagram}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                                helperText={formik.touched.instagram && formik.errors.instagram}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Facebook Link"
                                name="facebook"
                                value={formik.values.facebook}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                                helperText={formik.touched.facebook && formik.errors.facebook}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="LinkedIn Link"
                                name="linkedin"
                                value={formik.values.linkedin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                                helperText={formik.touched.linkedin && formik.errors.linkedin}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lead Source"
                                name="leadSource"
                                value={formik.values.leadSource}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.leadSource && Boolean(formik.errors.leadSource)
                                }
                                helperText={formik.touched.leadSource && formik.errors.leadSource}
                                InputProps={inputSize}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Remarks"
                                name="remarks"
                                multiline
                                rows={4}
                                value={formik.values.remark}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                                helperText={formik.touched.remarks && formik.errors.remarks}
                                InputProps={inputSize}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            style={{ marginTop: "40px", marginBottom: "40px" }}
                            className="buttons"
                        >
                            <Button color="primary" variant="contained" type="submit" size="large">
                                Save
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={onCancel}
                                style={{ marginLeft: "50px" }}
                                size="large"
                            >
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Paper>
    );
};

export default LeadCreationForm;
