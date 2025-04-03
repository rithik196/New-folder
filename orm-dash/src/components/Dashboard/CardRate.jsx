import Grid from "@mui/material/Grid2";
import React from "react";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import TableCard from "./TableCard"
const CardRate = () => {
  const currentDate = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Grid container spacing={2} bgcolor={"white"} borderRadius={"25px"}>
      <Grid size={{ xs: 12, md: 12 }} sx={{ mb: -3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }} sx={{ p: "12px" }}>
            <Typography>
              <b>Card Rate (Telegraphic Transfer)</b>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography sx={{ p: "12px" ,ml:12}}>
              Published on: <b>{currentDate}</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <Divider></Divider>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
       <TableCard/>
      </Grid>
    </Grid>
  );
};

export default CardRate;
