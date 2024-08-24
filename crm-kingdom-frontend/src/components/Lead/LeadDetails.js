import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LeadDetails = ({ data, onEdit, onConfirm }) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Company Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Company Name:</strong> {data.companyName}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Email:</strong> {data.email}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Contact No:</strong> {data.contactNo}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Mobile No:</strong> {data.mobileNo}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Website:</strong> {data.website}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Facebook:</strong> {data.facebook}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>LinkedIn:</strong> {data.linkedin}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Instagram:</strong> {data.instagram}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><strong>Address:</strong> {data.address}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Import Manager Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Contact No:</strong> {data.importManagerContactNo}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Name:</strong> {data.importManagerName}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Whatsapp No:</strong> {data.importManagerWhatsappNo}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Email ID:</strong> {data.importManagerEmailId}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Lead Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Lead By:</strong> {data.leadBy}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Source By:</strong> {data.sourceBy}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Remark</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><strong>Remarks:</strong> {data.remarks}</Typography>
                </AccordionDetails>
            </Accordion>

            <Button variant="contained" color="primary" onClick={onEdit} style={{ marginTop: '20px', marginRight: '10px' }}>
                Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={onConfirm} style={{marginTop: '20px', marginRight: '10px'}} >
                Confirm
            </Button>
        </div>
    );
};

export default LeadDetails;
