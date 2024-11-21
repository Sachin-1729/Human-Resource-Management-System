import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import CodeIcon from "@mui/icons-material/Code";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import LogoutIcon from "@mui/icons-material/Logout";
import DefaultIcon from "@mui/icons-material/Folder"; // Default icon
import { useDispatch, useSelector } from "react-redux";
import { logoutdone } from "../redux/loginSlice";
import { enableDone } from "../redux/loginSlice";
import { useEffect } from "react";
import { parsePath, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import PunchoutModal from "../components/Modalpunchout";
import ModalComponent from "../components/Modalpunchout";
import PersonIcon from "@mui/icons-material/Person";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const iconMap = {
    Dashboard: <HomeIcon />,
    Attendance: <WorkIcon />,
    Tasks: <DescriptionIcon />,
    "My Leaves": <HolidayVillageIcon />,
    Team: <CodeIcon />,
    Holidays: <WorkOffIcon />,
    "Log Out": <LogoutIcon />,
    Roles: <PersonIcon />,
    "My Profile": <PersonIcon />,
  };

  const items = [
    "Dashboard",
    "Attendance",
    "Tasks",
    "My Leaves",
    "Team",
    "Holidays",
    "Log Out",
  ];

  const rolePermissions = {
    Admin: [
      "Dashboard",
      "Attendance",
      "myprofile",
      "roles",
      "clients",
      "projects",
      "tasks",
      "leave management",
      "employees",
      "Team",
      "export data",
      "portfolio management",
      "Holidays",
      "settings",
      "Log Out",
    ],
    User: [
      "Dashboard",
      "Attendance",
      "Tasks",
      "My Leaves",
      "Team",
      "Holidays",
      "Log Out",
    ],
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [name, setName] = React.useState("");
  const [online, setOnline] = React.useState("");
  const [role, setRole] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useLocation();
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState([{}]);
  const [permission, setpermissions] = React.useState({});
  const [user, setUser] = React.useState([]);
  const [profilemodal, setProfilemodal] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [attendance, setAttendance] = React.useState([]);
  const [time, setTime] = React.useState();
  const [image, setImage] = React.useState([]);
  const enable = useSelector((state) => state.login.enable);
  const [openModal, setOpenModal] = React.useState(false);

  async function me() {
    const id = localStorage.getItem("id");
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
    data.data.map((item) => {
      if (parseInt(id) === parseInt(item.id)) {
        setImage(item.image);
      }
    });
  }

  function handleOpenModal() {
    setOpenModal(true); // Open modal
  }

  function handleCloseModal() {
    setOpenModal(false); // Close modal
  }

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      const form = new FormData();
      form.append("id", id);
      const response = await fetch(
        `https://attractivemediaz.com/workplace/api/attendance/${id}`,
        {
          method: "GET",
        }
      ); // Adjust the API endpoint as necessary
      const data = await response.json();
      setUser(data.data.user);
      setAttendance(data.data.attendance[0]);
    };
    fetchData();
    me();
  }, []);

  function settingTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    const currentDate = date.toISOString().split("T")[0];

    if (
      attendance?.check_in &&
      attendance?.day === currentDate &&
      user.id != 2
    ) {
      if (attendance?.check_out === null) {
        // Handle the case where check_out is null
        const [checkInHours, checkInMinutes] = attendance.check_in
          .split(":")
          .map(Number);
        const checkInTotalMinutes = checkInHours * 60 + checkInMinutes;
        const currentTimeMinutes = date.getHours() * 60 + date.getMinutes();
        const differenceInMinutes = currentTimeMinutes - checkInTotalMinutes;
        // Calculate hours and remaining minutes
        const hoursDifference = Math.floor(differenceInMinutes / 60);
        const minutesDifference = differenceInMinutes % 60;
        const formattedDifference = `${String(hoursDifference).padStart(
          2,
          "0"
        )}:${String(minutesDifference).padStart(2, "0")}`;

        setTime(formattedDifference);
      } else {
        // Calculate the difference between check_out and check_in
        const [checkInHours, checkInMinutes] = attendance.check_in
          .split(":")
          .map(Number);
        const [checkOutHours, checkOutMinutes] = attendance.check_out
          .split(":")
          .map(Number);

        // Convert times to minutes
        const checkInTotalMinutes = checkInHours * 60 + checkInMinutes;
        const checkOutTotalMinutes = checkOutHours * 60 + checkOutMinutes;

        // Calculate the difference in minutes
        const differenceInMinutes = checkOutTotalMinutes - checkInTotalMinutes;

        // Calculate hours and remaining minutes
        const hoursDifference = Math.floor(differenceInMinutes / 60);
        const minutesDifference = differenceInMinutes % 60;

        // Format the time difference as HH:mm

        const formattedDifference = `${String(hoursDifference).padStart(
          2,
          "0"
        )}:${String(minutesDifference).padStart(2, "0")}`;

        setTime(formattedDifference);
      }
    } else {
      // Handle case where check_in is null
      setTime("");
    }
  }

  function makinginvisiblepunching() {
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];
    if (!attendance?.day === currentDate && user.id != 2) {
      dispatch(enableDone(false));
    }

    if (
      attendance?.check_out &&
      attendance?.day === currentDate &&
      user.id != 2
    ) {
      dispatch(enableDone(false));
    } else if (
      attendance?.check_in &&
      attendance?.day === currentDate &&
      user.id != 2
    ) {
      dispatch(enableDone(true));
    }
  }

  function setOnlineactive() {
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];

    if (attendance?.day === currentDate) {
      setOnline("ONLINE");
    } else {
      setOnline("AWAY");
    }
  }

  React.useEffect(() => {
    const rolee = localStorage.getItem("role");
    setRole(rolee);
  }, [attendance]);

  const filteredItems = rolePermissions[role] || [];

  React.useEffect(() => {
    settingTime();
    makinginvisiblepunching();
    setOnlineactive();
  }, [attendance]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setName(localStorage.getItem("name"));
    }
  }, [name]);

  async function sidemenu() {
    const id = localStorage.getItem("id");
    const response = await fetch(
      `https://attractivemediaz.com/workplace/api/modules/${id}`
    );

    if (response.ok) {
      const data = await response.json();

      const updatedMenu = [
        ...data.data.menus,
        {
          as: "Log Out",
          route: "https://attractivemediaz.com/workplace/logout",
        },
      ];
      console.log(updatedMenu, "jdnjkdnckj");
      setMenu(updatedMenu);

      console.log(data.data.menus, "menu");
      console.log(data.data.permissions, "permission");
      setpermissions(data.data.permissions);
    }
  }

  useEffect(() => {
    sidemenu();
  }, []);

  console.log(menu, "dnjksnfkjs");
  const handleListItemClick = (index) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  function handleclickmenu(text) {
    console.log(text, "text");

    if (text === "/logout") {
      dispatch(logoutdone(null)); // Clear token and role from state(null);
      localStorage.removeItem("token");
    }
    //   if(text ==="My Leaves")
    //   {
    //     navigate('/myleaves')
    //   }
    else if (text !== "/logout") {
      navigate(text?.toLowerCase());
    }
    console.log(text);
  }

  function handleOpenprofilemodal() {
    if (profilemodal) {
      setProfilemodal(false);
    } else {
      setProfilemodal(true);
    }
  }

  function handleCloseprofilemodal() {
    setProfilemodal(false);
  }

  const drawer = (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <img
          src="logo_am.png" // Replace with your logo path
          alt="Logo"
        />
      </Toolbar>
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
      ></ModalComponent>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{}}>
          {name}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h7"
          sx={{
            marginBottom: 2,
            backgroundColor: "#de9a25",
            p: 0.4,
            color: "white",
          }}
        >
          {online}
        </Typography>
      </Box>

      <List>
        {menu.map((text, index) => (
          <React.Fragment key={index}>
            {
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() =>
                      text.sub_menu
                        ? handleListItemClick(index)
                        : text?.route?.split("/workplace")[1]
                        ? handleclickmenu(text.route.split("/workplace")[1])
                        : handleclickmenu(text.route.split("/workplace")[1])
                    }
                    sx={{
                      borderRadius: "30px",
                      color: "black",
                      marginBottom: "7px",
                      backgroundColor:
                        params.pathname ===
                        (text?.route?.split("/workplace")[1]
                          ? text?.route?.split("/workplace")[1]
                          : "/")
                          ? "#de9a25"
                          : "white",
                      color:
                        params.pathname ===
                        (text?.route?.split("/workplace")[1]
                          ? text?.route?.split("/workplace")[1]
                          : "/")
                          ? "white"
                          : "black",
                      "&:hover": {
                        backgroundColor: "#de9a25",
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon>
                      {iconMap[text?.name || text?.as] || <DefaultIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text?.name || text?.as} />
                  </ListItemButton>
                </ListItem>

                {/* Render Submenu if present */}
                {text.sub_menu && (
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {text.sub_menu.map((subItem, subIndex) => (
                        <Link
                          to={subItem?.path}
                          style={{ textDecoration: "none", color: "inherit" }}
                          key={subIndex}
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary={subItem?.name} />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            }
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
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
            <Box>{time}</Box>
            <Box>
              {enable && localStorage.getItem("role") !== "Admin" && (
                <Button
                  sx={{ backgroundColor: "#de9a25" }}
                  onClick={handleOpenModal}
                  variant="contained"
                >
                  PUNCH OUT
                </Button>
              )}
            </Box>
            <Box>
              <NotificationsNoneIcon />
            </Box>

            <Box sx={{ cursor: "pointer" }}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Abhishek"
                  onClick={handleClick}
                  src={`https://attractivemediaz.com/workplace/public/storage/${image}`}
                />
              </Stack>
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile Details" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  onClick={() => {
                    dispatch(logoutdone(null)); // Clear token and role from state(null);
                    localStorage.removeItem("token");
                  }}
                  primary="Logout"
                />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {props.Outlet}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
