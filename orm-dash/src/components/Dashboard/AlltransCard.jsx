import Grid from "@mui/material/Grid2";
import React from "react";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TransactionCard from "../../components/Dashboard/TransactionCard";
import ActionableItems from "./ActionableItems";

const AlltransCard = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container spacing={2} bgcolor={"white"} borderRadius={"20px"}>
      <Grid size={{ xs: 12, md: 12 }} sx={{ mb: -3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 10 }} sx={{ p: "12px" }}>
            <Typography>
              <b>All Transaction Status</b>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl sx={{ p: 1 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={"All Products"}
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"All Products"}>All Products</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <Divider></Divider>
      </Grid>
      <Grid size={{ xs: 12, md: 5.5 }}>
        <Typography>
          <TransactionCard></TransactionCard>
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 1 }}>
        <Divider orientation="vertical" flexItem sx={{ height: "95%" }} />
      </Grid>
      <Grid size={{ xs: 12, md: 5.5 }}>
        <ActionableItems></ActionableItems>
      </Grid>
    </Grid>
  );
};

export default AlltransCard;
