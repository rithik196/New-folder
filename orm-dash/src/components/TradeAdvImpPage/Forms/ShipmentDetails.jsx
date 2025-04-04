import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
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
  TextField
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ShipmentDetails = () => {
  
  const [checked1, setChecked1] = useState(false);
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [consignorCountry, setConsignorCountry] = useState("");


  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  
  const [openDialog, setOpenDialog] = useState(false);

  const [blAwbNo, setBlAwbNo] = useState("");
  const [blAwbDate, setBlAwbDate] = useState(null);
  const [portOfLoading, setPortOfLoading] = useState("");
  const [portOfDischarge, setPortOfDischarge] = useState("");
  const [shipmentDate, setShipmentDate] = useState(null);
  const [shipmentTerms, setShipmentTerms] = useState("");

  // Additional subform fields (not mapped in table)
  const [vesselName, setVesselName] = useState("");
  const [transporterprovider, setTransporterprovider] = useState("");
  const [portOfTransShipment, setPortOfTransShipment] = useState("");
  const [countryOfLoading, setCountryOfLoading] = useState("");
  const [countryOfDischarge, setCountryOfDischarge] = useState("");
  const [subformCountryOfOrigin, setSubformCountryOfOrigin] = useState("");
  const [consignorName, setConsignorName] = useState("");
  const [consignorCountrySubform, setConsignorCountrySubform] = useState("");
  const [belowDetailsSame, setBelowDetailsSame] = useState(false);

  const countryOptions = [
    { value: "USA", label: "United States" },
    { value: "IND", label: "India" },
    { value: "UK",  label: "United Kingdom" },
    { value: "AUS", label: "Australia" },
    { value: "CAN", label: "Canada" },
  ];

  
  const lay = { xs: 12, md: 4 };

  const handleCheckboxChange1 = (event) => {
    setChecked1(event.target.checked);
  };
  const handleCountryOfOriginChange = (event) => {
    setCountryOfOrigin(event.target.value);
  };
  const handleConsignorCountryChange = (event) => {
    setConsignorCountry(event.target.value);
  };


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
   
    setBlAwbNo("");
    setBlAwbDate(null);
    setPortOfLoading("");
    setPortOfDischarge("");
    setShipmentDate(null);
    setShipmentTerms("");
  
    setVesselName("");
    setTransporterprovider("");
    setPortOfTransShipment("");
    setCountryOfLoading("");
    setCountryOfDischarge("");
    setSubformCountryOfOrigin("");
    setConsignorName("");
    setConsignorCountrySubform("");
    setBelowDetailsSame(false);
  };

 
  const handleSaveRecord = () => {
    const newRecord = {
      blAwbNo,
      blAwbDate,
      portOfLoading,
      portOfDischarge,
      shipmentDate,
      shipmentTerms
    };
    setRecords((prev) => [...prev, newRecord]);
    handleCloseDialog();
  };


  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
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
          <Typography variant="h6">Transport Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} mt={2}>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Country Of Origin</FormLabel>
                <Select
                  size="small"
                  value={countryOfOrigin}
                  onChange={handleCountryOfOriginChange}
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
                <FormLabel sx={{ alignSelf: "start" }}>Consignor Country</FormLabel>
                <Select
                  size="small"
                  value={consignorCountry}
                  onChange={handleConsignorCountryChange}
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
                <FormLabel sx={{ alignSelf: "start" }}>Earliest Shipment Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                   
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: { disableUnderline: true },
                        variant: "outlined"
                      }
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={checked1} onChange={handleCheckboxChange1} />}
              label={
                <Typography variant="body2">
                  Is payment being made after the expiry of 180 days from the date of shipment?{" "}
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              }
            />
          </Box>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell colSpan={7}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Transport Details
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
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenDialog}>
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Select</TableCell>
                  <TableCell>BL/AWB No</TableCell>
                  <TableCell>BL/AWB Date</TableCell>
                  <TableCell>Port of Loading</TableCell>
                  <TableCell>Port of Discharge</TableCell>
                  <TableCell>Shipment Date</TableCell>
                  <TableCell>Shipment Terms</TableCell>
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
                        <Checkbox checked={selectedRows.includes(index)} onChange={() => handleSelectRow(index)} />
                      </TableCell>
                      <TableCell>{row.blAwbNo}</TableCell>
                      <TableCell>{row.blAwbDate ? row.blAwbDate.format("DD/MM/YYYY") : ""}</TableCell>
                      <TableCell>{row.portOfLoading}</TableCell>
                      <TableCell>{row.portOfDischarge}</TableCell>
                      <TableCell>{row.shipmentDate ? row.shipmentDate.format("DD/MM/YYYY") : ""}</TableCell>
                      <TableCell>{row.shipmentTerms}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle>Shipment Details</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>BL/AWB No</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  value={blAwbNo}
                  onChange={(e) => setBlAwbNo(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ fontSize: "0.875rem", mb: 1 }}>BL/AWB Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="BL/AWB Date"
                    value={blAwbDate}
                    onChange={(newVal) => setBlAwbDate(newVal)}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: { disableUnderline: true },
                        variant: "outlined"
                      }
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Port of Loading</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  value={portOfLoading}
                  onChange={(e) => setPortOfLoading(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Port of Discharge</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  value={portOfDischarge}
                  onChange={(e) => setPortOfDischarge(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ fontSize: "0.875rem", mb: 1 }}>Shipment Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Shipment Date"
                    value={shipmentDate}
                    onChange={(newVal) => setShipmentDate(newVal)}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: { disableUnderline: true },
                        variant: "outlined"
                      }
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Shipment Terms</FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={shipmentTerms}
                  onChange={(e) => setShipmentTerms(e.target.value)}
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
                <FormLabel sx={{ alignSelf: 'start' }}>Vessel Name</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Transporter Provider Name</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  value={transporterprovider}
                  onChange={(e) => setTransporterprovider(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Port of Trans-Shipment</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  value={portOfTransShipment}
                  onChange={(e) => setPortOfTransShipment(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Country of Loading</FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={countryOfLoading}
                  onChange={(e) => setCountryOfLoading(e.target.value)}
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
                <FormLabel sx={{ alignSelf: 'start' }}>Country of Discharge</FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={countryOfDischarge}
                  onChange={(e) => setCountryOfDischarge(e.target.value)}
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
                <FormLabel sx={{ alignSelf: 'start' }}>Country of Origin</FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={subformCountryOfOrigin}
                  onChange={(e) => setSubformCountryOfOrigin(e.target.value)}
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
            <Grid size={{md:12}}>
              <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={belowDetailsSame}
                      onChange={(e) => setBelowDetailsSame(e.target.checked)}
                    />
                  }
                  label="Below details same as beneficiary"
                />
              </Box>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Consignor Name</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  value={consignorName}
                  onChange={(e) => setConsignorName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: 'start' }}>Consignor Country</FormLabel>
                <Select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={consignorCountrySubform}
                  onChange={(e) => setConsignorCountrySubform(e.target.value)}
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
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveRecord} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShipmentDetails;