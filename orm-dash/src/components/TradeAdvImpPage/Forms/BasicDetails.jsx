import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  FormControl,
  FormLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch } from "react-redux";
import { updateTabData  } from "../FormSlice"; // ✅ updated import

const BasicDetails = ({ initialData }) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialData || {});

  useEffect(() => {
    dispatch(updateTabData({ tabKey: "basicDetails", data: formState }));
  }, [formState]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const lay = { xs: 12, md: 4 };

  return (
    <Box className="details-container">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Ordering Customer Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="header"></Typography>
          <Grid container spacing={1} mt={2}>
            {/* Customer ID */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Customer ID</FormLabel>
                <TextField
                  variant="standard"
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.custId || ""}
                  onChange={(e) => handleChange("custId", e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* Ordering Customer Name */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Ordering Customer Name
                </FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.orderingCustomerName || ""}
                  onChange={(e) =>
                    handleChange("orderingCustomerName", e.target.value)
                  }
           
                />
              </FormControl>
            </Grid>

            {/* Charges Account Number */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Charges Account Number
                </FormLabel>
                <Select
                  size="small"
                  value={formState.chargesAccountNumber || ""}
                  onChange={(e) =>
                    handleChange("chargesAccountNumber", e.target.value)
                  }
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add additional MenuItem(s) as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Customer Ref No */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Customer Ref No
                </FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.customerRefNo || ""}
                  onChange={(e) =>
                    handleChange("customerRefNo", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            {/* Address Line1 */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Address Line1</FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.addressLine1 || ""}
                  onChange={(e) => handleChange("addressLine1", e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* Address Line2 */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Address Line2</FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.addressLine2 || ""}
                  onChange={(e) => handleChange("addressLine2", e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* Address Line3 */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Address Line3</FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.addressLine3 || ""}
                  onChange={(e) => handleChange("addressLine3", e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* Country */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Country</FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.country || ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* Email ID */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Email ID</FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.emailId || ""}
                  onChange={(e) => handleChange("emailId", e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* Contact Number */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Contact Number
                </FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.contactNumber || ""}
                  onChange={(e) =>
                    handleChange("contactNumber", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            {/* Remitter LEI */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Remitter LEI</FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.remitterLEI || ""}
                  onChange={(e) => handleChange("remitterLEI", e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* LEI Expiry Date */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  LEI Expiry Date
                </FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.leiExpiryDate || ""}
                  onChange={(e) =>
                    handleChange("leiExpiryDate", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            {/* State */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>State</FormLabel>
                <Select
                  size="small"
                  value={formState.state || ""}
                  onChange={(e) => handleChange("state", e.target.value)}
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add additional MenuItem(s) for states as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* GSTIN Number */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>GSTIN Number</FormLabel>
                <Select
                  size="small"
                  value={formState.gstinNumber || ""}
                  onChange={(e) => handleChange("gstinNumber", e.target.value)}
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add MenuItems as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* IE Code */}
            <Grid size={lay}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>IE Code</FormLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{ disableUnderline: true }}
                  value={formState.ieCode || ""}
                  onChange={(e) => handleChange("ieCode", e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Typography className="footer-note" mt={2}>
            <InfoOutlinedIcon sx={{ color: "gray", fontSize: "18px", mr: 1 }} />
            The transaction will be processed without GST invoice generation.
            Kindly contact the branch in case GST no. is to be changed/updated.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BasicDetails;
