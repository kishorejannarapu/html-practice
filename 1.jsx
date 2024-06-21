import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { useState } from 'react';

// Columns and rows data
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

const initialRows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGrid', col2: 'MUI' },
  { id: 3, col1: 'Material', col2: 'UI' },
];

// Main App component
export default function App() {
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    // Apply filtering logic
    const filteredRows = initialRows.filter((row) =>
      Object.values(row).some(
        (cell) =>
          typeof cell === 'string' &&
          cell.toLowerCase().includes(value.toLowerCase())
      )
    );
    setRows(filteredRows);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Quick Filter"
        value={filter}
        onChange={handleFilterChange}
        style={{
          marginBottom: '10px',
          border: '1px solid #1976d2', // Change to desired border color
          borderRadius: '4px', // Adjust border radius if needed
        }}
        InputProps={{
          style: {
            padding: '8px', // Adjust padding if needed
          },
        }}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}