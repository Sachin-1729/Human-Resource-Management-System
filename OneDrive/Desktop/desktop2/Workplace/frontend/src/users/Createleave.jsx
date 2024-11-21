// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
// } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from 'dayjs';

// function Createleave() {
//   const date = new Date();

//   const [leavetype, setLeavetype] = useState("Privilege Leave");
//   const [LeaveFrom, setLeaveFrom] = useState(null);
//   const [LeaveTo, setLeaveTo] = useState(null);
//   const [reason, setReason] = useState("");
//   const [noofDays , setNoofDays] = useState(0);


//   function handleleavefrom(event) {
    
//     setLeaveFrom(event.$d);

//   }

//   function handleleaveto(event) {


//     setLeaveTo(event.$d);
//   }

//   function handlereason(event) {
//     setReason(event.target.value);
//   }

//   return (
//     <div >
//       <Header title="New Leave Request"></Header>
//       <Box   sx={{ padding: "20px", backgroundColor: "#fff" }}>
//         <Typography variant="h6" gutterBottom>
//           General Information
//         </Typography>
//         <InputLabel id="leave-type-label">Leave Type</InputLabel>
//         <FormControl fullWidth variant="outlined">
//           <Select
//             labelId="leave-type-label"
//             id="leave-type"
//             name="leave_type"
//             value={leavetype}
//             onChange={(event) => setLeavetype(event.target.value)}
//           >
//             <MenuItem value="Privilege Leave">Privilege Leave</MenuItem>
//             <MenuItem value="Marriage Leave">Marriage Leave</MenuItem>
//             <MenuItem value="Casual Leave">Casual Leave</MenuItem>
//             <MenuItem value="Sick Leave">Sick Leave</MenuItem>
//             <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
//           </Select>
//         </FormControl>
//         <br />
//         <br />
//         <Box
//           display="flex"
//           gap="10px"
//           justifyContent="space-between"
//           width="100%"
//         >
//           <Box>
//             <InputLabel id="datefrom">Leave From</InputLabel>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["DatePicker"]}>
//                 <Box sx={{ width: 300 }}>
//                   <DatePicker value={LeaveFrom}  onChange={handleleavefrom} />
//                 </Box>
//               </DemoContainer>
//             </LocalizationProvider>
//           </Box>
//           <Box>
//             <InputLabel id="datefrom">Leave To</InputLabel>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["DatePicker"]}>
//                 <DatePicker value={LeaveTo}  onChange={handleleaveto} />
//               </DemoContainer>
//             </LocalizationProvider>
//           </Box>
//         </Box>
//         <br />

//         <InputLabel id="Noofdays">No of Days</InputLabel>
//         <TextField
//           size="medium"
//           fullWidth
//           type="number"
//           id="Noofdays"
//           placeholder="No of Days"
//           value={noofDays}
//           onChange={(e) => setNoofDays(e.target.value)}
//         ></TextField>
//         <br />
//         <br />
//         <InputLabel id="Reason">Reason</InputLabel>
//         <TextField
//           size="medium"
//           fullWidth
//           type="text"
//           id="Noofdays"
//           placeholder="Reason"
//           multiline
//           rows={4}
//           variant="outlined" // Variant can also affect height; try 'filled' if desired
//           onChange={handlereason}
//           value={reason}
//         />
//         <br />
//         <br />

//         <Box display="flex" justifyContent="flex-end">
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{ borderRadius: "4px" , backgroundColor: "#de9a25" }}
//           >
//             Submit Leave Request
//           </Button>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Createleave;
import React, { useState } from "react";
import Header from "../components/Header";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Createleave() {
  const [leavetype, setLeavetype] = useState("Privilege Leave");
  const [LeaveFrom, setLeaveFrom] = useState(dayjs());  // Set initial state as dayjs object if needed
  const [LeaveTo, setLeaveTo] = useState(dayjs());      // Same here for LeaveTo
  const [reason, setReason] = useState("");
  const [noofDays, setNoofDays] = useState('');

  function handleleavefrom(newValue) {
    setLeaveFrom(newValue);  // Use newValue directly as it is a dayjs object
    console.log(newValue);
  }

  function handleleaveto(newValue) {
    setLeaveTo(newValue);    // Use newValue directly as it is a dayjs object
  }

  function handlereason(event) {
    setReason(event.target.value);
  }

  function dateformatter(date)
  {
    const year = date.$y;
    const month = date.$M + 1;
    const day = date.$D;
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

  async function handlesubmit(event)
  { 
    event.preventDefault();
    const form = new FormData();
    // Append the email and password states to the FormData
    const id = localStorage.getItem('id');
    form.append('user', id);
    form.append('status', 'Pending');
    form.append('leave_type', leavetype);
    form.append('leave_from', dateformatter(LeaveFrom));
    form.append('leave_to', dateformatter(LeaveTo));
    form.append('reason', reason);
    form.append('no_of_days', noofDays);
    
    const response = await fetch('https://attractivemediaz.com/workplace/api/leave-store', {
      method: 'POST',
      body: form,
    });

    if(response.ok)
    { 
      const data = await response.json();
      toast.success(data.message);
      setLeavetype('Privilege Leave');
      setLeaveFrom(dayjs());  // Set initial state as dayjs object if needed
      setLeaveTo(dayjs());    // Same here for LeaveTo
      setReason('');
      setNoofDays('');
    }
    else
    {
      const data = await response.json();
      toast.error(data.message);
    }
  }

  return (
    <div>
      <Header title="New Leave Request"></Header>
      <Box component="form" onSubmit={handlesubmit}  sx={{ padding: "20px", backgroundColor: "#fff" }}>
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <InputLabel id="leave-type-label">Leave Type</InputLabel>
        <FormControl fullWidth variant="outlined">
          <Select
            labelId="leave-type-label"
            id="leave-type"
            name="leave_type"
            value={leavetype}
            required
            onChange={(event) => setLeavetype(event.target.value)}
          >
            <MenuItem value="Privilege Leave">Privilege Leave</MenuItem>
            <MenuItem value="Marriage Leave">Marriage Leave</MenuItem>
            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Box display="flex" gap="10px" justifyContent="space-between" width="100%">
          <Box>
            <InputLabel id="datefrom">Leave From</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <Box sx={{ width: 300 }}>
                  <DatePicker value={LeaveFrom} required onChange={handleleavefrom} />
                </Box>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box>
            <InputLabel id="datefrom">Leave To</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker value={LeaveTo} required onChange={handleleaveto} />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
        <br />

        <InputLabel id="Noofdays">No of Days</InputLabel>
        <TextField
          size="medium"
          fullWidth
          type="number"
          id="Noofdays"
          placeholder="No of Days"
          value={noofDays}
          required
          onChange={(e) => setNoofDays(e.target.value)}
        />
        <br />
        <br />
        <InputLabel id="Reason">Reason</InputLabel>
        <TextField
          size="medium"
          fullWidth
          type="text"
          id="Noofdays"
          placeholder="Reason"
          multiline
          rows={4}
          variant="outlined"
          required
          onChange={handlereason}
          value={reason}
        />
        <br />
        <br />

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "4px", backgroundColor: "#de9a25" }}
            type="submit"
            required
          >
            Submit Leave Request
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Createleave;
