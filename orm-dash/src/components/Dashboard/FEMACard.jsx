import Grid from "@mui/material/Grid2";
import React from "react";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Fema from "./Fema";

const FEMACard = () => {

  return (
    <Grid container spacing={2} bgcolor={"white"} borderRadius={"25px"}>
      <Grid size={{ xs: 12, md: 12 }} sx={{ mb: -3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12}} sx={{ p: "12px" }}>
            <Typography>
              <b>FEMA Overdues</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <Divider></Divider>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
      <Fema></Fema>
      </Grid>
    </Grid>
  );
};

export default FEMACard;





