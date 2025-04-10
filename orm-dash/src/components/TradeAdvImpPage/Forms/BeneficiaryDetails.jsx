import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import Picklist from "./Picklist";

import {
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateTabData } from "../FormSlice";
import {
  setBeneficiaryBIC,
  setIntermediaryBIC,
} from "../../../redux/actions/formActions";

const BeneficiaryDetails = () => {
  const dispatch = useDispatch();

  const reduxData = useSelector(
    (state) => state.form.formData.beneficiaryDetails
  );
  const { beneficiarySwiftCode = "", intermediarySwiftCode = "" } = useSelector(
    (state) => state.form.formData
  );

  const [formState, setFormState] = useState(reduxData || {});

  useEffect(() => {
    dispatch(updateTabData({ tabKey: "beneficiaryDetails", data: formState }));
  }, [formState, dispatch]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* --- Personal Details --- */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Personal Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4} mt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid size={{ xs: 6, md: 10 }}>
                  <FormControl fullWidth required>
                    <FormLabel className="form-label">
                      Beneficiary Name
                    </FormLabel>
                    <TextField
                      size="small"
                      className="input-field"
                      value={formState.BeneName || ""}
                      onChange={(e) => handleChange("BeneName", e.target.value)}
                    />
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
                    <TextField
                      size="small"
                      className="input-field"
                      value={formState.nickName || ""}
                      onChange={(e) => handleChange("nickName", e.target.value)}
                    />
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
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.beneAccount || ""}
                  onChange={(e) => handleChange("beneAccount", e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">Beneficiary LEI</FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.beneLEI || ""}
                  onChange={(e) => handleChange("beneLEI", e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Address Line 1
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.beneAddr1 || ""}
                  onChange={(e) => handleChange("beneAddr1", e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Address Line 2
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.beneAddr2 || ""}
                  onChange={(e) => handleChange("beneAddr2", e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} sx={{ mt: 4 }}>
            <FormControl fullWidth>
              <FormLabel className="form-label">
                Beneficiary Address Line 3
              </FormLabel>
              <TextField
                size="small"
                className="input-field"
                value={formState.beneAddr3 || ""}
                onChange={(e) => handleChange("beneAddr3", e.target.value)}
              />
            </FormControl>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* --- Bank Details --- */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Bank Details</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={4} mt={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Bank Identifier
                </FormLabel>
                <Select
                  size="small"
                  fullWidth
                  value={formState.beneBankIden || ""}
                  onChange={(e) => handleChange("beneBankIden", e.target.value)}
                >
                  <MenuItem value="Select">option</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Bank Ac/Sort Code/ABA
                  {/* Beneficiary Bank Ac/Sort Code/ABA/FEDWIRE */}
                </FormLabel>
                <TextField
                  variant="standard"
                  size="small"
                  className="input-field"
                  InputProps={{ disableUnderline: true }}
                  value={formState.FEDWIRE || "-"}
                  onChange={(e) => handleChange("FEDWIRE", e.target.value)}
                />
                {/* <Typography>-</Typography> */}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Swift Code
                </FormLabel>
                <Picklist tabKey="beneficiaryDetails" fieldKey="beneficiaryBIC" />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Bank Name
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.BeneBankName || ""}
                  onChange={(e) => handleChange("BeneBankName", e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 1
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.BeneBankAddre1 || ""}
                  onChange={(e) =>
                    handleChange("BeneBankAddre1", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 2
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.BeneBankAddre2 || ""}
                  onChange={(e) =>
                    handleChange("BeneBankAddre2", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 2
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.BeneBankAddre2nd || ""}
                  onChange={(e) =>
                    handleChange("BeneBankAddre2nd", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Beneficiary Bank Address Line 3
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.BeneBankAddre3 || ""}
                  onChange={(e) =>
                    handleChange("BeneBankAddre3", e.target.value)
                  }
                />
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
                  className="input-field"
                  value={formState.BeneBankCount || ""}
                  onChange={(e) =>
                    handleChange("BeneBankCount", e.target.value)
                  }
                >
                  <MenuItem value="Select">option</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* --- Intermediary Bank Details --- */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Intermediary Bank Details</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={4} mt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Intermediary Bank Swift Code
                </FormLabel>
                <Picklist tabKey="beneficiaryDetails" fieldKey="intermediaryBankSwiftCode" />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Intermediary Bank Name
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.InterBankName || ""}
                  onChange={(e) =>
                    handleChange("InterBankName", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth required>
                <FormLabel className="form-label">
                  Intermediary Bank Address Line 1
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.InterBankAddre1 || ""}
                  onChange={(e) =>
                    handleChange("InterBankAddre1", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Intermediary Bank Address Line 2
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.InterBankAddre2 || ""}
                  onChange={(e) =>
                    handleChange("InterBankAddre2", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <FormLabel className="form-label">
                  Intermediary Bank Address Line 3
                </FormLabel>
                <TextField
                  size="small"
                  className="input-field"
                  value={formState.InterBankAddre3 || ""}
                  onChange={(e) =>
                    handleChange("InterBankAddre3", e.target.value)
                  }
                />
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
                  className="input-field"
                  value={formState.InterBankCount || ""}
                  onChange={(e) =>
                    handleChange("InterBankCount", e.target.value)
                  }
                >
                  <MenuItem value="option">option</MenuItem>
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
