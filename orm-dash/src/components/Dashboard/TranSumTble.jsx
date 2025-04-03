import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Button,
} from "@mui/material";

const statusColors = {
  "PENDING AT BANK": "#8D6B12",
  "PENDING AT CHECKER": "#D44F34",
  "DISCARDED BY BANK": "#C91F24",
  COMPLETED: "#157F52",
};

export default function DynamicTable({ filteredData }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  if (!filteredData || filteredData.length === 0) return <p>Loading...</p>;

  const headers = Object.keys(filteredData[0]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Pagination Rendering
  const renderPagination = () => {
    const visiblePages = 3;
    let pages = [];

    if (totalPages <= visiblePages) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (page < 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (page > totalPages - 4) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", page, page + 1, "...", totalPages];
      }
    }

    return pages.map((p, index) => (
      <Button
        key={index}
        onClick={() => typeof p === "number" && setPage(p - 1)}
        sx={{
          backgroundColor: page === p - 1 ? "#F6F6F6" : "transparent",
          color: p === "..." ? "#9B1E26" : page === p - 1 ? "#9B1E26" : "#9B1E26",
          borderRadius: "60%",
          padding: "6px 10px",
          margin: "0 5px",
          cursor: typeof p === "number" ? "pointer" : "default",
          fontWeight: page === p - 1 ? "bold" : "bold",
        }}
        disabled={typeof p !== "number"}
      >
        {p}
      </Button>
    ));
  };

  return (
    <Paper sx={{ borderRadius: "25px", padding: 2, boxShadow: "none" }}>
      <TableContainer sx={{ maxHeight: 350, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    "& td, & th": { borderBottom: "none" },
                    boxShadow: "0px 1px 4px 0px #25243B0D", // Apply box shadow
                    marginTop: "8px",
                    marginBottom: "8px", // Adds spacing between rows
                  }}
                >
                  {headers.map((header) =>
                    header === "Status" ? (
                      <TableCell key={header}>
                        <Chip
                          label={row.Status}
                          sx={{
                            backgroundColor: statusColors[row.Status] || "#000",
                            color: "white",
                            borderRadius: "7px",
                            padding: "4px 12px",
                            textTransform: "uppercase",
                            minWidth: "150px",
                            fontSize: "12px",
                          }}
                        />
                      </TableCell>
                    ) : (
                      <TableCell key={header}>{row[header]}</TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        //   disabled={page === 0}
          sx={{ fontSize: "20px", color: page === 0 ? "#9B1E26" : "#9B1E26" }}
        >
          ❮
        </Button>

        {renderPagination()}

        <Button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        //   disabled={page === totalPages - 1}
          sx={{
            fontSize: "20px",
            color: page === totalPages - 1 ? "#9B1E26" : "#9B1E26",
          }}
        >
          ❯
        </Button>
      </Box>
    </Paper>
  );
}
