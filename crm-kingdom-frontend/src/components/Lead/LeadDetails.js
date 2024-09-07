import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Grid,
    Box,
    Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LeadDetails = ({ data, onEdit, onConfirm }) => {
    const sortedHistory = [...data.history].sort((a, b) => b.dateChanged - a.dateChanged);


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

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{
                            width: '100%',
                            maxHeight: 250,
                            overflowY: 'auto',
                            pr: 1,
                            mx: 2
                        }}
                    >

                        {sortedHistory.map((entry, index) => (
                            <React.Fragment key={index}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={6}>
                                        <Typography >
                                            <strong>Username:</strong> {entry.username}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>
                                            <strong>Stage: </strong>
                                            {entry.previouseStage
                                                ? ` ${entry.previouseStage} ` + ' \u21D2 ' + ` ${entry.newState}`
                                                :  entry.newState 
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography >
                                            <strong>Remarks:</strong> {entry.remarks || 'N/A'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Typography >
                                            <strong>Date:</strong> {entry.dateChanged.toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {index < sortedHistory.length - 1 && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default LeadDetails;
