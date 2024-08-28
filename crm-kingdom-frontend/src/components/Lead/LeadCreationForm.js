import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Paper, FormControl, MenuItem, FormHelperText } from "@mui/material";
import './LeadCreationForm.css';

const LeadCreationForm = ({ onSave, onCancel, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            companyname: "",
            email: "",
            phonenumber: "",
            whatsappnumber: "",
            website: "",
            country: "",
            state: "",
            city: "",
            address: "",
            managerusername: "",
            manageremailid: "",
            managerphonenumber: "",
            managerwhatsappnumber: "",
            instagram: "",
            facebook: "",
            linkedin: "",
        },
        validationSchema: Yup.object({
            companyname: Yup.string().required("Company Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            phonenumber: Yup.string().required("Contact No is required"),
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            city: Yup.string().required("City is required"),
            address: Yup.string().required("Address is required"),
            managerusername: Yup.string().required("Import Manager Name is required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            onSave(values);
            setSubmitting(false);
        },
    });

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
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="companyname"
                            value={formik.values.companyname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.companyname && Boolean(formik.errors.companyname)}
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
                            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="WhatsApp No"
                            name="whatsappNo"
                            value={formik.values.whatsappNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.whatsappNo && Boolean(formik.errors.whatsappNo)}
                            helperText={formik.touched.whatsappNo && formik.errors.whatsappNo}
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
                        <FormControl fullWidth>
                            <TextField
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                label="Country"
                                select
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="USA">USA</MenuItem>
                                <MenuItem value="Canada">Canada</MenuItem>
                                <MenuItem value="UK">UK</MenuItem>
                                {/* Add more countries as needed */}
                            </TextField>
                            {formik.touched.country && formik.errors.country && (
                                <FormHelperText error>{formik.errors.country}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
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
                                select
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="USA">USA</MenuItem>
                                <MenuItem value="Canada">Canada</MenuItem>
                                <MenuItem value="UK">UK</MenuItem>
                            </TextField>
                            {formik.touched.country && formik.errors.state && (
                                <FormHelperText error>{formik.errors.state}</FormHelperText>
                            )}
                        </FormControl>
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
                                formik.touched.manageremailid &&
                                formik.errors.manageremailid
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
                            error={
                                formik.touched.instagram && Boolean(formik.errors.instagram)
                            }
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
                            error={
                                formik.touched.facebook && Boolean(formik.errors.facebook)
                            }
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
                            error={
                                formik.touched.linkedin && Boolean(formik.errors.linkedin)
                            }
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
                            error={formik.touched.leadSource && Boolean(formik.errors.leadSource)}
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
                            value={formik.values.remarks}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                            helperText={formik.touched.remarks && formik.errors.remarks}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "40px",marginBottom:"40px" }} className="buttons">
                        <Button color="primary" variant="contained" type="submit" size="large">
                            Save
                        </Button>
                        <Button color="secondary" variant="contained" onClick={onCancel} style={{ marginLeft: "50px" }} size="large">
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default LeadCreationForm;
