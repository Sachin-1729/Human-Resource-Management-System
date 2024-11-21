import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shareicon from "../components/Icon";
import "./login.css";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { logindone } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const[csrf_token ,setcrfToken] = useState('');
  const dispatch = useDispatch();
const navigate = useNavigate();
  function emailHandleChange(event)
  {
         setEmail(event.target.value);
  }

  function passwordHandleChange(event)
  {
    setPassword(event.target.value);
  }






  async function handleSubmit(event)
  { 
    event.preventDefault();
    
    const form = new FormData();
    // Append the email and password states to the FormData
    form.append('email', email);
    form.append('password', password);
    const response = await fetch('https://attractivemediaz.com/workplace/api/login',{
        method: 'POST',
        body: form,
 
    })
    if(response.ok)
    {  
      
        const data = await response.json();
        localStorage.setItem('data', data);
        localStorage.setItem('token', data.data.email);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('role', data.data.role.name);

        dispatch(logindone(data.data.email));
        navigate('/');
        console.log(data)
        toast.success(data.message);
    }
    else{
        const data = await response.json();
        toast.error(data.message);
        
      
       
    }
  }

  useEffect(()=>{
    console.log(email , password);
  },[email , password]);





  return (
    <>
      <Box
        sx={{
          minHeight: "100vh", // Takes full viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Centers vertically and horizontally
          bgcolor: "#f0f2f5", // Optional: background color for the page
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ borderRadius: "10px" }}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <ToastContainer />
                <CssBaseline />
                <CardContent>
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h4">
                      Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        className="input"
                        value={email}
                        onChange={emailHandleChange}
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        placeholder="Email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />{" "}
                              {/* Replace with your desired icon */}
                            </InputAdornment>
                          ),
                        }}
                        sx={{
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
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        className="input"
                        placeholder="Password"
                        value={password}
                        onChange={passwordHandleChange}
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HttpsIcon />{" "}
                              {/* Replace with your desired icon */}
                            </InputAdornment>
                          ),
                        }}
                        sx={{
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
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                         
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox value="remember" color="primary" />
                          }
                          label="Remember Me"
                        />
                        <Link to={"/forgot-password"} variant="inherit">
                          Forgot your password?
                        </Link>
                      </Box>

                      <CardActions>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          className="button-login"
                        >
                          <Box className="button-icon-text">
                            <Box>
                              <Shareicon />
                            </Box>
                            <Box>LOGIN</Box>
                          </Box>
                        </Button>
                      </CardActions>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <img
                  src="/login-right-side.png" // Path to the image in public folder
                  alt="Description of the image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }} // Optional styling
                />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </>
  );
}
