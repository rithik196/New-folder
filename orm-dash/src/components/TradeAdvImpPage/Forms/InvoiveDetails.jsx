import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { updateTabData } from "../FormSlice";

function createData(
  id,
  hsCode,
  category,
  description,
  policyConditions,
  licenseAdded
) {
  return { id, hsCode, category, description, policyConditions, licenseAdded };
}
// hhfhdfhfhgh
const hsCodeData = {
  2811100: {
    category: "Chemical",
    description: "Hydrogen Fluoride",
    policyConditions: "-",
    licenseAdded: "Yes",
  },
  8501101: {
    category: "Electronics",
    description: "Electric Motors",
    policyConditions: "Condition A",
    licenseAdded: "No",
  },
  1006200: {
    category: "Agriculture",
    description: "Rice",
    policyConditions: "Condition B",
    licenseAdded: "Yes",
  },
  3926909: {
    category: "Plastic",
    description: "Plastic Articles",
    policyConditions: "Condition C",
    licenseAdded: "No",
  },
  3004901: {
    category: "Pharma",
    description: "Medicaments",
    policyConditions: "-",
    licenseAdded: "Yes",
  },
};

const headCells = [
  { id: "hsCode", label: "HS Code" },
  { id: "category", label: "Category" },
  { id: "description", label: "Description" },
  { id: "policyConditions", label: "Policy Conditions" },
  { id: "action", label: "Action" },
  { id: "licenseAdded", label: "License Added" },
];

