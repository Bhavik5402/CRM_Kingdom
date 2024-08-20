import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const LeadCreationForm = ({ onSave, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            companyName: "",
            email: "",
            contactNo: "",
            whatsappNo: "",
            website: "",
            country: "",
            state: "",
            city: "",
            address: "",
            importManagerName: "",
            importManagerEmail: "",
            importManagerContactNo: "",
            importManagerWhatsappNo: "",
            instagramLink: "",
            facebookLink: "",
            linkedinLink: "",
            leadSource: "",
            remarks: "",
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required("Company Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            contactNo: Yup.string().required("Contact No is required"),
            whatsappNo: Yup.string(),
            website: Yup.string().url("Invalid URL"),
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            city: Yup.string().required("City is required"),
            address: Yup.string().required("Address is required"),
            importManagerName: Yup.string().required("Import Manager Name is required"),
            importManagerEmail: Yup.string().email("Invalid email address"),
            importManagerContactNo: Yup.string(),
            importManagerWhatsappNo: Yup.string(),
            instagramLink: Yup.string().url("Invalid URL"),
            facebookLink: Yup.string().url("Invalid URL"),
            linkedinLink: Yup.string().url("Invalid URL"),
            leadSource: Yup.string(),
            remarks: Yup.string(),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            onSave(values);
            setSubmitting(false);
            resetForm();
        },
    });


    const inputSize = {
        style: {
            // height: "50px"
            fontSize: "15px",
            margin: "0px 0px 20px 0px"
        }
    }

    return (
        <Paper className="table-container">
            <div>
                <h2>Add Stage</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="companyName"
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
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
                            name="contactNo"
                            value={formik.values.contactNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                            helperText={formik.touched.contactNo && formik.errors.contactNo}
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
                            name="importManagerName"
                            value={formik.values.importManagerName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.importManagerName && Boolean(formik.errors.importManagerName)}
                            helperText={formik.touched.importManagerName && formik.errors.importManagerName}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Import Manager Email"
                            name="importManagerEmail"
                            value={formik.values.importManagerEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.importManagerEmail && Boolean(formik.errors.importManagerEmail)}
                            helperText={formik.touched.importManagerEmail && formik.errors.importManagerEmail}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Import Manager Contact No"
                            name="importManagerContactNo"
                            value={formik.values.importManagerContactNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.importManagerContactNo && Boolean(formik.errors.importManagerContactNo)}
                            helperText={formik.touched.importManagerContactNo && formik.errors.importManagerContactNo}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Import Manager WhatsApp No"
                            name="importManagerWhatsappNo"
                            value={formik.values.importManagerWhatsappNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.importManagerWhatsappNo && Boolean(formik.errors.importManagerWhatsappNo)}
                            helperText={formik.touched.importManagerWhatsappNo && formik.errors.importManagerWhatsappNo}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Instagram Link"
                            name="instagramLink"
                            value={formik.values.instagramLink}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.instagramLink && Boolean(formik.errors.instagramLink)}
                            helperText={formik.touched.instagramLink && formik.errors.instagramLink}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Facebook Link"
                            name="facebookLink"
                            value={formik.values.facebookLink}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.facebookLink && Boolean(formik.errors.facebookLink)}
                            helperText={formik.touched.facebookLink && formik.errors.facebookLink}
                            InputProps={inputSize}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="LinkedIn Link"
                            name="linkedinLink"
                            value={formik.values.linkedinLink}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.linkedinLink && Boolean(formik.errors.linkedinLink)}
                            helperText={formik.touched.linkedinLink && formik.errors.linkedinLink}
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
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit">
                            Save
                        </Button>
                        <Button color="secondary" variant="outlined" onClick={onCancel} style={{ marginLeft: "10px" }}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Paper>
    );
};

export default LeadCreationForm;
