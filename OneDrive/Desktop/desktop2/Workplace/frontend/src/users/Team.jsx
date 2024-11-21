import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group"; // Import your chosen icon
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountTreeIcon from "@mui/icons-material/AccountTree"; // React
import CodeIcon from "@mui/icons-material/Code"; // HTML
import StyleIcon from "@mui/icons-material/Style"; // CSS
import StorageIcon from "@mui/icons-material/Storage"; // MongoDB
import GridOnIcon from "@mui/icons-material/GridOn"; // Bootstrap
import SettingsInputComponent from "@mui/icons-material/SettingsInputComponent"; // Node.js
import JavascriptIcon from "@mui/icons-material/Code"; // JavaScript (use CodeIcon as placeholder)
import FileCopyIcon from "@mui/icons-material/FileCopy"; // Figma (use FileCopyIcon as placeholder)
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"; // Photoshop (use PhotoCameraIcon as placeholder)
import TextFieldsIcon from "@mui/icons-material/TextFields"; // TypeScript (use TextFieldsIcon as placeholder)
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Shopify (use ShoppingCartIcon as placeholder)
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // Import Search Icon
import { SvgIcon } from '@mui/material'; // If you're using a custom SVG

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

// const iconMap = {
//   laravel: <SettingsInputComponent />,
//   wordpress: <FileCopyIcon />, // Custom icon, use FontAwesome or similar
//   react: <AccountTreeIcon />,
//   html: <CodeIcon />,
//   photoshop: <PhotoCameraIcon />, // Custom icon, use FontAwesome or similar
//   figma: <FileCopyIcon />, // Custom icon, use FontAwesome or similar
//   illustrator: <PhotoCameraIcon />, // Custom icon, use FontAwesome or similar
//   indesign: <FileCopyIcon />, // Custom icon, use FontAwesome or similar
//   css: <StyleIcon />,
//   javascript: <JavascriptIcon />,
//   jquery: <SettingsInputComponent />, // Custom icon, use FontAwesome or similar
//   nodejs: <SettingsInputComponent />,
//   typescript: <TextFieldsIcon />,
//   tailwindcss: <GridOnIcon />, // Custom icon, use FontAwesome or similar
//   cakephp: <SettingsInputComponent />, // Custom icon, use FontAwesome or similar
//   codeigniter: <SettingsInputComponent />, // Custom icon, use FontAwesome or similar
//   shopify: <ShoppingCartIcon />,
//   bootstrap: <GridOnIcon />,
//   ionic: <SettingsInputComponent />, // Custom icon, use FontAwesome or similar
//   reactnative: <SettingsInputComponent />, // Custom icon, use FontAwesome or similar
//   mongodb: <StorageIcon />,
//   expressjs: <SettingsInputComponent />, // Custom icon, use FontAwesome or similar
//   sass: <SettingsInputComponent />, // Custom icon, use FontAwesome or similar
// };

