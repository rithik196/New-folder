import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Select, MenuItem, TextField, IconButton, Button, Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useDispatch, useSelector } from "react-redux";
import { updateTabData } from "../FormSlice"; // ✅ Correct path

const RemittanceAccountDetails = () => {
  const dispatch = useDispatch();
  const reduxRows = useSelector((state) => state.form.formData.remittanceAccountDetails);
  const [rows, setRows] = useState(reduxRows || []);

  useEffect(() => {
    dispatch(updateTabData({ tabKey: "remittanceAccountDetails", data: rows }));
  }, [rows]);

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), account: "", ccy: "", amount: "" }]);
  };

  const handleDeleteRow = () => {
    setRows(rows.slice(0, -1));
  };

  const handleAccountChange = (id, value) => {
    const updated = rows.map((row) =>
      row.id === id ? { ...row, account: value, ccy: "USD", amount: "1,00,000" } : row
    );
    setRows(updated);
  };

  const handleAmountChange = (id, value) => {
    const updated = rows.map((row) =>
      row.id === id ? { ...row, amount: value } : row
    );
    setRows(updated);
  };

  const columns = [
    {
      field: "account",
      headerName: "Debit Account Number",
      width: 350,
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
          <IconButton size="small" sx={{ ml: 1, border: "1px solid #9B1E26",borderRadius: "5px", color: "#9B1E26" ,height: "30px", width: "30px"}}>
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
        <TextField
          size="small"
          variant="outlined"
          value={params.value}
          onChange={(e) => handleAmountChange(params.id, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, bgcolor: "#EDEDED" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "14px" ,padding: "15px"}}>
          Remittance Account Details
        </Typography>
        <Grid>
          <Button startIcon={<DeleteIcon />} onClick={handleDeleteRow} sx={{ color: "#686873" }}>
            Delete
          </Button>
          <Button startIcon={<AddIcon />} onClick={handleAddRow} sx={{ color: "#9B1E26" }}>
            Add
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        hideFooter
        checkboxSelection
        getRowId={(row) => row.id}
        
        componentsProps={{
          baseCheckbox: {
            icon: <CheckBoxOutlineBlankIcon sx={{ color: "#9B1E26"  }} />,
            checkedIcon: <CheckBoxIcon sx={{ color: "#9B1E26"  }} />,
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": { backgroundColor: "#F6F6F6", textAlign: "center" },
          "& .MuiDataGrid-row": { backgroundColor: "#FFFFFF",paddingTop: "7px" },
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-checkboxInput": { color: "#9B1E26 !important",marginTop: -2 },
          "& .MuiDataGrid-columnHeaderCheckbox": { display: "none" },
          "& .MuiDataGrid-columnHeaderTitleContainer": { justifyContent: "center" },
        }}
      />
    </div>
  );
};

export default RemittanceAccountDetails;
