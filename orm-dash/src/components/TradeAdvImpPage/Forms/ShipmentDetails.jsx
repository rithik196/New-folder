import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
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
  TextField,IconButton,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { updateTabData } from "../FormSlice";
import CloseIcon from "@mui/icons-material/Close";

const ShipmentDetails = () => {
  const dispatch = useDispatch();
  const shipmentData = useSelector(
    (state) => state.form.formData.shipmentDetails || {}
  );
  const tableRows = shipmentData.shipmentTableRows || [];
  const checked1 = shipmentData.checkboxes?.checked1 || false;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isAddingMultiple, setIsAddingMultiple] = useState(false);

  // Form state for all fields
  const [formState, setFormState] = useState({
    blAwbNo: "",
    blAwbDate: null,
    portOfLoading: "",
    portOfDischarge: "",
    shipmentDate: null,
    shipmentTerms: "",
    contryLoading: "",
    contryDischarge: "",
    transproName: "",
    vesslName: "",
    portTrnshpit: "",
    countryOrigin: "",
    checkedTick: false,
    consinerName: "",
    consinerCoun: "",
  });

  const prepareForNextEntry = () => {
    setFormState(prev => ({
      ...prev,
      blAwbNo: "",
      blAwbDate: null,
      // Clear most fields but keep some that might be repeated
      portOfLoading: prev.portOfLoading,
      portOfDischarge: prev.portOfDischarge,
      contryLoading: prev.contryLoading,
      contryDischarge: prev.contryDischarge,
      countryOrigin: prev.countryOrigin,
      consinerCoun: prev.consinerCoun,
      // Clear other fields as needed
      transproName: "",
      vesslName: "",
      portTrnshpit: "",
      checkedTick: false,
      consinerName: "",
    }));
  };
  const lay = { xs: 12, md: 4 };

  const countryOptions = [
    { value: "USA", label: "United States" },
    { value: "IND", label: "India" },
    { value: "UK", label: "United Kingdom" },
    { value: "AUS", label: "Australia" },
    { value: "CAN", label: "Canada" },
  ];

  const handleInputChange = (field, value) => {
    // First update local state
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Then update Redux state
    dispatch(
      updateTabData({
        tabKey: "shipmentDetails",
        data: {
          ...shipmentData,
          [field]: value,
        },
      })
    );
  };

  const handleCheckboxChange1 = (event) => {
    dispatch(
      updateTabData({
        tabKey: "shipmentDetails",
        data: {
          ...shipmentData,
          checkboxes: {
            ...shipmentData.checkboxes,
            checked1: event.target.checked,
          },
        },
      })
    );
  };

  const clearDialogFields = () => {
    setFormState({
      blAwbNo: "",
      blAwbDate: null,
      portOfLoading: "",
      portOfDischarge: "",
      shipmentDate: null,
      shipmentTerms: "",
      contryLoading: "",
      contryDischarge: "",
      transproName: "",
      vesslName: "",
      portTrnshpit: "",
      countryOrigin: "",
      checkedTick: false,
      consinerName: "",
      consinerCoun: "",
    });
  };

  const handleOpenDialog = () => {
    setIsEditMode(false);
    setEditIndex(null);
    clearDialogFields();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    clearDialogFields();
    setOpenDialog(false);
  };
  const handleSaveRecord = (action = 'addAndClose' || 'addAndNext' ) => {
    const newRecord = { ...formState };
  
    const updatedRecords = [...tableRows];
    if (isEditMode && editIndex !== null) {
      updatedRecords[editIndex] = newRecord;
    } else {
      updatedRecords.push(newRecord);
    }
  
    dispatch(
      updateTabData({
        tabKey: "shipmentDetails",
        data: {
          ...shipmentData,
          shipmentTableRows: updatedRecords,
        },
      })
    );
  
    if (action === 'addAndClose') {
      handleCloseDialog();
    } else if (action === 'addAndNext') {
      prepareForNextEntry();
      setIsAddingMultiple(true);
    } 
  };
  const handleEditRow = (index) => {
    const row = tableRows[index];
    setFormState({
      blAwbNo: row.blAwbNo || "",
      blAwbDate: row.blAwbDate || null,
      portOfLoading: row.portOfLoading || "",
      portOfDischarge: row.portOfDischarge || "",
      shipmentDate: row.shipmentDate || null,
      shipmentTerms: row.shipmentTerms || "",
      contryLoading: row.contryLoading || "",
      contryDischarge: row.contryDischarge || "",
      transproName: row.transproName || "",
      vesslName: row.vesslName || "",
      portTrnshpit: row.portTrnshpit || "",
      countryOrigin: row.countryOrigin || "",
      checkedTick: row.checkedTick || false,
      consinerName: row.consinerName || "",
      consinerCoun: row.consinerCoun || "",
    });
    setIsEditMode(true);
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDeleteSelected = () => {
    const updatedRecords = tableRows.filter(
      (_, index) => !selectedRows.includes(index)
    );
    dispatch(
      updateTabData({
        tabKey: "shipmentDetails",
        data: {
          ...shipmentData,
          shipmentTableRows: updatedRecords,
        },
      })
    );
    setSelectedRows([]);
  };

  return (
    <Box className="details-container">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Transport Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} mt={2}>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Country Of Origin
                </FormLabel>
                <Select
                  size="small"
                  value={
                    formState.countryOrigin || shipmentData.countryOrigin || ""
                  }
                  onChange={(e) =>
                    handleInputChange("countryOrigin", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Consignor Country
                </FormLabel>
                <Select
                  size="small"
                  value={
                    formState.consinerCoun || shipmentData.consinerCoun || ""
                  }
                  onChange={(e) =>
                    handleInputChange("consinerCoun", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Earliest Shipment Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={
                      formState.shipmentDate ||
                      shipmentData.shipmentDate ||
                      null
                    }
                    onChange={(newValue) =>
                      handleInputChange("shipmentDate", newValue)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: { disableUnderline: true },
                        variant: "outlined",
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              mt: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked1}
                  onChange={handleCheckboxChange1}
                  sx={{
                    padding: 0,
                    marginRight: 1,
                    color: "brown",
                    "&.Mui-checked": {
                      color: "brown",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  Is payment being made after the expiry of 180 days from the
                  date of shipment? <span style={{ color: "red" }}>*</span>
                </Typography>
              }
            />
          </Box>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell colSpan={14}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        Transport Details
                      </Typography>
                      <Box>
                        <Button
                          variant="text"
                          onClick={handleDeleteSelected}
                          sx={{ mr: 2 ,color: "#9B1E26"}}
                          disabled={selectedRows.length === 0}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<AddIcon />}
                          onClick={handleOpenDialog}
                          sx={{ color: "#9B1E26" }}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <FormControlLabel
                      control={<Checkbox value="" color="primary" />}
                    />
                  </TableCell>
                  <TableCell>BL/AWB No</TableCell>
                  <TableCell>BL/AWB Date</TableCell>
                  <TableCell>Port of Loading</TableCell>
                  {/* <TableCell>Country of Loading</TableCell> */}
                  <TableCell>Port of Discharge</TableCell>
                  {/* <TableCell>Country of Discharge</TableCell> */}
                  <TableCell>Shipment Date</TableCell>
                  <TableCell>Shipment Terms</TableCell>
                  {/* <TableCell>Transporter Name</TableCell>
                  <TableCell>Vessel Name</TableCell>
                  <TableCell>Port of Trans-Shipment</TableCell>
                  <TableCell>Consignor Name</TableCell>
                  <TableCell>Consignor Country</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={14} align="center">
                      Please click on <strong>+ Add</strong> to add a new record
                    </TableCell>
                  </TableRow>
                ) : (
                  tableRows.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => handleEditRow(index)}
                      sx={{ cursor: "pointer" }}
                    >
                     <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRows.includes(index)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectRow(index);
                          }}
                          sx={{
                            padding: 0,
                            marginRight: 1,
                            color: "brown",
                            "&.Mui-checked": {
                              color: "brown",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.blAwbNo}</TableCell>
                      <TableCell>
                        {row.blAwbDate
                          ? row.blAwbDate.format("DD/MM/YYYY")
                          : ""}
                      </TableCell>
                      {/* <TableCell>{row.portOfLoading}</TableCell> */}
                      <TableCell>{row.contryLoading}</TableCell>
                      <TableCell>{row.portOfDischarge}</TableCell>
                      {/* <TableCell>{row.contryDischarge}</TableCell> */}
                      <TableCell>
                        {row.shipmentDate
                          ? row.shipmentDate.format("DD/MM/YYYY")
                          : ""}
                      </TableCell>
                      <TableCell>{row.shipmentTerms}</TableCell>
                      {/* <TableCell>{row.transproName}</TableCell>
                      <TableCell>{row.vesslName}</TableCell>
                      <TableCell>{row.portTrnshpit}</TableCell>
                      <TableCell>{row.consinerName}</TableCell>
                      <TableCell>{row.consinerCoun}</TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

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
          Transport Details
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
          Fill in details to add in table
          </Typography>
        </DialogTitle>

    
        
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>BL/AWB No</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.blAwbNo}
                  onChange={(e) => handleInputChange("blAwbNo", e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ fontSize: "0.875rem" }}>BL/AWB Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formState.blAwbDate}
                    onChange={(newValue) =>
                      handleInputChange("blAwbDate", newValue)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        variant: "outlined",
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Shipment Terms
                </FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.shipmentTerms}
                  onChange={(e) =>
                    handleInputChange("shipmentTerms", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ fontSize: "0.875rem" }}>
                  Shipment Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formState.shipmentDate}
                    onChange={(newValue) =>
                      handleInputChange("shipmentDate", newValue)
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        variant: "outlined",
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Port of Loading
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.portOfLoading}
                  onChange={(e) =>
                    handleInputChange("portOfLoading", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Country of Loading
                </FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.contryLoading}
                  onChange={(e) =>
                    handleInputChange("contryLoading", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Port of Discharge
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.portOfDischarge}
                  onChange={(e) =>
                    handleInputChange("portOfDischarge", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Country of Discharge
                </FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.contryDischarge}
                  onChange={(e) =>
                    handleInputChange("contryDischarge", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Transporter Name
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.transproName}
                  onChange={(e) =>
                    handleInputChange("transproName", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Vessel Name</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.vesslName}
                  onChange={(e) =>
                    handleInputChange("vesslName", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Port of Trans-Shipment
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.portTrnshpit}
                  onChange={(e) =>
                    handleInputChange("portTrnshpit", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Country of Origin
                </FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.countryOrigin}
                  onChange={(e) =>
                    handleInputChange("countryOrigin", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 12 }}>
              <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.checkedTick}
                      onChange={(e) =>
                        handleInputChange("checkedTick", e.target.checked)
                      }
                      sx={{
                        padding: 0,
                        marginRight: 1,
                        color: "brown",
                        "&.Mui-checked": {
                          color: "brown",
                        },
                      }}
                    />
                  }
                  label="Below details same as beneficiary"
                />
              </Box>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Consignor Name
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.consinerName}
                  onChange={(e) =>
                    handleInputChange("consinerName", e.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Consignor Country
                </FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formState.consinerCoun}
                  onChange={(e) =>
                    handleInputChange("consinerCoun", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {countryOptions.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", p: 2 }}>
       
           <Box display="flex" gap={2}>

          <Button
            onClick={() => handleSaveRecord("addAndClose")}
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
            onClick={() => handleSaveRecord("addAndNext")}
            variant="contained"
            sx={{
              bgcolor: "#9B1E26",
              color: "white",
              borderRadius: "20px",
            }}
          >
            Save and Next
          </Button>
            </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShipmentDetails;
