To ensure that clicking on a page number calls the server and sends the correct page number, you need to make sure that your `onPageChange` handler is correctly updating the state and triggering a data fetch. Here is a step-by-step example of how to do this using MUI DataGrid with server-side pagination.

### Complete Example

1. **Set Up the Project**:
   - Ensure you have the necessary dependencies installed:
     ```bash
     npm install @mui/material @mui/x-data-grid axios
     ```

2. **Create the DataGrid Component**:

   ```jsx
   import React, { useState, useEffect } from 'react';
   import { DataGrid } from '@mui/x-data-grid';
   import axios from 'axios';

   const ServerSideDataGrid = () => {
     const [page, setPage] = useState(0);
     const [pageSize, setPageSize] = useState(10);
     const [rowCount, setRowCount] = useState(0);
     const [rows, setRows] = useState([]);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
       const fetchData = async () => {
         setLoading(true);
         try {
           const response = await axios.get('/api/data', {
             params: {
               page: page + 1, // API pages are usually 1-based
               pageSize,
             },
           });
           setRows(response.data.rows);
           setRowCount(response.data.totalCount);
         } catch (error) {
           console.error('Error fetching data:', error);
         } finally {
           setLoading(false);
         }
       };

       fetchData();
     }, [page, pageSize]);

     const handlePageChange = (newPage) => {
       setPage(newPage);
     };

     const handlePageSizeChange = (newPageSize) => {
       setPageSize(newPageSize);
       setPage(0); // reset to first page when page size changes
     };

     return (
       <div style={{ height: 400, width: '100%' }}>
         <DataGrid
           rows={rows}
           columns={[
             { field: 'id', headerName: 'ID', width: 90 },
             { field: 'name', headerName: 'Name', width: 150 },
             { field: 'age', headerName: 'Age', width: 110 },
             { field: 'address', headerName: 'Address', width: 200 },
           ]}
           pagination
           page={page}
           pageSize={pageSize}
           rowCount={rowCount}
           paginationMode="server"
           onPageChange={handlePageChange}
           onPageSizeChange={handlePageSizeChange}
           loading={loading}
         />
       </div>
     );
   };

   export default ServerSideDataGrid;
   ```

### Explanation

1. **State Management**:
   - `page` and `pageSize` state variables keep track of the current page and page size.
   - `rowCount` stores the total number of rows available from the server.
   - `rows` contains the current page's data.
   - `loading` is used to show a loading spinner while data is being fetched.

2. **Fetching Data**:
   - The `useEffect` hook is used to fetch data from the server whenever `page` or `pageSize` changes.
   - An `axios` GET request is made to the server, sending `page` and `pageSize` as query parameters.
   - The server should return an object with `rows` (the current page data) and `totalCount` (the total number of rows).

3. **Handling Page and Page Size Changes**:
   - `handlePageChange` updates the `page` state when a new page is selected. This triggers the `useEffect` hook to fetch new data for the selected page.
   - `handlePageSizeChange` updates the `pageSize` state when a new page size is selected. It also resets the `page` to `0` to start from the first page with the new page size. This also triggers the `useEffect` hook to fetch new data.

4. **DataGrid Configuration**:
   - The `DataGrid` component is configured with the necessary props for server-side pagination: `pagination`, `paginationMode="server"`, `page`, `pageSize`, and `rowCount`.
   - The `onPageChange` and `onPageSizeChange` handlers update the respective state variables.
   - The `loading` prop shows a loading spinner while data is being fetched.

### Summary

This setup ensures that when a page number is clicked or the page size is changed, the server is called with the correct parameters, and the `DataGrid` is updated with the new data. This approach provides a seamless server-side pagination experience in a React application using MUI DataGrid. Make sure your server endpoint `/api/data` is configured to handle `page` and `pageSize` query parameters and return the appropriate data structure.