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
  FormLabel,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Mock data for the deals
const mockDealData = {
  existingDeal: {
    fxCCY: "USD/INR",
    dealMaturityDate: "2024-12-31",
    dealUtilizationAmount: "500,000",
    equivalentINR: "3,75,00,000",
  },
  connectRM: {
    fxCCY: "EUR/INR",
    dealPendingAmount: "200,000",
  },
};

const DealDetails = () => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [openDialog, setOpenDialog] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({
    fxType: "",
    dealId: "",
    rate: "",
    originalDealAmount: "",
    fetchedData: null,
  });

  const handleOpenDialog = (index = -1) => {
    setEditingIndex(index);
    if (index >= 0) {
      const record = records[index];
      setFormData({
        fxType: record.fxType === "Existing Deal" ? "existing" : "connect",
        dealId: record.dealId,
        rate: record.rate,
        originalDealAmount: record.originalDealAmount,
        fetchedData: {
          fxCCY: record.fxCCY,
          dealMaturityDate: record.dealMaturityDate,
          dealUtilizationAmount: record.dealUtilizationAmount,
          equivalentINR: record.equivalentINR,
        },
      });
    }
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingIndex(-1);
    setFormData({
      fxType: "",
      dealId: "",
      rate: "",
      originalDealAmount: "",
      fetchedData: null,
    });
  };

  const handleGetDetails = () => {
    // Simulate API call
    setFormData((prev) => ({
      ...prev,
      fetchedData: mockDealData.existingDeal,
    }));
  };

  const handleSave = (action) => {
    const newRecord = {
      fxType: formData.fxType,
      dealId: formData.dealId,
      rate: formData.rate,
      originalDealAmount: formData.originalDealAmount,
      ...(formData.fetchedData || mockDealData.connectRM),
    };

    if (editingIndex >= 0) {
      // Update existing record
      const updatedRecords = [...records];
      updatedRecords[editingIndex] = newRecord;
      setRecords(updatedRecords);
    } else {
      // Add new record
      setRecords([...records, newRecord]);
    }

    if (action === "close") {
      handleCloseDialog();
    } else {
      setFormData({
        fxType: "",
        dealId: "",
        rate: "",
        originalDealAmount: "",
        fetchedData: null,
      });
    }
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

  // Calculate total remittance amount
  const totalRemittanceAmount = records.reduce((total, record) => {
    const amount = parseFloat(
      record.originalDealAmount?.replace(/,/g, "") || 0
    );
    return total + amount;
  }, 0);

  // Format the number with commas
  const formattedAmount = new Intl.NumberFormat("en-IN").format(
    totalRemittanceAmount
  );

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
                          variant="text"
                          onClick={handleDeleteSelected}
                          sx={{ mr: 2 }}
                          disabled={selectedRows.length === 0}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<AddIcon />}
                          onClick={handleOpenDialog}
                          
                            sx={{color:"#9B1E26" }}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell></TableCell>
                  <TableCell>Fx Type</TableCell>
                  <TableCell>Deal ID</TableCell>
                  <TableCell>Original Deal Amount</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Deal Amount Utilization</TableCell>
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
                    <TableRow
                      key={index}
                      hover
                      onClick={() => handleOpenDialog(index)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRows.includes(index)}
                          onChange={() => handleSelectRow(index)}
                        />
                      </TableCell>
                      <TableCell>
                        {row.fxType === "existing"
                          ? "Existing Deal"
                          : "Connect with RM"}
                      </TableCell>
                      <TableCell>{row.dealId || "-"}</TableCell>
                      <TableCell>{row.originalDealAmount || "-"}</TableCell>
                      <TableCell>{row.rate || "-"}</TableCell>
                      <TableCell>{row.dealUtilizationAmount || "-"}</TableCell>
                      <TableCell>
                        {row.equivalentINR || row.dealPendingAmount || "-"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ md: 4 }}>
              <FormLabel sx={{ alignSelf: "start" }}>
                Total Remittance Amount
              </FormLabel>
              <Box
                sx={{
                  fontWeight: 600,
                  padding: "16.5px 14px",
                  minHeight: "56px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <span>{formattedAmount}</span>
                <span style={{ color: "#1281DD" }}>USD</span>
              </Box>
            </Grid>

            <Grid size={{ md: 4 }}>
              <FormLabel sx={{ alignSelf: "start" }}>
                Amount to be debited from EEFC
              </FormLabel>
              <Box
                sx={{
                  fontWeight: 600,
                  padding: "16.5px 14px",
                  minHeight: "56px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                0.0
              </Box>
            </Grid>

            <Grid size={{ md: 4 }}>
              <FormLabel sx={{ alignSelf: "start" }}>
                Actual Deal Booking Amount
              </FormLabel>
              <Box
                sx={{
                  fontWeight: 600,
                  padding: "16.5px 14px",
                  minHeight: "56px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                0.0
              </Box>
            </Grid>

            <Grid size={{ md: 4 }}>
              <FormLabel sx={{ alignSelf: "start" }}>Category</FormLabel>
              <Box
                sx={{
                  fontWeight: 600,
                  padding: "16.5px 14px",
                  minHeight: "56px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                -
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Add Deal Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ position: "relative" }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#9B1E26",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
            Deal Details
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            Fill in details to add in table
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth>
                <FormLabel sx={{ alignSelf: "start", mb: 1 }}>
                  Fx Type
                </FormLabel>
                <Select
                  displayEmpty
                  value={formData.fxType}
                  onChange={(e) =>
                    setFormData({ ...formData, fxType: e.target.value })
                  }
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="existing">
                    Do you have an existing Deal?
                  </MenuItem>
                  <MenuItem value="connect">Connect with RM</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ md: 8 }}></Grid>

            {formData.fxType === "existing" && (
              <>
                <Grid size={{ md: 4 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>Deal ID</FormLabel>
                  <TextField
                    fullWidth
                    value={formData.dealId}
                    onChange={(e) =>
                      setFormData({ ...formData, dealId: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={{ md: 4 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>Rate</FormLabel>
                  <TextField
                    fullWidth
                    value={formData.rate}
                    onChange={(e) =>
                      setFormData({ ...formData, rate: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={{ md: 4 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>
                    Original Deal Amount
                  </FormLabel>
                  <TextField
                    fullWidth
                    value={formData.originalDealAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalDealAmount: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid size={{ md: 12 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#9B1E26",
                      color: "#9B1E26",
                      "&:hover": { borderColor: "dark#9B1E26" },
                    }}
                    onClick={handleGetDetails}
                  >
                    Get Details
                  </Button>
                </Grid>

                {/* Always visible fields with default values */}
                <Grid size={{ md: 4 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>Fx CCY</FormLabel>
                  <Box
                    sx={{
                      fontWeight: 600,
                      padding: "16.5px 14px",
                      minHeight: "56px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {formData.fetchedData?.fxCCY || "-"}
                  </Box>
                </Grid>
                <Grid size={{ md: 4 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>
                    Deal Maturity Date
                  </FormLabel>
                  <Box
                    sx={{
                      fontWeight: 600,
                      padding: "16.5px 14px",
                      minHeight: "56px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {formData.fetchedData?.dealMaturityDate || "-"}
                  </Box>
                </Grid>
                <Grid size={{ md: 4 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>
                    Deal Utilization Amount
                  </FormLabel>
                  <Box
                    sx={{
                      fontWeight: 600,
                      padding: "16.5px 14px",
                      minHeight: "56px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {formData.fetchedData?.dealUtilizationAmount || "-"}
                  </Box>
                </Grid>
                <Grid size={{ md: 4 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>
                    Equivalent INR
                  </FormLabel>
                  <Box
                    sx={{
                      fontWeight: 600,
                      padding: "16.5px 14px",
                      minHeight: "56px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {formData.fetchedData?.equivalentINR || "-"}
                  </Box>
                </Grid>
              </>
            )}

            {formData.fxType === "connect" && (
              <>
                <Grid size={{ md: 6 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>Fx CCY</FormLabel>
                  <Box
                    sx={{
                      fontWeight: 600,
                      padding: "16.5px 14px",
                      minHeight: "56px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {mockDealData.connectRM.fxCCY || "-"}
                  </Box>
                </Grid>
                <Grid size={{ md: 6 }}>
                  <FormLabel sx={{ alignSelf: "start" }}>
                    Deal Pending Amount
                  </FormLabel>
                  <Box
                    sx={{
                      fontWeight: 600,
                      padding: "16.5px 14px",
                      minHeight: "56px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {mockDealData.connectRM.dealPendingAmount || "-"}
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Box display="flex" gap={2}>
            {formData.fxType === "connect" && (
              <Button
                onClick={() => handleSave("close")}
                variant="contained"
                sx={{
                  bgcolor: "#9B1E26",
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                Save and Close
              </Button>
            )}

            {formData.fxType === "existing" && (
              <>
                <Button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      dealId: "",
                      rate: "",
                      originalDealAmount: "",
                      fetchedData: null,
                    });
                  }}
                  variant="outlined"
                  sx={{
                    borderColor: "#9B1E26",
                    color: "#9B1E26",
                    borderRadius: "20px",
                  }}
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => handleSave("close")}
                  variant="contained"
                  sx={{
                    bgcolor: "#9B1E26",
                    color: "white",
                    borderRadius: "20px",
                  }}
                >
                  Save and Close
                </Button>
              </>
            )}

            {!formData.fxType && (
              <>
                <Button
                  onClick={() => handleSave("close")}
                  variant="outlined"
                  sx={{
                    borderColor: "#9B1E26",
                    color: "#9B1E26",
                    borderRadius: "20px",
                  }}
                >
                  Save and Close
                </Button>
                <Button
                  onClick={() => handleSave("next")}
                  variant="contained"
                  sx={{
                    bgcolor: "#9B1E26",
                    color: "white",
                    borderRadius: "20px",
                  }}
                >
                  Save and Next
                </Button>
              </>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DealDetails;
