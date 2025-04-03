import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as XLSX from "xlsx";

export default function SearchBtn({ data, setFilteredData }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  // **Filter by only the numeric part of Trans ID**
  const handleSearch = (event) => {
    const query = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setSearchQuery(query);

    if (query) {
      const filtered = data.filter((item) => item["Trade ID#"].includes(query));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // **Download Function: Excel File**
  const handleDownload = () => {
    if (!data || data.length === 0) {
      alert("No transactions available to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Transactions");
    XLSX.writeFile(workbook, "filtered_transactions.xlsx");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: "5px 10px" }}>
      <TextField
        placeholder="Search by Trans ID"
        variant="standard"
        size="small"
        sx={{ width: "180px" }}
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "#9B1E26", cursor: "pointer" }} />
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={handleDownload} sx={{ color: "#9B1E26", borderColor: "#9B1E26", textTransform: "none" }}>
        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
        Download Transaction List
      </Button>
    </Box>
  );
}
