// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -140%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   p: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: 2,

// };




// export default function BasicModal(props) {

//   const [isWorkingFromHome, setIsWorkingFromHome] = React.useState(false);
//   const [openModal, setOpenModal] = React.useState(false);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   async function checkpunchedintoday() {
//     const id = localStorage.getItem("id");
//     handleClose();
//     return true;
//   }

//   const handleCheckboxChange = (event) => {
//     setIsWorkingFromHome(event.target.checked);
//   };
//   return (
//     <Modal
//       open={props.open} // Controlled by props.open
//       onClose={handleClose} // Calls props.close on close
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       sx={{border: 'none'}}
//     >
//       <Box sx={style}>
//         <Typography id="modal-modal-title" variant="h4" align='center' component="body2">
//           {props.title || 'Default Title'}
//         </Typography>
//         <FormControlLabel
          
//             control={
//               <Checkbox
//                 checked={isWorkingFromHome}
//                 onChange={handleCheckboxChange}
//                 color="primary"
//               />
//             }
//             label="Check if you are working from home"
//             sx={{ mt: 2  ,display: 'flex', justifyContent: 'center' }}
//           />
//          <Button variant='contained' sx ={{borderRadius:"30px" , border:"1px solid #f1f1f1" ,backgroundColor:"#fff" , color:"black"  }} onClick={checkpunchedintoday}>
//           Present
//         </Button>
//       </Box>
//     </Modal>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { enableDone } from '../redux/loginSlice';
import { useDispatch } from "react-redux";
import AssignmentIcon from '@mui/icons-material/Assignment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -140%)',
  width: 600,
  bgcolor: 'background.paper',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  border: 'none', // No border on Box
  boxShadow: 'none', // Remove shadow
};

export default function BasicModal(props) {
  const [isWorkingFromHome, setIsWorkingFromHome] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    props.handleClose(); // Call props.close to close modal externally
  };

  async function checkpunchedintoday() {
    try {
      // Retrieve user_id from localStorage
      const user_id = localStorage.getItem("id");
      
      // Prepare FormData
      const form = new FormData();
      form.append("user_id", user_id);
      form.append("status", "present");
  
      // Make the API call
      const response = await fetch("https://attractivemediaz.com/workplace/api/create-attendance", {
        method: "POST",
        body: form, // No need for Content-Type header with FormData
      });
  
      if (response.ok) {
        const data = await response.json();
        window.location.reload();
        toast.success(data.message);
        dispatch(enableDone(false));
        handleClose();
      } else {
        // Handle errors
        const data = await response.json(); // Ensure server returns JSON
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  }
  

  const handleCheckboxChange = (event) => {
    setIsWorkingFromHome(event.target.checked);
  };

  return (
    <Modal
      open={props.open} // Controlled by props.open
      onClose={(event, reason) => {
        // Prevent closing the modal on backdrop click
        if (reason === 'backdropClick') {
          return; // Do nothing on backdrop click
        }
        handleClose(); // Allow closing via the close function
      }} 
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ border: 'none',
        outline: 'none' 
       }}
    >
     
     
    
      <Box sx={style}>
    
        <Typography id="modal-modal-title" variant="h4" align='center' component="body2">
          {props.title || 'Default Title' || props.report}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isWorkingFromHome}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Check if you are working from home"
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
        <Button 
          variant='contained' 
          sx={{ borderRadius: "30px", border: "1px solid #f1f1f1", backgroundColor: "#fff", color: "black" }} 
          onClick={checkpunchedintoday}
        >
          Present
        </Button>
      </Box>
    </Modal>
  );
}

