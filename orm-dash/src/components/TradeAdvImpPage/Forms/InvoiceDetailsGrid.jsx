import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { updateTabData } from "../FormSlice";

const InvoiceDetailsGrid = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    invNo: "",
    invDate: null,
    invCCY: "",
    invAmnt: "",
    utilCCY: "",
    utlAmnt: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  

  const dispatch = useDispatch();

  const saveToRedux = (data) => {
    dispatch(
      updateTabData({ tabKey: "invoiceDetails", data: { invgrid2: data } })
    );
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      invNo: "",
      invDate: null,
      invCCY: "",
      invAmnt: "",
      utilCCY: "",
      utlAmnt: "",
    });
    setEditIndex(null);
  };

  const handleSaveRow = (nextTab = false) => {
    let updatedRows;
    if (editIndex !== null) {
      updatedRows = [...tableRows];
      updatedRows[editIndex] = formData;
    } else {
      updatedRows = [...tableRows, formData];
    }
    setTableRows(updatedRows);
    saveToRedux(updatedRows);
    handleCloseDialog();

    if (nextTab) {
      dispatch(setCurrentTab(4)); // assuming 4 is your next tab index
    }
  };

  const handleEditRow = (index) => {
    setFormData({ ...tableRows[index] });
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleDeleteSelectedRows = () => {
    const updatedRows = tableRows.filter(
      (_, index) => !selectedIndexes.includes(index)
    );
    setTableRows(updatedRows);
    setSelectedIndexes([]);
    saveToRedux(updatedRows);
  };

  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const toggleRowSelection = (index) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
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
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Invoice Details
                  </Typography>
                  <Box>
                    <Button
                      variant="text"
                      sx={{ mr: 2, color: "#9B1E26" }}
                      onClick={handleDeleteSelectedRows}
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
                  control={
                    <Checkbox
                      value=""
                      sx={{
                        color: "brown",
                        "&.Mui-checked": { color: "brown" },
                      }}
                    />
                  }
                />
              </TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Invoice CCY</TableCell>
              <TableCell>Invoice Amount</TableCell>
              <TableCell>Utilization CCY</TableCell>
              <TableCell>Utilization Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} align="center">
                  Please click on <strong>'+ Add'</strong> to add a new record
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
                      checked={selectedIndexes.includes(index)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowSelection(index);
                      }}
                      sx={{
                        padding: 0,
                        marginRight: 1,
                        color: "brown",
                        "&.Mui-checked": { color: "brown" },
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.invNo}</TableCell>
                  <TableCell>
                    {row.invDate ? row.invDate.format("DD/MM/YYYY") : ""}
                  </TableCell>
                  <TableCell>{row.invCCY}</TableCell>
                  <TableCell>{row.invAmnt}</TableCell>
                  <TableCell>{row.utilCCY}</TableCell>
                  <TableCell>{row.utlAmnt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
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
          {editIndex !== null ? "Edit" : "Add"} Invoice Detail
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Invoice Number
                </FormLabel>
                <TextField
                  fullWidth
                  value={formData.invNo}
                  onChange={(e) =>
                    setFormData({ ...formData, invNo: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Invoice Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formData.invDate}
                    onChange={(newValue) =>
                      setFormData({ ...formData, invDate: newValue })
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>Invoice CCY</FormLabel>
                <TextField
                  fullWidth
                  value={formData.invCCY}
                  onChange={(e) =>
                    setFormData({ ...formData, invCCY: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Invoice Amount
                </FormLabel>
                <TextField
                  fullWidth
                  value={formData.invAmnt}
                  onChange={(e) =>
                    setFormData({ ...formData, invAmnt: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Utilization CCY
                </FormLabel>
                <TextField
                  fullWidth
                  value={formData.utilCCY}
                  onChange={(e) =>
                    setFormData({ ...formData, utilCCY: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth variant="outlined">
                <FormLabel sx={{ alignSelf: "start" }}>
                  Utilization Amount
                </FormLabel>
                <TextField
                  fullWidth
                  value={formData.utlAmnt}
                  onChange={(e) =>
                    setFormData({ ...formData, utlAmnt: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", p: 3 }}>
          <Button
            onClick={() => handleSaveRow(false)}
            variant="contained"
            sx={{ backgroundColor: "#9B1E26", color: "#fff", mr: 2 }}
          >
            {editIndex !== null ? "Update and Close" : "Add and Close"}
          </Button>
          <Button
            onClick={() => handleSaveRow(true)}
            variant="contained"
            sx={{ backgroundColor: "#9B1E26", color: "#fff" }}
          >
            {editIndex !== null ? "Update and Next" : "Add and Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvoiceDetailsGrid;
