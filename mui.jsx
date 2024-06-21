import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

// Styled component for the quick filter input
const StyledQuickFilter = styled((props) => (
  <TextField
    variant="outlined"
    size="small"
    placeholder="Quick Filter"
    {...props}
    InputProps={{
      ...props.InputProps,
      style: {
        border: '1px solid #1976d2', // Change to desired border color
        borderRadius: '4px', // Adjust border radius if needed
      },
    }}
  />
))({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1976d2', // Initial border color
    },
    '&:hover fieldset': {
      borderColor: '#1976d2', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2', // Border color when focused
    },
  },
});

// Custom Toolbar with the styled quick filter
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) => searchInput.split(/\s+/).map((word) => word.trim())}
        componentsProps={{
          textField: {
            InputProps: {
              inputComponent: StyledQuickFilter,
            },
          },
        }}
      />
    </GridToolbarContainer>
  );
}

// Columns and rows data
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGrid', col2: 'MUI' },
  { id: 3, col1: 'Material', col2: 'UI' },
];

// Main App component
export default function App() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}