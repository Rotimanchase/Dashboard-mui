import React, { useState } from 'react';
import { Search, ViewColumn } from '@mui/icons-material';
import {
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { Toolbar, useGridApiContext } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const apiRef = useGridApiContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleColumnsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColumnsMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColumnToggle = (field) => {
    const visibility = apiRef.current.getColumnVisibilityModel();
    apiRef.current.setColumnVisibilityModel({
      ...visibility,
      [field]: !visibility[field],
    });
    handleColumnsMenuClose();
  };

  const columns = apiRef.current.getAllColumns() || [];

  return (
    <Toolbar>
      <FlexBetween width="100%">
        <FlexBetween>
          <Button startIcon={<ViewColumn />} onClick={handleColumnsMenuOpen}>
            Columns
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleColumnsMenuClose}>
            {columns.map((col) => (
              <MenuItem key={col.field}
                onClick={() => handleColumnToggle(col.field)}
                sx={{ fontWeight: apiRef.current.getColumnVisibilityModel()[col.field] ? 'bold' : 'normal' }} >
                {col.headerName || col.field}
              </MenuItem>
            ))}
          </Menu>
          <Button
            onClick={() => apiRef.current.exportDataAsCsv({ fileName: 'transactions.csv' })}>
            Export CSV
          </Button>
        </FlexBetween>
        <TextField
          label="search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant='standard'
          // eslint-disable-next-line
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('');
                }}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </Toolbar>
  );
};

export default DataGridCustomToolbar;