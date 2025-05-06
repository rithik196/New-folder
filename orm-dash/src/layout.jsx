import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "./components/SideBar";
import Header from "./components/Headercomponent";
import { Box } from "@mui/material";


const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Fixed Header */}
      <Box sx={{ width: "100%" }}>
        <Header />
      </Box>
      
      {/* Sidebar and Content */}
      <Box sx={{ display: "flex"  ,paddingTop:"30px", backgroundColor:"#efefef"}}> {/* Adjust marginTop based on header height */}
        <SidebarComponent />
        <Box sx={{ flexGrow: 1, padding:2,marginTop:-4, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;