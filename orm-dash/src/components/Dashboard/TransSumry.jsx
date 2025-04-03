import Grid from "@mui/material/Grid2";
import React, { useState, useEffect } from "react";
import { Typography, Divider } from "@mui/material";
import SearchBtn from "./SearchBtn";
import TranSumTble from "./TranSumTble";
import sampleData from "../../json files/TransData.json";

const TransSumry = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setData(sampleData);
    setFilteredData(sampleData);
  }, []);

  return (
    <Grid container spacing={2} bgcolor={"white"} borderRadius={"20px"}>
      <Grid size={{ xs: 12, md: 12 }} sx={{ mb: -3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7.5 }} sx={{ p: "12px" }}>
            <Typography>
              <b>Transaction Summary</b>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4.5 }}>
            {/* Pass Data & FilteredData to SearchBtn */}
            <SearchBtn data={data} setFilteredData={setFilteredData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <Divider />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        {/* Pass Filtered Data to Table */}
        <TranSumTble filteredData={filteredData} />
      </Grid>
    </Grid>
  );
};

export default TransSumry;
