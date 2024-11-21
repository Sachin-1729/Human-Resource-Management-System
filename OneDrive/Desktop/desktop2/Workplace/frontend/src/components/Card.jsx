// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// export default function MediaCard(props) {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
       
//       />
//       <CardContent>
      
//       </CardContent>
//       <CardActions>
  
//       </CardActions>
//     </Card>
//   );
// }


// <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Card sx={{  maxWidth: 345, }}>
//           <Container component="main" maxWidth="xs">
//             <ToastContainer />
//             <CssBaseline />
//             <CardContent>
//               <Box
//                 sx={{
//                   marginTop: 8,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography component="h1" variant="h5">
//                   Sign In
//                 </Typography>
//                 <Box component="form" noValidate sx={{ mt: 1 }}>
//                   <TextField
//                     margin="normal"
//                     className="input"
//                     required
//                     fullWidth
//                     id="email"
//                     name="email"
//                     autoComplete="email"
//                     autoFocus
//                     placeholder="Email"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonIcon /> {/* Replace with your desired icon */}
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "30px",
//                         "& fieldset": {
//                           borderColor: "transparent", // Optional: Remove border color
//                         },
//                         "&:hover fieldset": {
//                           borderColor: "transparent", // Optional: Remove border color on hover
//                         },
//                         "&.Mui-focused fieldset": {
//                           borderColor: "transparent", // Optional: Remove border color when focused
//                         },
//                       },
//                     }}
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     className="input"
//                     placeholder="Password"
//                     name="password"
//                     type="password"
//                     id="password"
//                     autoComplete="current-password"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <HttpsIcon /> {/* Replace with your desired icon */}
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "30px",
//                         "& fieldset": {
//                           borderColor: "transparent", // Optional: Remove border color
//                         },
//                         "&:hover fieldset": {
//                           borderColor: "transparent", // Optional: Remove border color on hover
//                         },
//                         "&.Mui-focused fieldset": {
//                           borderColor: "transparent", // Optional: Remove border color when focused
//                         },
//                       },
//                     }}
//                   />

//                   <CardActions>
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       className="button-login"
//                     >
//                       <Box className="button-icon-text">
//                         <Box>
//                           <Shareicon />
//                         </Box>
//                         <Box>LOGIN</Box>
//                       </Box>
//                     </Button>
//                   </CardActions>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Container>
//         </Card>

//         <Card sx={{ maxWidth: 345 }}>
//           <CardMedia
//             component="img"
//             image="/login-right-side.png" // Correct path to the image in public
//             alt="Description of the image" // Provide an alt description for accessibility
//             sx={{
//               height: "100%",
//               objectFit: "cover", // Adjusts how the image fills the container
//             }}
//           />
//         </Card>
//         {/* </div> */}
//       </Box>
