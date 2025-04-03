import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Grid,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,

    Toolbar,
    IconButton,
    Tooltip,
    FormControlLabel,
    MenuItem,
    Select,

} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

function createData(id, hsCode, category, description, policyConditions, licenseAdded) {
    return { id, hsCode, category, description, policyConditions, licenseAdded };
}

const initialRows = [
    createData(1, '2811100', 'Chemical', 'Hydrogen Fluoride', '-', 'Yes'),

];

const headCells = [
    { id: 'hsCode', label: 'HS Code' },
    { id: 'category', label: 'Category' },
    { id: 'description', label: 'Description' },
    { id: 'policyConditions', label: 'Policy Conditions' },
    { id: 'action', label: 'Action' },
    { id: 'licenseAdded', label: 'License Added' },
];

function EnhancedTableHead({ onSelectAllClick, numSelected, rowCount }) {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {headCell.label}
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar({ numSelected, onDelete }) {
    return (
        <Toolbar sx={{ bgcolor: grey[200] }}>
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography variant="h6">HS Code Details</Typography>
            )}
            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

const InvoiceDetails = () => {

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const importOptions = [
        { value: "air", label: "Air" },
        { value: "sea", label: "Sea" },
        { value: "land", label: "Land" },
    ];

    const [selectedImport, setSelectedImport] = useState("");

    const handleImportChange = (event) => {
        setSelectedImport(event.target.value);
    };

    const handleCheckboxChange1 = (event) => {
        setChecked1(event.target.checked);
    };

    const handleCheckboxChange2 = (event) => {
        setChecked2(event.target.checked);
    };
    const handleCheckboxChange3 = (event) => {
        setChecked3(event.target.checked);
    };
    const [rows, setRows] = useState(initialRows);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSelectAllClick = (event) => {
        setSelected(event.target.checked ? rows.map((n) => n.id) : []);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [...selected];
        selectedIndex === -1 ? newSelected.push(id) : newSelected.splice(selectedIndex, 1);
        setSelected(newSelected);
    };

    const handleDelete = () => {
        setRows(rows.filter((row) => !selected.includes(row.id)));
        setSelected([]);
    };




    const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ p: 2 }}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Goods Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} mb={2}>
                        <Grid 
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                        size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth variant="outlined">
                                <FormLabel>HS Code</FormLabel>
                                <TextField variant="outlined" size="small" />
                            </FormControl>
                            <Button variant="contained" sx={{ mt: { xs: 2, md: 4 } }}>
                                Add
                            </Button>
                        </Grid>
                        
                    </Grid>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete} />
                        <TableContainer>
                            <Table>
                                <EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={rows.length} />
                                <TableBody>
                                    {visibleRows.map((row) => (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={selected.includes(row.id)}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={selected.includes(row.id)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={selected.includes(row.id)} />
                                            </TableCell>
                                            <TableCell>{row.hsCode}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{row.policyConditions}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    sx={{ mr: 1 }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        console.log('View clicked for ID:', row.id);
                                                    }}
                                                >
                                                    View
                                                </Button>

                                            </TableCell>
                                            <TableCell>{row.licenseAdded}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <FormControlLabel

                            control={
                                <Checkbox
                                    checked={checked1}
                                    onChange={handleCheckboxChange1}

                                />
                            }
                            label={
                                <Typography variant="body2">
                                    This is to certify that end use of goods involved in this transaction is not for arms and ammunition related purpose{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked2}
                                    onChange={handleCheckboxChange2}

                                />
                            }
                            label={
                                <Typography variant="body2">
                                    This transaction does not violate the provisions of OFAC/US/UN/EU/India and other sanctions (as applicable) that are currently in force{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </Typography>
                            }
                        />
                    </Box>

                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Invoice Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={checked3} onChange={handleCheckboxChange3} />}
                                    label={<Typography variant="body2">Part Payment Already made</Typography>}
                                />

                                <FormControl fullWidth variant="outlined">
                                    <FormLabel sx={{ alignSelf: 'start' }}>
                                        Type of Import <span style={{ color: "red" }}>*</span>
                                    </FormLabel>
                                    <Select size="small" value={selectedImport} onChange={handleImportChange} fullWidth>
                                        <MenuItem value="">Select</MenuItem>
                                        {importOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </Box>
    );
};

export default InvoiceDetails;