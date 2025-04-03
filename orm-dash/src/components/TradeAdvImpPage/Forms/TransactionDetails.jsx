import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
} from "@mui/material";
import RemittanceAccountDetails from "./RemittanceAccountDetails";

const TransactionDetails = () => {
  return (
    <>
      {/* Accordion 1 */}
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
                <Select size="small" fullWidth value="Select">
                  <MenuItem value="Select">Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* CCY */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel>CCY</FormLabel>
                <Select size="small" fullWidth value="Select">
                  <MenuItem value="Select">Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Remittance Amount */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel>Remittance Amount (Indicative)</FormLabel>
                <TextField variant="outlined" size="small" />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Accordion 2 (Duplicate) */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Remittance Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RemittanceAccountDetails></RemittanceAccountDetails>
        </AccordionDetails>
      </Accordion>

      {/* Accordion 2 (Duplicate) */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          className="accordion-header"
        >
          <Typography component="span">Additional Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={0} mt={2}>
            {/* Remittance In */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel className="form-label">Details of Charges</FormLabel>
                <Select
                  size="small"
                  fullWidth
                  value="Select"
                  className="input-field"
                >
                  <MenuItem value="Select">Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <FormControl fullWidth required variant="outlined" >
                <FormLabel className="form-label">Remittance Info</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  s
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
