import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { TextField, Select, MenuItem, FormControl, FormLabel } from "@mui/material";
import RemittanceAccountDetails from "./RemittanceAccountDetails";
import { useSelector, useDispatch } from "react-redux";
import { updateTabData } from "../FormSlice";

const TransactionDetails = () => {
  const dispatch = useDispatch();

  const reduxData = useSelector((state) => state.form.formData.transactionDetails);
  const [formState, setFormState] = useState(reduxData || {});

  useEffect(() => {
    dispatch(updateTabData({ tabKey: "transactionDetails", data: formState }));
  }, [formState]);

  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Accordion 1: Transaction Details */}
      <Accordion defaultExpanded sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Transaction Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3} mt={1}>
            {/* Remittance In */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel>Remittance In</FormLabel>
                <Select
                  size="small"
                  fullWidth
                  value={formState.RemitIn || ''}
                  onChange={(e) => handleChange('RemitIn', e.target.value)}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="option1">option1</MenuItem>
                  {/* Add other options as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* CCY */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel>CCY</FormLabel>
                <Select
                  size="small"
                  fullWidth
                  value={formState.CCY || ''}
                  onChange={(e) => handleChange('CCY', e.target.value)}
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add other currency options as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Remittance Amount (Indicative) */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel>Remittance Amount (Indicative)</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.remittanceAmount || ''}
                  onChange={(e) => handleChange('remittanceAmount', e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Accordion 2: Remittance Details */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Remittance Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RemittanceAccountDetails />
        </AccordionDetails>
      </Accordion>

      {/* Accordion 3: Additional Details */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header" className="accordion-header">
          <Typography component="span">Additional Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} mt={2}>
            {/* Details of Charges */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel className="form-label">Details of Charges</FormLabel>
                <Select
                  size="small"
                  fullWidth
                  value={formState.detailsOfCharges || ''}
                  onChange={(e) => handleChange('detailsOfCharges', e.target.value)}
                  className="input-field"
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add other options as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Remittance Info */}
            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel className="form-label">Remittance Info</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.remittanceInfo || ''}
                  onChange={(e) => handleChange('remittanceInfo', e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TransactionDetails;
