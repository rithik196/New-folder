import React from 'react'
import PageHeader from './PageHeader'
import TradeAdvImpPage from "./TradeAdvImpPage"
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/system';
import {secondaryTheme} from "../../theme"
const PageLayout = () => {
  return (
    
    <ThemeProvider theme={secondaryTheme}>
    <Box sx={{ display: "flex", flexDirection: "column", height:"80vh" }}>
      {/* Fixed Header */}
      <Box sx={{ width: "100%" }}>
        <PageHeader />
      </Box>
      
      {/* Sidebar and Content */}
      {/* <Box sx={{ display: "flex"  ,paddingTop:"9px", backgroundColor:"#efefef"}}> Adjust marginTop based on header height */}
     
        < TradeAdvImpPage/>
       
        {/* <Box sx={{ flexGrow: 1, padding: 1,marginTop:-5, overflowY: "auto" }}>
          <Outlet />
        </Box> */}
      </Box>
    {/* </Box> */}
    </ThemeProvider>
  )
}

export default PageLayout
