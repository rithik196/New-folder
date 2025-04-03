import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import data from "../../json files/data.json";
const PageHeader = () => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "17px", padding: "2px" }}>
        Initiation: ORM - 2813
        </Typography>
      </Grid>


      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#606060",
            padding: "2px",
          }}
        >
          Customer Name:
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: "14px", padding: "2px" }}>
          {data.companyName}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#606060",
            padding: "2px",
          }}
        >
          Customer ID:{" "}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: "14px", padding: "2px" }}>
          {data.customerID}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#606060",
            padding: "2px",
          }}
        >
          Branch code:{" "}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: "14px", padding: "2px" }}>
          {data.branchCode}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#606060",
            padding: "2px",
          }}
        >
          Role:{" "}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: "14px", padding: "2px" }}>
          {data.role}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
