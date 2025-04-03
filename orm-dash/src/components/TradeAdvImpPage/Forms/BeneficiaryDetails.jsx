import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2"; // Using latest MUI Grid2
import SearchIcon from "@mui/icons-material/Search";

import Picklist from "./Picklist"; // Import Picklist
import { setBeneficiaryBIC, setIntermediaryBIC } from "../../../redux/actions/formActions";
import {
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

const BeneficiaryDetails = () => {

  const [beneficiarySwiftCode, setBeneficiarySwiftCode] = useState("");
  const [intermediarySwiftCode, setIntermediarySwiftCode] = useState("");
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Personal Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4} mt={1}>
            {/* Row 1 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid size={{ xs: 6, md: 10 }}>
                  <FormControl fullWidth required>
                    <FormLabel className="form-label">
                      Beneficiary Name
                    </FormLabel>
                    <TextField size="small" className="input-field" />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 6, md: 2 }} mt={3}>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#9B1E26",
                      border: "1px solid #9B1E26",
                      borderRadius: "5px",
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid size={{ xs: 12, md: 10 }}>
                  <FormControl fullWidth>
                    <FormLabel className="form-label">Nick Name</FormLabel>
                    <TextField size="small" className="input-field" fullWidth />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }} mt={3}>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#9B1E26",
                      border: "1px solid #9B1E26",
                      borderRadius: "5px",
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Account Number/IBAN
                </FormLabel>
                <TextField size="small" className="input-field" fullWidth />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">Beneficiary LEI</FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Address Line 1
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Address Line 2
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>
          </Grid>
          {/* Row 3 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ mt: 4 }}>
            <FormControl fullWidth>
              <FormLabel className="form-label">
                Beneficiary Address Line 3
              </FormLabel>
              <TextField size="small" className="input-field" />
            </FormControl>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Bank Details</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={4} mt={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel className="form-label">
                  Beneficiary Bank Identifier
                </FormLabel>
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

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Bank Ac/Sort Code/ABA/FEDWIRE
                </FormLabel>
                <Typography>-</Typography>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Swift Code
                </FormLabel>
                <Picklist
                  selectedValue={beneficiarySwiftCode}
                  setSelectedValue={setBeneficiarySwiftCode}
                  field="Beneficiary"
                  reduxAction={setBeneficiaryBIC}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Bank Name
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 1
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 2
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 2
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 3
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel className="form-label">
                  Beneficiary Bank Country
                </FormLabel>
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
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Intermediary Bank Details</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={4} mt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Intermediary Bank Swift Code
                </FormLabel>
                <Picklist
                  selectedValue={intermediarySwiftCode}
                  setSelectedValue={setIntermediarySwiftCode}
                  field="Intermediary"
                  reduxAction={setIntermediaryBIC}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Intermediary Bank Name
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Intermediary Bank Address Line 1
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Intermediary Bank Address Line 2
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Intermediary Bank Address Line 3
                </FormLabel>
                <TextField size="small" className="input-field" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required variant="outlined">
                <FormLabel className="form-label">
                  Intermediary Bank Country
                </FormLabel>
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
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BeneficiaryDetails;
