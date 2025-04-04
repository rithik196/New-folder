import React from "react";
import {  Typography, TextField, Select, MenuItem, Box, FormControl, FormLabel, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const BasicDetails = () => {
    var lay = { xs: 12, md: 4 };

    return (
        <Box className="details-container">
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" >Ordering Customer Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography className="header"></Typography>
                    <Grid container spacing={1} mt={2}>
                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Customer ID</FormLabel>
                                <TextField
                                    variant="standard" 
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Ordering Customer Name</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Charges Account Number</FormLabel>
                                <Select size="small">
                                    <MenuItem value="">Select</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Customer Ref No</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Address Line1</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Address Line2</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Address Line3</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Country</FormLabel>
                                <TextField
                                    variant="standard" 
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Email ID</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Contact Number</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true 
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>Remitter LEI</FormLabel>
                                <TextField
                                    variant="standard" 
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>LEI Expiry Date</FormLabel>
                                <TextField
                                    variant="standard"  
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>State</FormLabel>
                                <Select size="small">
                                    <MenuItem value="">Select</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>GSTIN Number</FormLabel>
                                <Select size="small">
                                    <MenuItem value="">Select</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={lay}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel sx={{ alignSelf: 'start' }}>IE Code</FormLabel>
                                <TextField
                                    variant="standard" 
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true  
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Typography className="footer-note">
                        <InfoOutlinedIcon sx={{ color: "gray", fontSize: "18px", mr: 1 }} />The transaction will be processed without GST invoice generation. Kindly contact the branch in case GST no. is to be changed/updated.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default BasicDetails;