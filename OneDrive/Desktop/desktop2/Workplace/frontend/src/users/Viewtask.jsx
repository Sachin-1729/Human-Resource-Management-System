// import React, { useEffect } from "react";
// import Header from "../components/Header";
// import { Box, Divider } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useParams } from "react-router-dom";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


// function Viewtask() {
//   const [tasktitle, settasktitle] = React.useState("");
//   const [project, setproject] = React.useState("");
//   const [taskdescription, settaskdescription] = React.useState("");
//   const [employees, setemployees] = React.useState([]);
//   const [deadline, setdeadline] = React.useState("");
//   const [status, setstatus] = React.useState("");
//   const params = useParams();

//   async function gettaskdescription() {
//     const id = params.id;
//     const response = await fetch(
//       `https://attractivemediaz.com/workplace/api/task/${id}/view `,
//       {
//         method: "GET",
//       }
//     );
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data.data);
//       settasktitle(data.data[0].title);
//       setproject(data.data[0].project.project_name);
//       settaskdescription(
//         data.data[0].description.slice(3, data.data[0].description.length - 8)
//       );
//       setdeadline(data.data[0].deadline);
//       setstatus(data.data[0].status);
//     }
//   }
//   useEffect(() => {
//     gettaskdescription();
//   }, []);

//   return (
//     <Box>
//       <Header title="View Task" />
//       <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
//         <Box>
//           <Box
//             sx={{
//               fontWeight: "bold",
//               borderTopLeftRadius: "10px",
//               borderTopRightRadius: "10px",
//               height: "80px",
//               backgroundColor: "white",
//               padding: "10px",
//               marginBottom: "0px",
//               paddingTop: "20px",
//             }}
//           >
//             <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//               General Information
//             </Typography>
//           </Box>
//           <Divider />

//           <Box
//             sx={{
//               padding: "40px",
//               width: "100%",
//               height: "100%",
//               backgroundColor: "white",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               gap: "20px",
//             }}
//           >
//             <Box>
//               <Typography
//                 variant="h8"
//                 component={"div"}
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Task Title
//               </Typography>
//               <Typography variant="h8" component={"div"}>
//                 {tasktitle}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography
//                 variant="h8"
//                 component={"div"}
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Project
//               </Typography>
//               <Typography variant="h8" component={"div"}>
//                 {project}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography
//                 variant="h8"
//                 component={"div"}
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Task Description
//               </Typography>
//               <Typography variant="h8" component={"div"}>
//                 {taskdescription}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography
//                 variant="h8"
//                 component={"div"}
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Employees
//               </Typography>
//               <Typography variant="h8" component={"div"}>
//                 {employees}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography
//                 variant="h8"
//                 component={"div"}
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Deadline
//               </Typography>
//               <Typography variant="h8" component={"div"}>
//                 {deadline}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography
//                 variant="h8"
//                 component={"div"}
//                 sx={{ fontWeight: "bold" }}
//               >
//                 Status
//               </Typography>
//               <Typography variant="h8" component={"div"}>
//                 {status}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box>
//           <Box
//             sx={{
//               fontWeight: "bold",
//               borderTopLeftRadius: "10px",
//               borderTopRightRadius: "10px",
//               height: "80px",
//               backgroundColor: "white",
//               padding: "10px",
//               marginBottom: "0px",
//               paddingTop: "20px",
//             }}
//           >
//             <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//               Chat
//             </Typography>
//           </Box>
//           <Divider />
//           <Box
//             sx={{
//               padding: "40px",
//               width: "100%",
//               height: "100%",
//               backgroundColor: "white",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               gap: "20px",
//             }}
//           >
//             <Editor
//               editorState={editorState}
//               toolbarClassName="toolbarClassName"
//               wrapperClassName="wrapperClassName"
//               editorClassName="editorClassName"
//               onEditorStateChange={this.onEditorStateChange}
//             />
//             ;
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Viewtask;


import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Box, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Viewtask() {
  const [tasktitle, settasktitle] = useState("");
  const [project, setproject] = useState("");
  const [taskdescription, settaskdescription] = useState("");
  const [employees, setemployees] = useState([]);
  const [deadline, setdeadline] = useState("");
  const [status, setstatus] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Initialize editorState
  const params = useParams();

  async function gettaskdescription() {
    const id = params.id;
    const response = await fetch(
      `https://attractivemediaz.com/workplace/api/task/${id}/view`,
      { method: "GET" }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.data);
      settasktitle(data.data[0].title);
      setproject(data.data[0].project.project_name);
      settaskdescription(
        data.data[0].description.slice(3, data.data[0].description.length - 8)
      );
      setdeadline(data.data[0].deadline);
      setstatus(data.data[0].status);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    gettaskdescription(signal);
    return () => {
        controller.abort();
      };
  }, []);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState); // Update editorState
  };
  const uploadImageCallBack = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://your-upload-endpoint.com", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return { data: { link: data.url } }; // Return image URL in the expected format
    } catch (error) {
      console.error("Image upload failed:", error);
      return Promise.reject(error);
    }
  };

  return (
    <Box>
      <Header title="View Task" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <Box>
          <Box
            sx={{
              fontWeight: "bold",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              height: "80px",
              backgroundColor: "white",
              padding: "10px",
              marginBottom: "0px",
              paddingTop: "20px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              General Information
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              padding: "40px",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Task Title
              </Typography>
              <Typography variant="body2">{tasktitle}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Project
              </Typography>
              <Typography variant="body2">{project}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Task Description
              </Typography>
              <Typography variant="body2">{taskdescription}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Employees
              </Typography>
              <Typography variant="body2">{employees}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Deadline
              </Typography>
              <Typography variant="body2">{deadline}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Status
              </Typography>
              <Typography variant="body2">{status}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              fontWeight: "bold",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              height: "80px",
              backgroundColor: "white",
              padding: "10px",
              marginBottom: "0px",
              paddingTop: "20px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Chat
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              padding: "40px",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                image: {
                  uploadCallback: uploadImageCallBack,
                  previewImage: true,
                  alt: { present: true, mandatory: false },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Viewtask;
