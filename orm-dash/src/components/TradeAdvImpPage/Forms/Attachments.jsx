import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DataGrid } from '@mui/x-data-grid';
import { Button, styled, Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import FileUploadIcon from '@mui/icons-material/FileUpload';


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-cell': {
    padding: '8px 16px',
    bgcolor:"#FFFFFF"
  },
}));

const Attachments = () => {
    const [rows, setRows] = useState([
      { id: 1, documentName: 'BOE_Bulk_Upload', action: 'Delete', status: 'ATTACHED' },
      { id: 2, documentName: 'Transport Documents (BL/AWB/Others) *', action: 'Delete', status: 'ATTACHED' },
      { id: 3, documentName: 'Bill of Entry', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 4, documentName: 'Credit Note', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 5, documentName: 'Invoice', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 6, documentName: 'High Seas Sales Agreement', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 7, documentName: 'Beneficiary Communication', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 8, documentName: 'Customer Declaration', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 9, documentName: 'Third Party Agreement', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 10, documentName: 'Others', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 11, documentName: 'SWIFT_COPY', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 12, documentName: 'DEBIT_ADVICE', action: 'Upload', status: 'NOT ATTACHED' },
      { id: 13, documentName: 'CRL or TT Application', action: 'Upload', status: 'NOT ATTACHED' },
    ]);
  

  const handleUpload = (id, file) => {
    setRows(prevRows => prevRows.map(row => 
      row.id === id ? { ...row, status: 'ATTACHED', action: 'Delete', file } : row
    ));
  };

  const handleDelete = (id) => {
    setRows(prevRows => prevRows.map(row => 
      row.id === id ? { ...row, status: 'NOT ATTACHED', action: 'Upload', file: undefined } : row
    ));
  };

  const columns = [
    { 
      field: 'documentName', 
      headerName: 'Document Name', 
      flex: 2,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={params.row.status === 'ATTACHED' ? 600 : 400}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <input
            type="file"
            hidden
            id={`upload-${params.row.id}`}
            onChange={(e) => e.target.files?.[0] && handleUpload(params.row.id, e.target.files[0])}
          />
          {params.row.status === 'NOT ATTACHED' ? (
            <Button
              variant="contained"
              
              startIcon={<FileUploadIcon />}
              onClick={() => document.getElementById(`upload-${params.row.id}`)?.click()}
              sx={{ borderRadius: '20px', textTransform: 'none' ,bgcolor:"#9B1E26" ,mb:3}}
            >
              Upload
            </Button>
          ) : (
            <Button
              variant="outlined"
              
              startIcon={<Delete />}
              onClick={() => handleDelete(params.row.id)}
              sx={{ borderRadius: '20px', textTransform: 'none' ,color:"#9B1E26",border:"1px solid #9B1E26" ,mb:3}}
            >
              Delete
            </Button>
          )}
        </>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'ATTACHED' ? 'success' : 'error'}
          variant="outlined"
          sx={{
            fontWeight: 500,
            borderWidth: '1.5px',
            mb:3,
            ...(params.value === 'ATTACHED' && {
              backgroundColor: '#008568',
              borderColor: '#2e7d32',
              color:"#FFFFFF"
            }),
            ...(params.value === 'NOT ATTACHED' && {
              backgroundColor: '#E9E9E9',
              borderColor: '#E9E9E9'
              , color:"#000000"
            })
          }}
        />
      ),
    },
  ];

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1">Documents</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ 
          fontSize: "14px", 
          display: 'flex', 
          alignItems: 'center',
          mb: 2
        }}>
          <InfoOutlinedIcon sx={{ color: "gray", fontSize: "18px", mr: 1 }} />
          Uploaded file size should be less than 5 MB, Supported Formats: txt, rtf, doc, docx, jpg, xls, zip, tif, jpeg, png, pdf, xlsx
        </Typography>
        <div style={{ height: 600, width: '100%' }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f6f6f6',
              },
            }}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Attachments;