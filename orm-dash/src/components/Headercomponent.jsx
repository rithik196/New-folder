import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const menuOptions = ["Change Password", "Logout"];

const Headercomponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);

  const openAvatarMenu = Boolean(anchorEl);
  const openDropdownMenu = Boolean(dropdownAnchor);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClick = (event) => {
    setDropdownAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDropdownAnchor(null);
  };

  const handleClick =() =>{
    window.location.href = "/"; 
  }

  // Sample user details
  const userName =localStorage.getItem("username")
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="bg-white shadow-md  h-[69px] mt-[-13px]">
      <div className="flex justify-between items-center pl-4 ">
        {/* Left Section: Logo & Title */}
        <div className="flex items-center">
          <img src="/bankimage.svg" alt="Logo" className="w-20 h-20" />
          <span className="text-lg font-semibold ml-3">
            Newgen Trade System
          </span>
        </div>

        {/* Right Section: Notification, Avatar, and Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <NotificationsIcon className="text-[#9B1E26] text-3xl cursor-pointer" />
            <span className="absolute -top-0.5 -right-1 bg-[#FFDF66] text-black text-xs rounded-full px-1 py-0">
              8
            </span>
          </div>
          <Button
            onClick={handleDropdownClick}
            className="flex items-center space-x-2 text-[#686873]"
            sx={{ color: "#686873" }}
          >
            <Avatar
              sx={{
                bgcolor: "#686873",
                width: 30,
                height: 30,
                fontSize: "11px",
              }}
            >
              {userInitials}
            </Avatar>
            <span>{userName}</span>
            <ExpandMoreIcon  sx={{ color: "#9B1E26" }} />
          </Button>

          <Menu
            anchorEl={dropdownAnchor}
            open={openDropdownMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} sx={{ color: "#686873" }}>
              <LockOutlinedIcon
                sx={{ fontSize: 20, marginRight: 1, color: "#686873" }}
              />
              Change Password
            </MenuItem>
            <MenuItem onClick={handleClick} sx={{ color: "#686873" }}>
              <PowerSettingsNewOutlinedIcon
                sx={{ fontSize: 20, marginRight: 1, color: "#686873" }}
              />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Headercomponent;
