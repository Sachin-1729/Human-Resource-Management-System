import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import Search Icon
import Modal from "../components/Modal";
import Header from "../components/Header";


export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Initialize state for sorting: `keytosort` and `order`
  const [sort, setsort] = React.useState({
    keytosort: "status",
    order: "desc",
  });


 function dateformatter(date)
 { 
  let dateAns;
  for(let i =0; i<date.length; i++)
  {
    if(date[i] != '-' || date[i] !=':')
    {
      dateAns = dateAns + date[i];
    }
    parseInt(dateAns);
    return dateAns;
  }
 }


  function handleHeaderClick(event, column) {
    setsort({
      keytosort: column.id,
      order:
        column.id === sort.keytosort
          ? sort.order === "asc"
            ? "desc"
            : "asc"
          : "asc",
    });
  }

  function sortData(arrayToSort) {
    const array = arrayToSort.slice();
    return array.sort((a, b) => {
      if (sort.order === "desc") {
        return a[sort.keytosort] > b[sort.keytosort] ? -1 : 1;
      } else {
        return a[sort.keytosort] < b[sort.keytosort] ? 1 : -1;
      }
    });
  }

  // function sortData(arrayToSort, sort) {
  //   const array = arrayToSort.slice();
  
  //   return array.sort((a, b) => {
  //     let valueA = a[sort.keytosort];
  //     let valueB = b[sort.keytosort];
  
  //     // Check for date and time fields
  //     if (sort.keytosort === 'date') {
  //       valueA = new Date(a.date);
  //       valueB = new Date(b.date);
  //     } else if (sort.keytosort === 'check_in' || sort.keytosort === 'check_out') {
  //       // Combine date and time for complete Date comparison
  //       valueA = new Date(`${a.date} ${a[sort.keytosort]}`);
  //       valueB = new Date(`${b.date} ${b[sort.keytosort]}`);
  //     } else if (sort.keytosort === 'working_hours') {
  //       // Convert working_hours (HH:MM:SS) to seconds for accurate comparison
  //       const [hoursA, minutesA, secondsA] = a.working_hours.split(':').map(Number);
  //       const [hoursB, minutesB, secondsB] = b.working_hours.split(':').map(Number);
  //       valueA = hoursA * 3600 + minutesA * 60 + secondsA;
  //       valueB = hoursB * 3600 + minutesB * 60 + secondsB;
  //     }
  
  //     if (sort.order === "desc") {
  //       return valueB > valueA ? 1 : -1;
  //     } else {
  //       return valueA > valueB ? 1 : -1;
  //     }
  //   });
  // }
  

  const headCells = [
    { id: "date", label: "Date" },
    { id: "user", label: "User" },
    { id: "status", label: "Status" },
    { id: "punchIn", label: "Punch In" },
    { id: "punchOut", label: "Punch Out" },
    { id: "workingHours", label: "Working Hours" },
    { id: "actions", label: "Actions" }, // Add more as needed
  ];

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      const form = new FormData();
      form.append("id", id);
      const response = await fetch( 
        `https://attractivemediaz.com/workplace/api/attendance/${id}`,   
        {
          method: "GET",
          
        }
      ); // Adjust the API endpoint as necessary
      const data = await response.json();
      console.log(data.data ,"attendance");
      setAttendance(data.data.attendance);
     
    
    };
    fetchData();
  }, []);

  // Sorting and pagination logic (as in the previous example)


  const visibleRows = Array.isArray(attendance) ? attendance.slice() : [];

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, attendance.length - page * rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Header
      title = "Attendance"
      />
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <TableContainer>
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            gap="20px"
          >
            <Typography>Attendance</Typography>
            <TextField
              placeholder="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2, width: "300px" }}
              size="small"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "action.active" }} />
                ),
              }}
            />
          </Box>
          <Table stickyHeader aria-label="enhanced table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    onClick={(e) => handleHeaderClick(e, headCell)}
                  >
                    {headCell.label}{" "}
                    {sort.keytosort === headCell.id
                      ? sort.order === "desc"
                        ? "🔼"
                        : "🔽"
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortData(visibleRows, { keytosort: 'check_in', order: 'asc' }) 
                .filter((row) => {
                  if (searchTerm === "") {
                    return row;
                  } else if (
                    row?.ip_address
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return row;
                  } else if (
                    row?.status
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return row;
                  } else if (
                    row?.day?.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return row;
                  } else if (
                    row?.working_hours
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return row;
                  } else if (
                    row?.check_in
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return row;
                  } else if (
                    row?.check_out
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return row;
                  } else if (
                    localStorage
                      .getItem("name")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return row;
                  } else {
                    return null;
                  }
                })
                .map((row) => {
                  const isItemSelected = selected.indexOf(row.id) !== -1;
                  const labelId = `enhanced-table-checkbox-${row.id}`;

                  return (
                    <TableRow
                      hover
                      sx={{
                        backgroundColor:
                          parseInt(row?.working_hours?.split(":")[0]) < 9
                            ? "#e38181"
                            : "inherit",
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row?.day}
                      </TableCell>
                      <TableCell align="left">
                        {row?.user?.name} {row?.ip_address}
                      </TableCell>

                      <TableCell align="left">
                        <span
                          style={{
                            backgroundColor: "#32CD32",
                            padding: "5px",
                            color: "white",
                          }}
                        >
                          {row?.status.toUpperCase()}
                        </span>
                        {row.working_hours < "09:00:00" ? (
                          <span
                            style={{
                              marginLeft: "5px",
                              backgroundColor: "red",
                              padding: "5px",
                              color: "white",
                            }}
                          >
                            SH
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell align="left">{row?.check_in}</TableCell>
                      <TableCell align="left">{row?.check_out}</TableCell>
                      <TableCell align="left">{row?.working_hours}</TableCell>
                      <TableCell align="left" sx={{ cursor: "pointer" }}>
                        <Modal report={row?.report} />
                        
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={attendance.length}
          rowsPerPage={rowsPerPage}
          page={page}
        />
      </Paper>
    </Box>
  );
}
