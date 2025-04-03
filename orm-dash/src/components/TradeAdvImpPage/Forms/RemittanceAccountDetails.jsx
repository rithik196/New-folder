import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox"; // Filled checkbox
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Empty checkbox


const initialRows = [
  {
    id: 1,
    account: "237812371283 - EEFC-GBP CURRENT ACCOUNT-OPEN",
    ccy: "USD",
    amount: "1,00,000",
  },
];

const RemittanceAccountDetails = () => {
  const [rows, setRows] = useState(initialRows);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, account: "", ccy: "", amount: "" },
    ]);
  };

  const handleDeleteRow = () => {
    setRows(rows.slice(0, -1)); // Remove the last row
  };

  const handleAccountChange = (id, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id
        ? { ...row, account: value, ccy: "USD", amount: "1,00,000" }
        : row
    );
    setRows(updatedRows);
  };

  const columns = [
    {
      field: "account",
      headerName: "Debit Account Number",
      width: 350,
      paddingLeft: "5px !important",
      renderCell: (params) => (
        <Grid container alignItems="center">
          <Select
            value={params.value}
            onChange={(e) => handleAccountChange(params.id, e.target.value)}
            displayEmpty
            sx={{ width: "280px !important" }}
          >
            <MenuItem value="">Select Account</MenuItem>
            <MenuItem value="237812371283 - EEFC-GBP CURRENT ACCOUNT-OPEN">
              237812371283 - EEFC-GBP CURRENT ACCOUNT-OPEN
            </MenuItem>
          </Select>
          <IconButton
            size="small"
            sx={{
              ml: 1,
              color: "#9B1E26",
              border: "1px solid #9B1E26",
              borderRadius: "5px",
            }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      ),
    },
    {
      field: "ccy",
      headerName: "CCY",
      width: 150,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
    {
      field: "amount",
      headerName: "Remit Amount",
      width: 250,
      renderCell: (params) => (
        <TextField size="small" value={params.value} variant="outlined" />
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, bgcolor: "#EDEDED" }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
          Remittance Account Details
        </Typography>
        <Grid >
          <Button
            startIcon={<DeleteIcon />}
            onClick={handleDeleteRow}
            sx={{ color: "#686873" }}
          >
            Delete
          </Button>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddRow}
            sx={{ color: "#9B1E26" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        hideFooter
        disableSelectionOnClick
        checkboxSelection
        getRowId={(row) => row.id}
        componentsProps={{
          baseCheckbox: {
            icon: <CheckBoxOutlineBlankIcon sx={{ color: "#9B1E26" }} />, // Unchecked
            checkedIcon: <CheckBoxIcon sx={{ color: "#9B1E26" }} />, // Checked
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F6F6F6",
            textAlign: "center", // Center-align column headers
          },
          "& .MuiDataGrid-row": { backgroundColor: "#FFFFFF" },
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-checkboxInput": { color: "#9B1E26 !important" },
          "& .MuiDataGrid-columnHeaderCheckbox": { display: "none" }, // Hide checkbox in header
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: "center", // Center-align header text
          },
        }}
      />
    </div>
  );
};

export default RemittanceAccountDetails;
