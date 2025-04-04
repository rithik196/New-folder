import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from "react-router-dom";

  const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <CheckCircleOutlineIcon 
        sx={{ 
          fontSize: 80, 
          color: "#4CAF50", 
          mb: 2 
        }} 
      />
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Congratulations!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Your submission has been successfully completed.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
        sx={{
          backgroundColor: "#9B1E26",
          borderRadius: "32px",
          px: 4,
          "&:hover": {
            backgroundColor: "#80171D"
          }
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default SuccessPage