
import React from "react";
import Grid from '@mui/material/Grid2';
import DashHeader from "../components/Dashboard/DashHeader";
import AlltransCard from "../components/Dashboard/AlltransCard"
import CardRate from "../components/Dashboard/CardRate"
import CalenderCard from "../components/Dashboard/CalenderCard"
import TransSumry from "../components/Dashboard/TransSumry";
import CrntAvlBalCard from "../components/Dashboard/CrntAvlBalCard"
import FEMACard from "../components/Dashboard/FEMACard";
const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 12 }}>
        <DashHeader/>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <AlltransCard/>
      </Grid>
      <Grid size={{ xs: 12, md: 7.5 }}>
        <CardRate/>
      </Grid>
      <Grid size={{ xs: 12, md: 4.5 }}>
        <CalenderCard></CalenderCard>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TransSumry/>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <CrntAvlBalCard></CrntAvlBalCard>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <FEMACard></FEMACard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
