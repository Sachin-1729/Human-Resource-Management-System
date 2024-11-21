import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import { enableDone } from "../redux/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Appbar(props) {
  const attendance = props.attendance;
  console.log(attendance);
  const dispatch = useDispatch();
 const data= useSelector((state) => state.login.enable)
  const [enable, setEnable] = React.useState(false);
  

  function makinginvisiblepunching() {
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];
    console.log(attendance)

    if (attendance?.check_out && attendance?.day === currentDate) {
      dispatch(enableDone(false));
    } else if (attendance?.check_in && attendance?.day === currentDate) {
      
    }
  }

  React.useEffect(() => {
    makinginvisiblepunching();

  }, []);

  React.useEffect(() => {
    setEnable(data);
  }, [enable]);

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Box>{props.time}</Box>
            <Box>
              {enable && (
                <Button
                  sx={{ backgroundColor: "#de9a25" }}
                  onClick={props.punchout}
                  variant="contained"
                >
                  PUNCH OUT
                </Button>
              )}
            </Box>
            <Box>
              <NotificationsNoneIcon />
            </Box>

            <Box>
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Abhishek"
                  src={`https://attractivemediaz.com/workplace/public/storage/${props.image}`}
                />
              </Stack>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;
