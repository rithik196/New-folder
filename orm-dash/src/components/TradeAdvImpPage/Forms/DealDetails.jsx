import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const DealDetails = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal state
  const [fxType, setFxType] = useState("");
  const [hasExistingDeal, setHasExistingDeal] = useState("");
  const [dealId, setDealId] = useState("");
  const [originalDealAmount, setOriginalDealAmount] = useState("");
  const [rate, setRate] = useState("");
  const [utilizationAmount, setUtilizationAmount] = useState("");
  const [equivalentINR, setEquivalentINR] = useState("");
  const [realMaturityDate, setRealMaturityDate] = useState("");

  const fxTypeOptions = ["Forward", "Swap", "Option", "Spot"];

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setFxType("");
    setHasExistingDeal("");
    setDealId("");
    setOriginalDealAmount("");
    setRate("");
    setUtilizationAmount("");
    setEquivalentINR("");
    setRealMaturityDate("");
  };

  const handleSaveRecord = () => {
    const newRecord = {
      fxType,
      dealId,
      originalDealAmount,
      rate,
      utilizationAmount,
      equivalentINR,
      realMaturityDate,
    };
    setRecords([...records, newRecord]);
    handleCloseDialog();
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDeleteSelected = () => {
    setRecords((prev) =>
      prev.filter((_, index) => !selectedRows.includes(index))
    );
    setSelectedRows([]);
  };

  return (
    <Box className="details-container">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Deal Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell colSpan={7}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        Deal Records
                      </Typography>
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={handleDeleteSelected}
                          sx={{ mr: 2 }}
                          disabled={selectedRows.length === 0}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleOpenDialog}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Select</TableCell>
                  <TableCell>Fx Type</TableCell>
                  <TableCell>Deal ID</TableCell>
                  <TableCell>Original Deal Amount</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Utilization Amount</TableCell>
                  <TableCell>Equivalent INR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Please click on <strong>+ Add</strong> to add a new record
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(index)}
                          onChange={() => handleSelectRow(index)}
                        />
                      </TableCell>
                      <TableCell>{row.fxType}</TableCell>
                      <TableCell>{row.dealId}</TableCell>
                      <TableCell>{row.originalDealAmount}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                      <TableCell>{row.utilizationAmount}</TableCell>
                      <TableCell>{row.equivalentINR}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Total Section */}
          <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Grid container spacing={3}>
              <Grid size={{ md: 4 }}>
                <Typography variant="subtitle1">
                  Total Remittance Amount
                </Typography>
                <Typography variant="h6">2,00,000 USD</Typography>
              </Grid>
              <Grid size={{ md: 4 }}>
                <Typography variant="subtitle1">
                  Amount to be debited from EEFC
                </Typography>
                <Typography variant="h6">0.0</Typography>
              </Grid>
              <Grid size={{ md: 4 }}>
                <Typography variant="subtitle1">
                  Actual Deal Booking Amount
                </Typography>
                <Typography variant="h6">0.0</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Action Buttons
          <Box mt={3} display="flex" gap={2}>
            <Button variant="outlined" color="error">
              Clear All
            </Button>
            <Button variant="contained" color="primary">
              Save and Close
            </Button>
          </Box> */}
        </AccordionDetails>
      </Accordion>

      {/* Add Deal Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Deal Details</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Fx Type *</InputLabel>
                <Select
                  value={fxType}
                  label="Fx Type *"
                  onChange={(e) => setFxType(e.target.value)}
                >
                  {fxTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {fxType && (
              <>
                <Grid size={{ md: 12 }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      value={hasExistingDeal}
                      onChange={(e) => setHasExistingDeal(e.target.value)}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes, I have an existing deal"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No, create new deal"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {hasExistingDeal === "yes" && (
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      label="Deal ID *"
                      value={dealId}
                      onChange={(e) => setDealId(e.target.value)}
                    />
                  </Grid>
                )}

                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Original Deal Amount"
                    value={originalDealAmount}
                    onChange={(e) => setOriginalDealAmount(e.target.value)}
                  />
                </Grid>

                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </Grid>

                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Deal Amount Utilization"
                    value={utilizationAmount}
                    onChange={(e) => setUtilizationAmount(e.target.value)}
                  />
                </Grid>

                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Equivalent INR *"
                    value={equivalentINR}
                    onChange={(e) => setEquivalentINR(e.target.value)}
                  />
                </Grid>

                {hasExistingDeal === "yes" && (
                  <Grid size={{ md: 6 }}>
                    <TextField
                      fullWidth
                      label="Real Maturity Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={realMaturityDate}
                      onChange={(e) => setRealMaturityDate(e.target.value)}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveRecord}
            color="primary"
            variant="contained"
            disabled={!fxType || !equivalentINR}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DealDetails;
