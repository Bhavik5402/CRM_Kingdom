import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    FormLabel,
    Box,
} from "@mui/material";
import { ChromePicker } from "react-color";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    sequence: Yup.number().required("Sequence is required"),
    description: Yup.string().required("Description is required"),
    color: Yup.string().required("Color is required"),
});

const AddStageForm = ({ onSave, onCancel, pageTitle, initialValues }) => {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialValues.color);

    const formik = useFormik({
        initialValues: {
            name: initialValues.name || "",
            sequence: initialValues.sequencenumber || "",
            description: initialValues.description || "",
            color: initialValues.color || selectedColor,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            onSave(values);
            setSubmitting(false);
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
                <h2>{pageTitle}</h2>
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
                            type="number"
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
                            <Box display="flex" alignItems="center" mt={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={toggleColorPicker}
                                >
                                    Choose Color
                                </Button>
                                <Box
                                    width={24}
                                    height={24}
                                    bgcolor={selectedColor}
                                    borderRadius="50%"
                                    border="1px solid #ccc"
                                    ml={2}
                                />
                            </Box>
                            {colorPickerVisible && (
                                <ChromePicker
                                    color={selectedColor}
                                    onChange={handleColorChange}
                                    style={{ marginTop: "10px" }}
                                />
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
