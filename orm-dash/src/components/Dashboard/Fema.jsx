import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import data from "../../json files/femaData.json";

const Fema = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "285px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={4}
        columns={12}
        sx={{ width: "100%", textAlign: "center", padding: 4, marginTop: -4 }}
      >
        <Grid size={{ xs: 2, md: 4 }}></Grid>
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
            &lt;=180 Days
          </Typography>
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
            &gt;180 Days
          </Typography>
        </Grid>

        <Grid size={{ xs: 2, md: 4 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 500, textAlign: "left" }}>
            Count of <br /> BOE Outstanding
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 2, sm: 4, md: 4 }}
          sx={{
            bgcolor: "#F4F9FF",
            color: "#222222",
            p: 1,
            borderRadius: 2,
            fontSize: "24px",
            fontWeight: 400,
            justifyContent: "center",
          }}
        >
          <Typography>{data.boeOutstanding[0]}</Typography>
        </Grid>
        <Grid
          size={{ xs: 2, sm: 4, md: 4 }}
          sx={{
            bgcolor: "#FFF6F4",
            color: "#D60B26",
            p: 1,
            borderRadius: 2,
            fontSize: "24px",
            fontWeight: 400,
          }}
        >
          <Typography>{data.boeOutstanding[1]}</Typography>
        </Grid>

        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 500, textAlign: "left" }}>
            Count of ORM <br /> Outstanding
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 2, sm: 4, md: 4 }}
          sx={{ bgcolor: "#F4F9FF", color: "#222222", p: 1, borderRadius: 2 }}
        >
          <Typography>{data.ormOutstanding[0]}</Typography>
        </Grid>
        <Grid
          size={{ xs: 2, sm: 4, md: 4 }}
          sx={{ bgcolor: "#FFF6F4", color: "#D60B26", p: 1, borderRadius: 2 }}
        >
          <Typography>{data.ormOutstanding[1]}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Fema;
