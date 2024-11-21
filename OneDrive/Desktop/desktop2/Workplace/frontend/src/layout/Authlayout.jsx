// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, Navigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import Modal from '../components/Modal';

// function Adminlayout() {
//   const [openModal, setOpenModal] = React.useState(false);
//   const handleCloseModal = () => setOpenModal(false);
//   const [ispunchedintoday, setIspunchedinToday] = React.useState(null); // Initialize as null to track loading state

//   const token = useSelector((state) => state.login.token);
//   const enable = useSelector((state) => state.login.enable);

//   console.log(token, enable);

//   // Fetch attendance data
//   useEffect(() => {
//     async function checkpunchedintoday() { 
//       const id = localStorage.getItem("id");
//       const form = new FormData();
//       form.append("id", id);
//       const response = await fetch(
//         "https://attractivemediaz.com/workplace/api/attendance",
//         {
//           method: "POST",
//           body: form,
//         }
//       );
//       const data = await response.json();
//       setIspunchedinToday(data.data[0]); // Set fetched data to state
//     }
//     checkpunchedintoday();
//   }, []); // Run only once to fetch attendance data

//   // Check if modal should open
//   useEffect(() => {
//     if (token && ispunchedintoday) {
//       const currentdate = new Date().toISOString().split('T')[0];
//       if (ispunchedintoday.day !== currentdate) {
//         setOpenModal(true); // Open modal if not punched in today
//       }
//     }
//   }, [token, ispunchedintoday]); // Depend on both token and fetched data


//   useEffect(()=>{
   
//   },[enable])

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   // Render Sidebar and Modal
//   return (
//     <>
//       <Modal
//         open={openModal}
//         handleClose={handleCloseModal}
//         title="Put Your Attendance"
//         description="This is important information for the admin user."
//       />
//       <Sidebar Outlet={<Outlet />} />
//     </>
//   );
// }

// export default Adminlayout;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';


function Adminlayout() {
  const [openModal, setOpenModal] = useState(false);
  const [ispunchedintoday, setIspunchedinToday] = useState(null);
  const [loading, setLoading] = useState(true);
const[user , setUser] = useState([]);
  const token = useSelector((state) => state.login.token);
  const enable = useSelector((state) => state.login.enable);

  const handleCloseModal = () => setOpenModal(false);

  // Fetch attendance data if token is available
  useEffect(() => {
    if (!token) return; // Only fetch data if token exists

    async function checkpunchedintoday() { 
      try {
        const id = localStorage.getItem("id");
        const form = new FormData();
        form.append("id", id);
        const response = await fetch(`https://attractivemediaz.com/workplace/api/attendance/${id}`, {
         
          
        });
        
        if (!response.ok) throw new Error("Failed to fetch attendance data");

        const data = await response.json();
        setUser(data.data.user);
        setIspunchedinToday(data.data.attendance[0]);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    }
    checkpunchedintoday();
  }, [token]);

  // Check if modal should open based on punch-in data
  useEffect(() => {
    if (token && ispunchedintoday && !loading && user.id!=2 ) {
      const currentdate = new Date().toISOString().split('T')[0];
      if (ispunchedintoday.day !== currentdate && user.id!=2) {
        setOpenModal(true); // Open modal if not punched in today
      }
    }
  }, [token, ispunchedintoday, loading]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Modal
        open={openModal}
        handleClose={handleCloseModal}
        title="Put Your Attendance"
        description="This is important information for the admin user."
      />
      <Sidebar Outlet={<Outlet />} />
    </>
  );
}

export default Adminlayout;

