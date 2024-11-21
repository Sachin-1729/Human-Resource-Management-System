import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl, InputLabel,
  Select, MenuItem,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for react-quill

function ModalComponent({ open, onClose }) {
  const [report, setReport] = useState(""); // State for rich text content
  const[taskk , settask] = useState([{}]);
  const [taskStatus, setTaskStatus] = useState({});

  // Function to handle the punch-out action
  async function punchout() {
    const id = localStorage.getItem('id');
    const form = new FormData();
    form.append('id', id);
    form.append('report', report); // Using the rich text content
    form.append('task', JSON.stringify(taskStatus));
    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    })

   
return false;
   

    try {
      const response = await fetch('https://attractivemediaz.com/workplace/api/create-attendance', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Punch out successful:", data);
        window.location.reload();
      } else {
        console.error("Failed to punch out.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    //onClose();  // Close the modal after punching out
  }

  function handleStatusChange(event, taskId) {
    //console.log(event.target.name);
    setTaskStatus(prevStatus => ({
      ...prevStatus,
     [taskId]: event.target.value,
    }));
  }
/* function handleStatusChange(event, taskId) {
    const newStatus = event.target.value;

    setTaskStatus(prevStatus =>
      prevStatus.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  } */

  

  // Function to fetch task data when the modal opens
  async function task() { 
    const id = localStorage.getItem('id');
    const response = await fetch(`https://attractivemediaz.com/workplace/api/tasks/${id}`, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      settask(data.data);
      console.log(data.data);  // Do something with the fetched task data here
    } else {
      console.error("Failed to fetch task data.");
    }
  }

  // Run task function whenever the modal opens
  useEffect(() => {
    if (open) {
      task();  // Call task only when modal opens
    }
  }, [open]);

  //console.log(taskStatus);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Daily Report</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Tasks
        </Typography>
     {taskk.map((task, index) => (
        <div key={task?.id || index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body1" gutterBottom style={{ marginRight: '16px' }}>
            {task?.title}
          </Typography>
          <FormControl variant="outlined" size="small">
            <InputLabel>Status</InputLabel>
            <Select
           
              value={taskStatus[task?.id] || 'In-progress'}  // Default to "In-progress"
              onChange={(event) => handleStatusChange(event, task?.id)}
              label="Status"
            >
              <MenuItem value="In-progress">In-progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
      ))}
 
   {/*   {taskk.map((task, index) => (
        <div key={task?.id || index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body1" gutterBottom style={{ marginRight: '16px' }}>
            {task?.title}
          </Typography>
          <FormControl variant="outlined" size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={
                taskStatus.find(statusObj => statusObj.id === task.id)?.status || 'In-progress'
              }
              onChange={(event) => handleStatusChange(event, task.id)}
              label="Status"
            >
              <MenuItem value="In-progress">In-progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
      ))} */}
        {/* Rich text editor for report content */}
        <ReactQuill 
          value={report} 
          onChange={setReport} 
          placeholder="Write your report here..." 
          style={{ height: '200px', marginBottom: '20px' }}
        />
      </DialogContent> 
      <DialogActions>
        <Box sx={{ mx: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={punchout}
          >
            Punch Out
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default ModalComponent;
