import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab, resetForm } from "../TradeAdvImpPage/FormSlice";

// Optional: simulate API
const api = {
  submitForm: async (data) => {
    console.log("Submitted:", data);
    return Promise.resolve();
  },
};

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTab, formData } = useSelector((state) => state.form);

  const handleSaveAndExit = () => {
    // Save logic here if needed
    navigate("/dashboard");
  };

  const handleNext = () => {
    if (currentTab < 7) {
      dispatch(setCurrentTab(currentTab + 1));
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentTab > 0) {
      dispatch(setCurrentTab(currentTab - 1));
    }
  };

  const handleSubmit = async () => {
    try {
      await api.submitForm(formData);
      dispatch(resetForm());
      navigate("/success");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: "#fff",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleSaveAndExit}
        sx={{ borderColor: "#9B1E26", color: "#9B1E26", borderRadius: "32px" }}
      >
        Save and Exit
      </Button>

      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          variant="outlined"
          disabled={currentTab === 0}
          onClick={handlePrevious}
          sx={{ borderColor: "#9B1E26", color: "#9B1E26", borderRadius: "32px" }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: "#9B1E26",
            borderRadius: "32px",
            "&:hover": { backgroundColor: "#9B1E26" },
          }}
        >
          {currentTab === 7 ? "Confirm and Submit" : "Save and Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