function EnhancedTableHead({ onSelectAllClick, numSelected, rowCount }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        sx={{
                            padding: 0,
                            marginRight: 1,
                            color: 'brown',
                            '&.Mui-checked': {
                                color: 'brown',
                            },
                            '&.MuiCheckbox-indeterminate': {
                                color: 'brown',
                            },
                        }}
                    /> */}
          <span> </span>
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({ numSelected, onDelete }) {
  return (
    <Toolbar sx={{ bgcolor: grey[200] }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6">HS Code Details</Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const InvoiceDetails = () => {
  const dispatch = useDispatch();
  const invoiceData = useSelector(
    (state) => state.form.formData.invoiceDetails || {}
  );
  const tableRows = useSelector(
    (state) => state.form.formData.invoiceTableRows || []
  );

  const checked1 = invoiceData.checkboxes?.checked1 || false;
  const checked2 = invoiceData.checkboxes?.checked2 || false;
  const checked3 = invoiceData.checkboxes?.checked3 || false;
  const selectedImport = invoiceData.importType || "";

  const [hsCodeInput, setHsCodeInput] = useState("");
  const importOptions = [
    {
      value: "Import Without Currency Conversion",
      label: "Import Without Currency Conversion",
    },
    {
      value: "seImport With Currency Conversiona",
      label: "Import With Currency Conversion",
    },
    { value: "Deemed Import", label: "Deemed Import" },
  ];

  const handleImportChange = (event) => {
    dispatch(
      updateTabData({
        tabKey: "invoiceDetails",
        data: {
          ...invoiceData,
          importType: event.target.value,
        },
      })
    );
  };

  const handleCheckboxChange1 = (event) => {
    dispatch(
      updateTabData({
        tabKey: "invoiceDetails",
        data: {
          ...invoiceData,
          checkboxes: {
            ...invoiceData.checkboxes,
            checked1: event.target.checked,
          },
        },
      })
    );
  };
  const handleCheckboxChange2 = (event) => {
    dispatch(
      updateTabData({
        tabKey: "invoiceDetails",
        data: {
          ...invoiceData,
          checkboxes: {
            ...invoiceData.checkboxes,
            checked2: event.target.checked,
          },
        },
      })
    );
  };
  const handleCheckboxChange3 = (event) => {
    dispatch(
      updateTabData({
        tabKey: "invoiceDetails",
        data: {
          ...invoiceData,
          checkboxes: {
            ...invoiceData.checkboxes,
            checked3: event.target.checked,
          },
        },
      })
    );
  };

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? tableRows.map((n) => n.id) : []);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [...selected];
    selectedIndex === -1
      ? newSelected.push(id)
      : newSelected.splice(selectedIndex, 1);
    setSelected(newSelected);
  };

  const handleDelete = () => {
    const updated = tableRows.filter((row) => !selected.includes(row.id));
    dispatch(updateTabData({ tabKey: "invoiceTableRows", data: updated }));
    setSelected([]);
  };

  const visibleRows = tableRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Goods Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} mb={2} mt={1} ml={"1px"}>
            <Grid
              sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
                size={{ xs: 12, md: 4 }}
                >
              <FormControl fullWidth variant="outlined" required>
                <FormLabel>HS Code</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  value={hsCodeInput}
                  onChange={(e) => setHsCodeInput(e.target.value)}
                />
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  mt: { xs: 2, md: 3 },
                  ml: 4,
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#9B1E26",
                  "&:hover": {
                      backgroundColor: "#9B1E26", // darker brown for hover
                    },
                }}
                onClick={() => {
                    const hsDetails = hsCodeData[hsCodeInput.trim()];
                    if (!hsDetails) {
                        alert("HS Code not found in database.");
                        return;
                    }
                    
                    const newId = tableRows.length
                    ? Math.max(...tableRows.map((r) => r.id)) + 1
                    : 1;
                    const newRow = {
                        id: newId,
                        hsCode: hsCodeInput.trim(),
                        category: hsDetails.category,
                        description: hsDetails.description,
                        policyConditions: hsDetails.policyConditions,
                        licenseAdded: hsDetails.licenseAdded,
                    };
                    
                    const updatedRows = [...tableRows, newRow]; // add more
                    dispatch(
                        updateTabData({
                            tabKey: "invoiceTableRows",
                            data: updatedRows,
                        })
                    );
                    setHsCodeInput(""); // clear input
                }}
                >
                Add
              </Button>
            </Grid>
          </Grid>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              onDelete={handleDelete}
              />
            <TableContainer>
              <Table>
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={tableRows.length}
                  />
                <TableBody>
                  {visibleRows.map((row) => (
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={selected.includes(row.id)}
                    tabIndex={-1}
                    key={row.id}
                    selected={selected.includes(row.id)}
                    sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selected.includes(row.id)}
                            sx={{
                                color: "brown",
                                "&.Mui-checked": {
                                    color: "brown",
                                },
                                "&.MuiCheckbox-indeterminate": {
                                    color: "brown",
                                },
                            }}
                            />
                        </TableCell>
                      </TableCell>
                      <TableCell>{row.hsCode}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.policyConditions}</TableCell>
                      <TableCell>
                        <Typography
                          component="span"
                          sx={{
                              color: "#9B1E26",
                              textDecoration: "underline",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                                setSelectedRow(row); // set current row data
                                setOpenModal(true);  // open modal
                            }}
                            >
                          View
                        </Typography>
                      </TableCell>

                      <TableCell>{row.licenseAdded}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Grid container>
            <Grid size={{ md: 12 }}>
              <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                }}
                >
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

                <Typography variant="body2" textAlign={"left"}>
                  This is to certify that end use of goods involved in this
                  transaction is not for arms and ammunition related purpose{" "}
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ md: 12 }}>
              <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                }}
                >
                <Checkbox
                  checked={checked2}
                  onChange={handleCheckboxChange2}
                  sx={{
                      padding: 0,
                      marginRight: 1,
                      color: "brown",
                      "&.Mui-checked": {
                          color: "brown",
                        },
                    }}
                    />
                <Typography variant="body2" textAlign={"left"}>
                  This transaction does not violate the provisions of
                  OFAC/US/UN/EU/India and other sanctions (as applicable) that
                  are currently in force <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Invoice Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} mt={1} ml={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 2,
                }}
                >
                <FormControlLabel
                  control={
                      <Checkbox
                      checked={checked3}
                      onChange={handleCheckboxChange3}
                      sx={{
                          color: "brown",
                          "&.Mui-checked": {
                              color: "brown",
                            },
                            "&.MuiCheckbox-indeterminate": {
                                color: "brown",
                            },
                        }}
                        />
                    }
                    label={
                        <Typography variant="body2">
                      Part Payment Already made
                    </Typography>
                  }
                  />

                <FormControl fullWidth variant="outlined">
                  <FormLabel sx={{ alignSelf: "start" }}>
                    Type of Import <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    size="small"
                    value={selectedImport}
                    onChange={handleImportChange}
                    fullWidth
                    >
                    <MenuItem value="">Select</MenuItem>
                    {importOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>


    {openModal && (
  <Box
    sx={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onClick={() => setOpenModal(false)}
  >
    <Paper
      sx={{
        minWidth: 300,
        padding: 4,
        backgroundColor: 'white',
        borderRadius: 2,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Typography variant="h6" gutterBottom>
        HS Code Details
      </Typography>
      {selectedRow && (
        <Box>
          <Typography><strong>HS Code:</strong> {selectedRow.hsCode}</Typography>
          <Typography><strong>Category:</strong> {selectedRow.category}</Typography>
          <Typography><strong>Description:</strong> {selectedRow.description}</Typography>
          <Typography><strong>Policy Conditions:</strong> {selectedRow.policyConditions}</Typography>
          <Typography><strong>License Added:</strong> {selectedRow.licenseAdded}</Typography>
        </Box>
      )}
      <Button
        onClick={() => setOpenModal(false)}
        sx={{ mt: 2, backgroundColor: '#9B1E26', color: 'white', '&:hover': { backgroundColor: '#7a121a' } }}
      >
        Close
      </Button>
    </Paper>
  </Box>
)}
    
                    </>
  );
};

export default InvoiceDetails;
