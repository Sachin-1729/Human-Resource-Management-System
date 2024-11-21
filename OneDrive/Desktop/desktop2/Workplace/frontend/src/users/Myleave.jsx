import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Typography, InputAdornment } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const columns = [
  { field: "id", headerName: "APPLY DATE", width: 190 },
  {
    field: "fromDate",
    headerName: "FROM DATE",
    width: 110,
    editable: true,
  },
  {
    field: "toDate",
    headerName: "TO DATE",
    width: 110,
    editable: true,
  },
  {
    field: "type",
    headerName: "TYPE",
    width: 160,
    editable: true,
  },
  {
    field: "Noofdays",
    headerName: "NO OF DAYS",
    description: "This column shows the number of days for the leave.",
    sortable: true,
    width: 160,
    valueGetter: (params) => (params)
  },
  {
    field: "status",
    headerName: "STATUS",
    description: "This column shows the status of the leave.",
    sortable: false,
    width: 160,
  },
  {
    field: "actions",
    headerName: "ACTIONS",
    description: "This column has actions for the leave.",
    sortable: false,
    width: 160,
  },
];

function Myleave() {
  const [leave, setLeave] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchterm , setSearchterm] = useState('');
  const navigate = useNavigate();


  function handleserachterm(event)
  { 
    setSearchterm(event.target.value);

  }

  function navigation()
  { 
    navigate('/createleave');

  }

 

  async function myLeaves() {
    const id = localStorage.getItem("id");
    const response = await fetch(`https://attractivemediaz.com/workplace/api/leaves/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      setLeave(data.data);
    }
  }

  useEffect(() => {
    myLeaves();
  }, []);

  function convertUTCToIST(utcDateString) {
    const utcDate = new Date(utcDateString);
    const utcTime = utcDate.getTime();
    const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // IST offset in milliseconds
    const istTime = new Date(utcTime + istOffset);
    return istTime.toISOString().replace("T", " ").substring(0, 19); // Format: "YYYY-MM-DD HH:mm:ss"
  }

  function filterrows(rows, searchterm) {
    return rows.filter((row)=>{
      if (!searchterm) {
        return true; // Keep the row in the filtered result
      }

      const lowerSearchTerm = searchterm.toLowerCase();

    return (
      (row.fromDate && row.fromDate.toLowerCase().includes(lowerSearchTerm)) ||
      (row.toDate && row.toDate.toLowerCase().includes(lowerSearchTerm)) ||
      (row.type && row.type.toLowerCase().includes(lowerSearchTerm)) ||
      (row.status && row.status.toLowerCase().includes(lowerSearchTerm)) ||
      (row.id && row.id.toLowerCase().includes(lowerSearchTerm))
    );

    })
  }

  let filteredRows = filterrows(rows, searchterm);

  useEffect(() => {
    const newRows = leave.map((leaveItem) => ({
      id: convertUTCToIST(leaveItem.created_at),
      fromDate: (leaveItem.leave_from),
      toDate: (leaveItem.leave_to),
      type: leaveItem.leave_type,
      Noofdays: parseInt(leaveItem.no_of_days), // Default to 0 if undefined
      status: leaveItem.status,
    }));

    setRows(newRows);
  }, [leave]);

  return (
    <>
     
      <Box sx={{ height: "100%", width: "100%" }}>
        <Header
        title = "My Leaves"/>
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
          <Typography variant="h7">Leaves</Typography>
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
              onClick={navigation}
            >
              
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <DataGrid
          rows={filteredRows}
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
      </Box>
    </>
  );
}

export default Myleave;
