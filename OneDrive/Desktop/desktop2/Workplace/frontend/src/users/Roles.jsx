import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Typography, InputAdornment } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';  
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";


import Header from "../components/Header";





function Roles(props) {
  const [leave, setLeave] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [searchterm , setSearchterm] = useState('');

  const columns = [
    { field: "id", headerName: "id", width: 190  },
    { field: "Name", headerName: "TASK TITLE", width: 190 },
    {
      field: "Createdate",
      headerName: "Createdate",
      width: 110,
      editable: true,
    },

    {
      field: "actions",
      headerName: "ACTIONS",
      description: "This column has actions for the tasks.",
      sortable: false,
      width: 150,
  
      renderCell: (params) => (
       
        <IconButton
          color="primary"
          onClick={() => handleInfoClick(params.row.id)} // Define this handler function
        >
          <InfoIcon />
        </IconButton>
      ),
    }
    
  ];
  
  


  const handleInfoClick = (rowData) => {
    navigate(`/taskinfo/${rowData}`);
  };


  function handleserachterm(event)
  { 
    setSearchterm(event.target.value);

  }


 

  async function myLeaves() {
    const id = localStorage.getItem("id");
    const response = await fetch(`https://attractivemediaz.com/workplace/api/tasks/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.data)
      setLeave(data.data);
    }
  }

  useEffect(() => {
    myLeaves();
  }, []);



  function filterrows(rows, searchterm) {
    return rows.filter((row)=>{
      if (!searchterm) {
        return true; // Keep the row in the filtered result
      }

     


    })
  }

  let filteredRows = filterrows(rows, searchterm);

  useEffect(() => {
    const newRows = leave.map((leaveItem) => ({
      id: leaveItem.id,
      
    
    }));

    setRows(newRows);
  }, [leave]);

  return (
    <>
    
     
      <Box sx={{ height: "100%", width: "100%" }}>
        <Header
        title = "All Roles"
        />
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
          <Typography variant="h7">Tasks</Typography>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            onChange={handleserachterm}
            value={searchterm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          columnVisibilityModel={{
            id: false, // Hide the "fromDate" column here
          }}
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
      </Box>
    </>
  );
}

export default Roles;
