import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IRMDisposal = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://nsgsolutiondemo.newgensoftware.net/irmDataFetch/api/data')
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Raw API Response:', data); // Add this to verify structure
            if (Array.isArray(data)) {
              setRows(data);
            } else {
              console.error('Expected array but got:', data);
              setRows([]);
            }
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, []);
      
      
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 ,borderRadius:4
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFFFFF" }}>
              <TableCell colSpan={14}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    IRM Disposal
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            
              <TableCell>Product Name</TableCell>
              <TableCell>Transaction Id</TableCell>
              <TableCell>Date Of Initiation</TableCell>
              <TableCell>Beneficiary</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {rows.length > 0 ? (
    rows.map((row) => (
      <TableRow
        key={row.transactionId}
        hover
        sx={{ cursor: "pointer" }}
        onClick={() =>
          navigate("/dashboard/IRM-disposal-grid/irm-disposal-form", { 
            state: { transactionId: row.transactionId }
          })
        }
      >
        <TableCell>{row.productName}</TableCell>
        <TableCell>{row.transactionId}</TableCell>
        <TableCell>{row.dateOfInitiation}</TableCell>
        <TableCell>{row.beneficiary}</TableCell>
        <TableCell>{row.currency}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.status}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} align="center">
        No data 
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default IRMDisposal;
