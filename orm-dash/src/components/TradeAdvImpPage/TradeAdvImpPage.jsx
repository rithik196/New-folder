import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid2";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentTab } from "../TradeAdvImpPage/FormSlice";

import Footer from "./Footer";
import BasicDetails from "./Forms/BasicDetails";
import TransactionDetails from "./Forms/TransactionDetails";
import BeneficiaryDetails from "./Forms/BeneficiaryDetails";
import InvoiceDetails from "./Forms/InvoiveDetails";
import Attachments from "./Forms/Attachments";
import ShipmentDetails from "./Forms/ShipmentDetails";
import Declaration from "./Forms/Declaration";
import DealDetails from "./Forms/DealDetails";

export default function VerticalTabs() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.form.currentTab);
  const formData = useSelector((state) => state.form.formData);

  const handleChange = (event, newValue) => {
    dispatch(setCurrentTab(newValue));
  };

  return (
    <Grid container spacing={2} sx={{ height: "81vh" }}>
      {/* Sidebar Tabs */}
      <Grid
      size={{ xs: 12, md: 2.5 }}
     
        sx={{
          backgroundColor: "#efefef",
          paddingTop: "8px",
          borderTop: "1px dotted rgb(219, 219, 219)",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={currentTab}
          onChange={handleChange}
          sx={{
            "& .MuiTab-root": {
              color: "#25243B",
              fontSize: "14px",
              padding: "8px 16px",
              fontWeight: "300",
              alignItems: "flex-start",
            },
            "& .Mui-selected": {
              backgroundColor: "#FFFFFF",
              color: "#25243B !important",
              fontWeight: "600",
              borderLeft: "3px solid #9B1E26",
            },
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

      {/* Tab Content */}
      <Grid size={{ xs: 12, md: 9.5 }}  sx={{ height: "102%", overflowY: "auto" }}>
        <Grid
          sx={{
            padding: "20px",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0px 1px 4px #25243B0D",
          }}
        >
          {currentTab === 0 && <BasicDetails initialData={formData.basicDetails} />}
          {currentTab === 1 && <TransactionDetails initialData={formData.transactionDetails} />}
          {currentTab === 2 && <BeneficiaryDetails initialData={formData.beneficiaryDetails} />}
          {currentTab === 3 && <InvoiceDetails initialData={formData.invoiceDetails} />}
          {currentTab === 4 && <ShipmentDetails initialData={formData.shipmentDetails} />}
          {currentTab === 5 && <Attachments initialData={formData.attachments} />}
          {currentTab === 6 && <Declaration initialData={formData.declarations} />}
          {currentTab === 7 && <DealDetails initialData={formData.dealDetails} />}
        </Grid>

        <Grid sx={{ marginTop: 2 }}>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
}
