import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Sample JSON data import
import sampleData from "../../json files/sampledata.json";

export default function DynamicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(sampleData);
  }, []);

  if (data.length === 0) return <p>Loading...</p>;

  // Extract headers dynamically
  const headers = Object.keys(data[0]);

  return (
    <Paper
      sx={{
        borderRadius: "25px",
        overflow: "hidden", // Ensures border-radius visibility
        boxShadow: "none",
        padding: 2,
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 300,
          overflowY: "auto", // Enables vertical scrolling
          paddingRight: "8px", // Prevents scrollbar overlap
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="dynamic table">
          <TableHead>
            <TableRow sx={{ height: "40px" }}>
              {" "}
              {/* Adjust header row height */}
              {headers.map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#F6F6F6",
                    borderBottom: "none",
                    borderTopLeftRadius: header === headers[0] ? "25px" : "0px",
                    borderTopRightRadius:
                      header === headers[headers.length - 1] ? "25px" : "0px",
                    padding: "10px", // Reduce padding for equal spacing
                    marginBottom: "8px", // Adds spacing between rows
                  }}

                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "& td, & th": { borderBottom: "none" },
                  boxShadow: "0px 1px 4px 0px #25243B0D", // Apply box shadow
                  marginTop:"8px",
                  marginBottom: "8px", // Adds spacing between rows
                }}
              >
                {headers.map((header) => (
                  <TableCell key={header} sx={{ padding: "10px", fontWeight:"520"}}>
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
