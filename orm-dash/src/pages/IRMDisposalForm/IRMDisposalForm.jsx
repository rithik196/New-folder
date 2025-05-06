import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Modal,
  Typography,
  FormControl,
  FormLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Picklist from "../../components/TradeAdvImpPage/Forms/picklist";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const IRMDisposalForm = () => {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state?.transactionId) {
      fetch(
        `https://nsgsolutiondemo.newgensoftware.net/irmDataFetch/api/data/${state.transactionId}`
      )
        .then((response) => {
          if (!response.ok) throw new Error("Data not found");
          return response.json();
        })
        .then((data) => {
          setFormData(data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
        })
        .finally(() => setLoading(false));
    }
  }, [state?.transactionId]);

  const handleSubmit = async () => {
    const xmlBody = `
<Attribute UserDefinedName="Disposal Instructions Received">
  <Attribute UserDefinedName="account_to_be_created">${formData.accountToBeCredited || ""}</Attribute>
  <Attribute UserDefinedName="type_of_account">${formData.accountType || ""}</Attribute>
  <Attribute UserDefinedName="amount">${formData.amount || ""}</Attribute>
  <Attribute UserDefinedName="currency">${formData.currency || ""}</Attribute>
  <Attribute UserDefinedName="full_partial_amount">${formData.amountType || ""}</Attribute>
  <Attribute UserDefinedName="treasury_rate">${formData.treasuryRate || ""}</Attribute>
  <Attribute UserDefinedName="settlement_instruction">${formData.settlementInstruction || ""}</Attribute>
  <Attribute UserDefinedName="purpose_code">${formData.purposeCode || ""}</Attribute>
</Attribute>`;

    try {
      const response = await fetch(
        "http://127.0.0.1:8081/assignWorkItem?userName=supervisor&password=System123%23&userIndex=1&workItemName=WF00-0000000178-process",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: xmlBody,
        }
      );

      if (!response.ok) throw new Error("Submission failed");
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error submitting form");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Accordion
        defaultExpanded
        sx={{ backgroundColor: "#FFFFFF !important", padding: "16px" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>IRM Disposal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 5,
            }}
          >
            <FormControl fullWidth required>
              <FormLabel className="form-label">
                Inward Remittance Reference Number
              </FormLabel>
              <TextField
                value={formData.referenceNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, referenceNumber: e.target.value })
                }
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Currency</FormLabel>
              <Select
                value={formData.currency || ""}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Amount</FormLabel>
              <TextField
                value={Number(formData.amount || 0).toLocaleString("en-IN")}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
                  if (!isNaN(rawValue)) {
                    setFormData({ ...formData, amount: rawValue });
                  }
                }}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Remitter Name</FormLabel>
              <TextField
                value={formData.beneficiary || ""}
                onChange={(e) =>
                  setFormData({ ...formData, beneficiary: e.target.value })
                }
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Type Of Account</FormLabel>
              <Select
                value={formData.accountType || ""}
                onChange={(e) =>
                  setFormData({ ...formData, accountType: e.target.value })
                }
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="EEFC">EEFC Account</MenuItem>
                <MenuItem value="Savings">Saving Account</MenuItem>
                <MenuItem value="Current">Current Account</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Account To Be Credited</FormLabel>
              <Select
                value={formData.accountToBeCredited || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountToBeCredited: e.target.value,
                  })
                }
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="1234567890">1234567890</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Full Amount/Partial Amount</FormLabel>
              <Select
                value={formData.amountType || ""}
                onChange={(e) =>
                  setFormData({ ...formData, amountType: e.target.value })
                }
              >
                <MenuItem value="Full amount">Full amount</MenuItem>
                <MenuItem value="Partial amount">Partial amount</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Treasury Rate/Deal no.(If Any)</FormLabel>
              <TextField
                value={formData.treasuryRate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, treasuryRate: e.target.value })
                }
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel className="form-label">
                Beneficiary Bank Swift Code
              </FormLabel>
              <Picklist
                variant="compact"
                value={formData.purposeCode || ""} // coming from API response
                onChange={(val) =>
                  setFormData({ ...formData, purposeCode: val })
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Settlement Instruction</FormLabel>
              <TextField
                value={formData.settlementInstruction || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    settlementInstruction: e.target.value,
                  })
                }
                fullWidth
                multiline
                rows={1}
              />
            </FormControl>

            <Box gridColumn="span 3" textAlign="right">
              <Button variant="outlined" onClick={handleOpen} sx={{ mr: 2 }}>
                XML
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit to API
              </Button>
            </Box>
          </Box>

          <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
              <Typography variant="h6">XML</Typography>
              <Box mt={4} textAlign="right">
                <Button onClick={handleClose}>Close</Button>
              </Box>
            </Box>
          </Modal>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default IRMDisposalForm;
