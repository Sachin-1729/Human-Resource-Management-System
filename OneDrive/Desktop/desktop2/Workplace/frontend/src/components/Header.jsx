
import React from "react";
import Box from "@mui/material/Box";
import {  Typography } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {Link} from "react-router-dom";


function Header(props) {
  return (
    <div>  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 2,
      marginBottom: "40px",
    }}
  >
    <Box display="flex" alignItems="center">
      <SpeedIcon fontSize="large" style={{ marginRight: 8 }} />{" "}
      <Typography variant="h4">{props.title}</Typography>
    </Box>

    <Box display="flex" alignItems="center" gap="5px">
    <Box>
      <HomeOutlinedIcon fontSize="medium" style={{ marginRight: 8 }} />
    
    
      <Typography variant="h7">Home</Typography>
      <Typography variant="h7">/</Typography>
      </Box>
      <Typography
        sx={{
          color: "white",
          backgroundColor: "#de9a25",
          borderRadius: "30px",
          padding: "5px",
        }}
        variant="h7"
      >
        {props.title}
      </Typography>
    </Box>
  </Box></div>
  )
}

export default Header


