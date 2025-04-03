import React, { useState } from "react";
import {
  IconButton,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid2";

const Picklist = ({ selectedValue, setSelectedValue, field, reduxAction }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedRow, setTempSelectedRow] = useState(null);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleRowSelection = (params) => {
    setTempSelectedRow(params.row.bicCode);
  };

  const handleAddAndClose = () => {
    if (tempSelectedRow) {
      dispatch(reduxAction(tempSelectedRow)); // Update Redux
      setSelectedValue(tempSelectedRow); // Update Local State
    }
    handleClose();
  };

  const handleClear = () => {
    dispatch(reduxAction("")); // Clear Redux
    setSelectedValue(""); // Clear TextField
    setTempSelectedRow(null); // Clear Selected Value in Modal
  };

  const rows = [
    {
      id: 1,
      bicCode: "BOFMCAM3XXX",
      institution: "Bank of Montreal",
      location: "Toronto",
    },
    {
      id: 2,
      bicCode: "HSBCAU2SXXX",
      institution: "HSBC Australia",
      location: "Sydney",
    },
  ];

  return (
    <>
      {/* Input Field with Buttons */}
      <Grid container spacing={0} mt={0}>
        {/* Input Field */}
        <Grid size={{ xs: 12, md: 8 }}>
        <TextField size="small" fullWidth value={selectedValue} disabled />
        </Grid>

        {/* Clear Button */}
        <Grid size={{ xs: 12, md: 2 }}>
          <IconButton
            onClick={handleClear}
            sx={{
              color: "#9B1E26",
              border: "1px solid #C0C0C0",
              borderRadius: 0,
              height: "30px",
            }}
          >
            <CloseIcon
              sx={{
                border: "1px solid #9B1E26",
                borderRadius: "15px",
              }}
            />
          </IconButton>
        </Grid>

        {/* More Options Button */}
        <Grid size={{ xs: 12, md: 2 }}>
          <IconButton
            onClick={handleOpen}
            sx={{
              color: "#9B1E26",
              border: "1px solid #C0C0C0",
              borderRadius: 0,
              height: "30px",
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Dialog Modal */}
      <Dialog open={isModalOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          BIC Details
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Search & Filter Section */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField size="small" fullWidth placeholder="Search" />
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Select size="small" defaultValue="">
                <MenuItem value="">All Columns</MenuItem>
              </Select>
            </Grid>
          </Grid>

          {/* BIC Details Table */}
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>BIC Code</TableCell>
                  <TableCell>Institution Name</TableCell>
                  <TableCell>Physical Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>City</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Radio
                        checked={tempSelectedRow === row.bicCode}
                        onChange={() => setTempSelectedRow(row.bicCode)}
                      />
                      {row.bicCode}
                    </TableCell>
                    <TableCell>{row.institution}</TableCell>
                    <TableCell>First Canadian Place</TableCell>
                    <TableCell>First Canadian Place, Toronto</TableCell>
                    <TableCell>{row.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        {/* Action Buttons */}
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ borderColor: "#9B1E26", color: "#9B1E26" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#9B1E26" }}
            onClick={handleAddAndClose}
          >
            Add & Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Picklist;
