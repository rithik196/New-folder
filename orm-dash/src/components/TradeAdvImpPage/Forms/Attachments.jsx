import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";


const Attachments = () => {
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Documents</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography ></Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Attachments;
