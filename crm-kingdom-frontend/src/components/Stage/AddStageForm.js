import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    FormLabel,
} from "@mui/material";
import { ChromePicker } from "react-color";
import "./StageTableStyle.css";


const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    sequence: Yup.string().required("Sequence is required"),
    description: Yup.string().required("Description is required"),
    color: Yup.string().required("Color is required"),
});

const AddStageForm = ({ onSave, onCancel }) => {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#fff");

    const formik = useFormik({
        initialValues: {
            name: "",
            sequence: "",
            description: "",
            color: selectedColor,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            // Handle form submission
            console.log("Form Data - ", values);
            onSave(values);
            setSubmitting(false);
            resetForm();
        },
    });

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
        formik.setFieldValue("color", color.hex);
    };

    const toggleColorPicker = () => {
        setColorPickerVisible(!colorPickerVisible);
    };

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
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="sequence"
                            name="sequence"
                            label="Sequence"
                            value={formik.values.sequence}
                            onChange={formik.handleChange}
                            error={formik.touched.sequence && Boolean(formik.errors.sequence)}
                            helperText={formik.touched.sequence && formik.errors.sequence}
                            InputProps={{
                                endAdornment: (
                                    <div
                                        style={{
                                            backgroundColor: formik.values.color,
                                            width: 20,
                                            height: 20,
                                            borderRadius: "50%",
                                        }}
                                    />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Color</FormLabel>
                            <Button variant="contained" color="primary" onClick={toggleColorPicker}>
                                Choose Color
                            </Button>
                            {colorPickerVisible && (
                                <ChromePicker
                                    color={selectedColor}
                                    onChange={handleColorChange}
                                    style={{ marginTop: "10px" }}
                                />
                            )}
                            {formik.touched.color && Boolean(formik.errors.color) && (
                                <div className="custom-error">{formik.errors.color}</div>
                            )}
                        </FormControl>
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

export default AddStageForm;