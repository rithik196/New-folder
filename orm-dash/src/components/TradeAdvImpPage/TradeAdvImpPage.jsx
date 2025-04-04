import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Footer from "./Footer";
import BasicDetails from "./Forms/BasicDetails";
import TransactionDetails from "./Forms/TransactionDetails";
import BeneficiaryDetails from "./Forms/BeneficiaryDetails";
import Grid from "@mui/material/Grid2";
import InvoiceDetails from "./Forms/InvoiveDetails"
import Attachments from "./Forms/Attachments"
import ShipmentDetails from "./Forms/ShipmentDetails"
import Declaration from "./Forms/Declaration"
import DealDetails from "./Forms/DealDetails"

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  

<Grid container spacing={2} sx={{ height: "80vh" }}>
  {/* Main Layout */}
    {/* Sidebar */}
    <Grid size={{xs:12,md:2.5}} sx={{ backgroundColor: "#efefef", paddingTop: "8px", borderTop: "1px dotted rgb(219, 219, 219)" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTab-root": { color: "#25243B", fontSize: "14px", padding: "8px 16px", fontWeight: "300", alignItems: "flex-start" },
          "& .Mui-selected": { backgroundColor: "#FFFFFF", color: "#25243B !important", fontWeight: "600", borderLeft: "3px solid #9B1E26" },
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        <Tab label="Basic Details" />
        <Tab label="Transaction Details" />
        <Tab label="Beneficiary Details" />
        <Tab label="Invoice Details" />
        <Tab label="Shipment Details" />
        <Tab label="Attachments" />
        <Tab label="Declarations" />
        <Tab label="Deal Details" />
      </Tabs>
    </Grid>

    {/* Content Panel */} 
    <Grid size={{xs:12,md:9.5}} sx={{ height: "101%" }}>
      {/* Content */}
      <Grid sx={{  padding: "20px", backgroundColor: "#FFFFFF", borderRadius: "20px", boxShadow: "0px 1px 4px #25243B0D" }}>
        {value === 0 && <BasicDetails />}
        {value === 1 && <TransactionDetails />}
        {value === 2 && <BeneficiaryDetails />}
        {value === 3 && <InvoiceDetails/>}
        {value === 4 && <ShipmentDetails/>}
        {value === 5 && <Attachments/>}
        {value === 6 && <Declaration/>}
        {value === 7 && <DealDetails/>}
        
      </Grid>

      {/* Footer */}
      <Grid sx={{ marginTop: 2, borderTopLeftRadius: "20px", borderTopRightRadius: "20px", overflow: "hidden"}}>
        <Footer value={value} setValue={setValue} />
      </Grid>
    </Grid>
</Grid>


  );
}
