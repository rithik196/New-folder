import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import Headercomponent from "../../Headercomponent";
const SuccessPage = () => {
  const navigate = useNavigate();

  const data = {
    clientName: "Abhijeet Brothers Partnership Ltd.",
    remittanceType: "Trade-Direct Imports",
    onlineRequestId: "ORM-0000002186-Process",
    submissionDateTime: "14th January 2025 14:47",
    transactionAmount: "USD 20,00,000.00",
    executionDate: "14th January 2025",
    dealId: "-",
    totalAmount: "USD 20,00,000",
    pendingAmount: "20,00,000",
  };

  return (
    <>
    <Headercomponent></Headercomponent>
    <Box
    sx={{
      display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "50%",
          p: 4,
          
        }}
        >
        <Box display="flex" justifyContent="center" mb={2}>
          <CheckCircleIcon sx={{ fontSize: 60, color :"#008568"  }} />
        </Box>

        <Typography variant="h6" align="center" fontWeight="700" mb={1}>
          Congratulations!
        </Typography>

        <Typography variant="body2" align="center" mb={3}>
          Your transaction has been successfully submitted to the bank. For the pending deal amount, please contact the bank for rate booking.
        </Typography>

        <Grid  container spacing={1}>
          <Grid size={{md:6}} ><Typography >Client Name:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.clientName}</Typography></Grid>

          <Grid size={{md:6}} ><Typography >Remittance Type:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.remittanceType}</Typography></Grid>

          <Grid size={{md:6}} ><Typography>Online Request ID:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.onlineRequestId}</Typography></Grid>

          <Grid size={{md:6}} ><Typography >Transaction Submission Date & Time:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.submissionDateTime}</Typography></Grid>

          <Grid size={{md:6}} ><Typography >Transaction CCY & Amount:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.transactionAmount}</Typography></Grid>

          <Grid size={{md:6}} ><Typography >Transaction Execution Date:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.executionDate}</Typography></Grid>

          <Grid size={{md:6}} ><Typography >Deal ID:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.dealId}</Typography></Grid>

          <Grid size={{md:6}} ><Typography >Transaction CCY & Amount:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.totalAmount}</Typography></Grid>

          <Grid size={{md:6}} ><Typography>Pending Amount:</Typography></Grid>
          <Grid size={{md:6}} ><Typography fontWeight="bold">{data.pendingAmount}</Typography></Grid>
        </Grid >

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard")}
            sx={{
              borderColor: "#9B1E26",
              color: "#9B1E26",
              borderRadius: "32px",
              px: 4,
              "&:hover": {
                backgroundColor: "#9B1E26",
                color: "#fff",
              },
            }}
            >
            Close
          </Button>
        </Box>
      </Paper>
    </Box>
            </>
  );
};

export default SuccessPage;