function Team() {
  const [myId, setId] = useState(localStorage.getItem("id"));
  const [team, setTeam] = useState([]);
  const contactEmail = "your-email@example.com"; // Replace with your email
  const location = "123 Main St, City, Country"; // Replace with your location
  const phoneNumber = "(123) 456-7890"; // Replace with your phone number
  const [searchTerm , setSearchTerm] = useState("");
  const [iconMap , setIconMap] = useState({});
  

  async function myTeam() {
    const response = await fetch(
      "https://attractivemediaz.com/workplace/api/team",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.data);
    setTeam(data.data);
  }

  async function icon()
  {
    const response = await fetch('https://attractivemediaz.com/workplace/api/skills',{method: 'GET'});
    const data = await response.json();
 
    setIconMap(data.data);
    console.log(iconMap , "IconMap");
  }

  console.log(iconMap.bde)

  useEffect(() => {
    myTeam();
    icon();
  }, []);

  return (
    <Box sx={{ flexGrow: 1}}>
         <TextField
        placeholder="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
        size="small"
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ mr: 1, color: "action.active" }} />
          ),
        }}
      />
      <Typography
        variant="h4"
        sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 3 }}
      >
        <GroupIcon sx={{ fontSize: 32, color: "#de9a25" }} />{" "}
        {/* Customize icon size and color */}
        Team
      </Typography>
    
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        > 
          <Link
         style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            // Use a hover effect to maintain the same color
            '&:hover': { color: "inherit" , backgroundColor: "#de9a25" },
          }}
        
        to={"/dashboard"}
      >
          <HomeIcon sx={{ fontSize: 24, color: "#de9a25" }} />{" "}
          {/* Icon with custom color */}
          </Link>
          <span style={{ fontSize: 14 }}>Home /</span>
          <span
            style={{
              padding: "5px 9px",
              fontSize: 14,
              fontWeight: "lighter",
              backgroundColor: "#de9a25",
              borderRadius: "30px",
              color: "white",
            }}
          >
            Team
          </span>
        </Typography>
     

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container rowSpacing={5} columnSpacing={0.5}>
          {team.filter((item)=>{
            if(searchTerm === ""){
              return item
            }else if(item.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return item
            }
            else if(item.email.toLowerCase().includes(searchTerm.toLowerCase())){
              return item
            }
            else if(item?.position.toLowerCase().includes(searchTerm.toLowerCase())){
              return item
            }
         
           
            else
            {
                return null
            }
          }).map(
            (item) =>
              item.id !== parseInt(myId) && (
                <Grid item xs={12} sm={12} md={6} sx={{  }}  key={item.id}>
                  <Card
                    sx={{ width: "90%", borderRadius: "10px", height: "100%"} }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        padding: 2,
                        marginTop: "40px",
                        marginLeft: "20px",
                        gap: "20px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={`https://attractivemediaz.com/workplace/public/storage/${item.image}`}
                        alt="User Avatar"
                        sx={{
                          height: "150px", // Adjust as needed
                          width: "150px",
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                          borderRadius: "8px",
                          marginRight: 2,
                        }}
                      />
                      <Box>
                        <Typography variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            mt: 0.2,
                            backgroundColor: "#de9a25",
                            color: "white",
                            px: "4px",
                          }}
                          variant="h7"
                          component="body2"
                        >
                          {item.position.toUpperCase()}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          {/* Phone Section */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 2,
                              mb: 1,
                            }}
                          >
                            <PhoneIcon sx={{ color: "#de9a25", mr: 1 }} />
                            <Typography variant="body1" sx={{ color: "black" }}>
                              {item.phone}
                            </Typography>
                          </Box>

                          {/* Email Section */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <MailIcon sx={{ color: "#de9a25", mr: 1 }} />
                            <Typography variant="body1" sx={{ color: "black" }}>
                              {item.email}
                            </Typography>
                          </Box>

                          {/* Location Section */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <LocationOnIcon sx={{ color: "#de9a25", mr: 1 }} />
                            <Typography variant="body1" sx={{ color: "black" }}>
                              {item.address}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ padding: 2, marginTop: "40px", display: "flex", gap: 1 , justifyContent: "flex-start" , alignItems: "flex-start" , flexWrap: "wrap" ,gap: "30px" }}>
                    {item.skills.map((tech) => (
                <Tooltip title={tech} key={tech}>
                    <Box>
                        {/* Ensure iconMap[tech] is defined and check its type */}
                        {iconMap[tech] && typeof iconMap[tech] === 'string' ? (
                            <img
                                src={iconMap[tech]}
                                alt={`${tech} icon`}
                                style={{ width: '24px', height: '24px' }}
                            />
                        ) : (
                            iconMap[tech] && <SvgIcon component={iconMap[tech]} />
                        )}
                    </Box>
                </Tooltip>
            ))}
                    </Box>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default Team;
