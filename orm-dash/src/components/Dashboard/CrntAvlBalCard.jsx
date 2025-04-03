import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Divider, FormControl, Select, MenuItem } from "@mui/material";
import BalanceChart from "./CrntAvlBalCardChart";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import balanceData from "../../json files/balanceData.json"; // ✅ Import JSON data

const CrntAvlBalCard = () => {
  const [selectedAccount, setSelectedAccount] = useState("INR Account");
  const [chartData, setChartData] = useState(balanceData["INR Account"]); // ✅ Set default chart data

  // Handle dropdown change
  const handleChange = (event) => {
    const account = event.target.value;
    setSelectedAccount(account);
    setChartData(balanceData[account]); // ✅ Update chart based on selection
  };

  return (
    <Grid container spacing={2} bgcolor={"white"} borderRadius={"25px"}>
      <Grid item xs={12} sx={{ mb: -3 }}>
        <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 9}} sx={{ p: "12px" }}>
            <Typography>
              <b>Current Available Balances</b>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3}}>
            <FormControl sx={{ p: 1 }} size="small">
              <Select
                value={selectedAccount}
                onChange={handleChange}
                IconComponent={(props) => <ExpandMoreIcon {...props} sx={{ color: "#9B1E26 !important" }} />}
                sx={{
                  height: "30px",
                  minHeight: "30px",
                  border: "1px solid #DBDBDE",
                  borderRadius: "3px",
                  outline:"none",
                  "&.Mui-focused": { border:"none", outline: "none" },
                }}
              >
                {Object.keys(balanceData).map((account) => (
                  <MenuItem key={account} value={account}>
                    {account}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
      <Divider></Divider>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        
        <BalanceChart chartData={chartData} />
      </Grid>
    </Grid>
  );
};

export default CrntAvlBalCard;
