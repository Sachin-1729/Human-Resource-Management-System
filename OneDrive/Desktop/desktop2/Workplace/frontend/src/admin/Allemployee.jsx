import React from 'react'
import Headers from '../components/Header'
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Typography, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
function Allclient() {
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 140,
             // This hides the column
          },
        {
          field: 'firstName',
          headerName: 'Image',
          width: 150,
          editable: true,
          hide: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
      ];
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
  return (
    <div>
        <Headers title ="All Employees"></Headers>
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
            padding: "20px",
            alignItems: "center",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Typography variant="h7">All Employees</Typography>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
        
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Add">
            <IconButton
              sx={{
                color: "white",
                backgroundColor: "black",
                "&:hover": {
                  color: "black",
                },
                marginLeft: "auto",
              }}
              aria-label="add"
             
            >
              
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            backgroundColor: "white",
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />

    </div>
  )
}

export default Allclient