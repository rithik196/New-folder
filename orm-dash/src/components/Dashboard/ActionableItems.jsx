import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import data from "../../json files/data.json";

const ActionableItems = () => {
  const [actionableItems, setActionableItems] = useState([]);

  useEffect(() => {
    setActionableItems(data.actionableItems);
  }, []);

  return (
    <Box className="rounded-xl  p-3 mb-3   w-130 bg-[#FCF8F5]">
      <Typography variant="h6" className="font-bold mb-3 pl-9">
        Actionable Items:
      </Typography>
      <Grid container spacing={2}>
        {actionableItems.map((item, index) => (
          <Grid xs={6} md={4} key={index} className={`flex items-center  ml-[32px] }`}>
            <Typography variant="h2" className={`font-bold ${item.color} mr-2`}>
              {item.count.toString().padStart(2, "0")}
            </Typography>
            <Typography className="text-[#222222] text-sm pl-3 w-[107px]">
              {item.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActionableItems;
