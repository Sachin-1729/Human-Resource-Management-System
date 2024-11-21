import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import "../pages/forgotpass.css"

function ForgotPassword() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 471, maxHeight: 300, px: "25px", py: "20px" }}>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" , fontSize:"14px"}}>
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </Typography>
        </CardContent>
        <CardActions>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              // Handle the form submission logic here
            }}
          >
            <TextField
              placeholder="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              size="small"
              className="input"
              sx={{ mb: 4 ,
                "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    "& fieldset": {
                      borderColor: "transparent", // Optional: Remove border color
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent", // Optional: Remove border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent", // Optional: Remove border color when focused
                    },
                  },
               }}
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "30px",
                  },
                },
                root: {
                  sx: {
                    borderRadius: "30px",
                  },
                },
              }}
             
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                 // Adjust spacing as needed
                borderRadius: '30px',
                p:1,
                backgroundColor:'#de9a25'
              }}
            >
              EMAIL PASSWORD RESET LINK
            </Button>
          </form>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ForgotPassword;
