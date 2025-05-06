import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import HistoryIcon from "@mui/icons-material/History";
import DraftsIcon from "@mui/icons-material/Drafts";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";


const SidebarComponent = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // Popover State
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, index) => {
    setSelected(index);

    if (index === 1) {
      // Outward Remittance Index
      event.preventDefault(); // Prevent navigation
      setAnchorEl(event.currentTarget); // Set popover anchor
    } else {
      setAnchorEl(null);
      navigate(menuItems[index].path);
    }
  };

  const handleNav=()=>{
    handleClose();
    navigate("/dashboard/trade-advance-imports");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "outward-remittance-popover" : undefined;

  const menuItems = [
    {
      icon: <DashboardIcon fontSize="large" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <ShoppingCartIcon fontSize="large" />,
      label: "Outward Remittance",
    },
    {
      icon: <CurrencyExchangeIcon fontSize="large" />,
      label: "Disposal Instructions",
      path: "/dashboard/IRM-disposal-grid",
    },
    {
      icon: <BarChartIcon fontSize="large" />,
      label: "Beneficiary List",
      path: "/beneficiary-list",
    },
    {
      icon: <LayersIcon fontSize="large" />,
      label: "Reports",
      path: "/reports",
    },
    {
      icon: <HistoryIcon fontSize="large" />,
      label: "History",
      path: "/history",
    },
    { icon: <DraftsIcon fontSize="large" />, label: "Drafts", path: "/drafts" },
  ];

  return (
    <div style={{ height: "89vh", display: "flex", marginTop: "-27px" }}>
      <Sidebar
        backgroundColor="#333333"
        width="80px"
        position="fixed"
        rootStyles={{
          borderRadius: "20px",
          marginTop: "14px",
          marginLeft: "10px",
          overflow: "hidden",
          backgroundColor: "#333333",
          paddingTop: "20px",
        }}
      >
        <Menu>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={(event) => handleClick(event, index)}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: selected === index ? "white" : "black",
                backgroundColor: selected === index ? "black" : "#333333",
                borderRight: selected === index ? "5px solid red" : "none",
                padding: "30px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {React.cloneElement(item.icon, {
                  style: {
                    color: "white",
                    fontSize: "30px",
                    paddingTop: "7px",
                  },
                })}
                <span
                  style={{
                    marginTop: "0px",
                    fontSize: "10px",
                    color: "white",
                    textAlign: "center",
                    
                    overflow: "visible",
                    textOverflow: "unset",
                    whiteSpace: "normal",
                    margin: "1px 0px",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </MenuItem>
          ))}
        </Menu>

        {/* Popover Component */}
        <Popover sx={{borderRadius:"20px",paperShadow:"none", bgcolor:"none",shadow:"none" }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <div
            style={{
              padding: "10px",
              minWidth: "200px",
              backgroundColor: "#222222",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              marginLeft:"5px"
            }}
          >
          
            
            <ListItemButton sx={{color:"#FFFFFF"}} onClick={handleNav}>
              Trade Advance Imports{" "}
              <AddIcon fontSize="small" style={{color:"#DA3442", marginLeft: "auto" }} />
            </ListItemButton>
            <ListItemButton sx={{color:"#FFFFFF"}} onClick={handleClose}>
              Trade Direct Imports{" "}
              <AddIcon fontSize="small" style={{color:"#DA3442", marginLeft: "auto" }} />
            </ListItemButton>
            <ListItemButton sx={{color:"#FFFFFF"}}onClick={handleClose}>
              Non-Trade{" "}
              <AddIcon fontSize="small" style={{color:"#DA3442", marginLeft: "auto" }} />
            </ListItemButton>
          </div>
        </Popover>

        <div
          style={{
            fontSize: "12px",
            position: "absolute",
            bottom: 10,
            width: "100%",
            textAlign: "center",
            color: "white",
          }}
        >
          <Divider sx={{ backgroundColor: "grey" }} />
          <span>Powered by:</span>
          <br />
          <img
            src="/newlogo.png"
            alt="Newgen Logo"
            style={{ width: "86px", filter: "brightness(0) invert(1)" }}
          />
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
