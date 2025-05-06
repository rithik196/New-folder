import React, { useState, useEffect,useRef } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import { updateTabData } from "../FormSlice"; // adjust the path

const Picklist = ({ fieldKey, tabKey, variant = "default", value = "" }) => {
  const dispatch = useDispatch();
  const storedValue = useSelector(
    (state) => state.form.formData[tabKey]?.[fieldKey] || ""
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedRow, setTempSelectedRow] = useState("");
  const currentTabData = useSelector(
    (state) => state.form.formData[tabKey] || {}
  );

  const syncedInitialValue = useRef(false);

  useEffect(() => {
    if (
      variant === "compact" &&
      value &&
      !storedValue &&
      !syncedInitialValue.current
    ) {
      dispatch(
        updateTabData({
          tabKey,
          data: {
            ...currentTabData,
            [fieldKey]: value,
          },
        })
      );
      syncedInitialValue.current = true;
    }
  }, [variant, value, storedValue, tabKey, fieldKey, currentTabData, dispatch]);
  
  const handleOpen = () => {
    setTempSelectedRow(storedValue);
    setIsModalOpen(true);
  };
  
  const handleClose = () => setIsModalOpen(false);

  const handleAddAndClose = () => {
    dispatch(
      updateTabData({
        tabKey,
        data: {
          ...currentTabData,
          [fieldKey]: tempSelectedRow,
        },
      })
    );
    handleClose();
  };

  const handleClear = () => {
    dispatch(
      updateTabData({
        tabKey,
        data: {
          ...currentTabData,
          [fieldKey]: "",
        },
      })
    );
    setTempSelectedRow("");
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
      <Grid container spacing={0} mt={0}>
        <Grid size={{ xs: 12, md: variant === "compact" ? 9.1 : 8.1 }}>
          <TextField
            size="medium"
            sx={{ width: variant === "compact" ? "262px" : "auto" }}
            value={storedValue}
            disabled
          />
        </Grid>
        <Grid size={{ xs: 12, md: variant === "compact" ? 1.4 : 1.9 }}>
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
        <Grid size={{ xs: 12, md: variant === "compact" ? 1.5 : 2 }}>
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
          <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField size="small" fullWidth placeholder="Search" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} textAlign="right">
              <Select size="small" defaultValue="" sx={{ minWidth: 150 }}>
                <MenuItem value="">All Columns</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>BIC Code</TableCell>
                  <TableCell>Institution Name</TableCell>
                  <TableCell>Physical Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>City</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell padding="checkbox">
                      <Radio
                        checked={tempSelectedRow === row.bicCode}
                        onChange={() => setTempSelectedRow(row.bicCode)}
                        sx={{
                          color: "#9B1E26",
                          "&.Mui-checked": {
                            color: "#9B1E26",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.bicCode}</TableCell>
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

        <DialogActions sx={{ justifyContent: "center", gap: 3, pb: 3, pt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "#9B1E26",
              color: "#9B1E26",
              borderRadius: "30px",
              width: "180px",
              height: "40px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddAndClose}
            disabled={!tempSelectedRow}
            sx={{
              backgroundColor: "#9B1E26",
              borderRadius: "30px",
              width: "180px",
              height: "40px",
              textTransform: "none",
              ":hover": { backgroundColor: "#7e1820" },
            }}
          >
            Add & Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Picklist;
