import React, { useState } from "react";
import {
    Box,
    Typography,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { updateTabData } from "../FormSlice";

const Declaration = () => {
    // const [checked1, setChecked1] = useState(false);
    // const [checked2, setChecked2] = useState(false);

      const dispatch = useDispatch();
      const declarationData = useSelector(
        (state) => state.form.formData.declarations || {});

        const checked1 = declarationData.checkboxes?.checked1 || false;
        const checked2 = declarationData.checkboxes?.checked2 || false;

   const handleCheckboxChange1 = (event) => {
      dispatch(
        updateTabData({
          tabKey: "declarations",
          data: {
            ...declarationData,
            checkboxes: {
              ...declarationData.checkboxes,
              checked1: event.target.checked,
            },
          },
        })
      );
    };
   const handleCheckboxChange2 = (event) => {
      dispatch(
        updateTabData({
          tabKey: "declarations",
          data: {
            ...declarationData,
            checkboxes: {
              ...declarationData.checkboxes,
              checked2: event.target.checked,
            },
          },
        })
      );
    };
    return (
        <Box className="boxcontainer">
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Declaration</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid size={{md:12}}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" ,height:165}}>
                                <Checkbox 
                                    checked={checked1} 
                                    onChange={handleCheckboxChange1} 
                                    sx={{ marginTop: "3px", padding: 0, marginRight: 1,color: "brown",
                                        "&.Mui-checked": {
                                          color: "brown",
                                        }, }} 
                                />
                                <Typography variant="body2" textAlign={"left"}>
                                    I/We hereby declare that all Foreign Exchange transactions, as may be entrusted 
                                    to IDFC Bank Limited from time to time, will be in strict conformity with the 
                                    provisions of the Foreign Exchange Management Act, 1999 ("the Act"). Further, 
                                    we also declare that said transactions, as and when initiated, shall not involve 
                                    and shall not be designed for the purpose of any contravention or evasion of the 
                                    provisions of the Act or any rule, regulation, notification, direction, or order 
                                    made under the Act. I/We further declare that the undersigned has/have the authority 
                                    to give this declaration and undertaking on behalf of the firm/company{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid  size={{md:12}}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                                <Checkbox 
                                    checked={checked2} 
                                    onChange={handleCheckboxChange2} 
                                    sx={{ marginTop: "3px", padding: 0, marginRight: 1 ,color: "brown",
                                        "&.Mui-checked": {
                                          color: "brown",
                                        },}} 
                                />
                                <Typography variant="body2" textAlign={"left"}>
                                    I/We declare that the statements made by me/us on this form are true and that 
                                    I/we have not applied for authorization through any other bank and also understand 
                                    that the foreign exchange to be acquired by me/us pursuant to this application 
                                    shall be used by me/us only for the purpose for which it is acquired and that the 
                                    conditions subject to which the exchange is granted will be complied with. Further, 
                                    I/we also declare that the invoice value of the goods which is declared on this form 
                                    is the real value of the goods into India{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default Declaration;