import React from "react";
import AdminNav from "../components/admin/AdminNav";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { firebase } from "../firebase";
import { Button } from "@material-ui/core";
import { CityLogo } from "./../components/UI/icons";
import footballIcon from "./icons/football.svg";
import addIcon from "./icons/add.svg";
import groupsIcon from "./icons/groups.svg";
import addUserIcon from "./icons/add_user.svg";
import leftIcon from "./icons/left.svg";
import exitIcon from "./icons/exit.svg";
import menuIcon from "./icons/menu.svg";

export const AdminLayout = ({ children }) => {
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>
      <div className="admin_right">{children}</div>
    </div>
  );
};

const drawerWidth = 160;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "linear-gradient(to right, #98c5e9, #76afdd)"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 18
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  header: {
    flexGrow: 1
  }
}));

export default function MiniDrawer({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const links = [
    {
      title: "Matches",
      link: "/admin_matches",
      icon: footballIcon,
      alt: ""
    },
    {
      title: "Add Match",
      link: "/admin_matches/edit",
      icon: addIcon,
      alt: ""
    },
    {
      title: "Players",
      link: "/admin_players",
      icon: groupsIcon,
      alt: ""
    },
    {
      title: "Add Player",
      link: "/admin_players/edit",
      icon: addUserIcon,
      alt: ""
    }
  ];

  const style = {
    color: "#71b9f8"
  };

  const renderItems = () =>
    links.map(link => (
      <Link to={link.link} key={link.title}>
        <ListItem button style={style}>
          <ListItemIcon>
            <img src={link.icon} alt={link.alt} />
          </ListItemIcon>
          <ListItemText primary={link.title} />
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebase.auth().signOut();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}>
            <img src={menuIcon} alt="Back" />
          </IconButton>

          <div className={classes.header}>
            <div className="header_logo">
              <CityLogo link={true} linkTo="/" width="50px" height="50px" />
            </div>
          </div>
          <Link to="the_team" className={classes.link}>
            <Button color="inherit">The Team</Button>
          </Link>
          <Link to="the_matches" className={classes.link}>
            <Button color="inherit">The Matches</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <img src={leftIcon} alt="Log Out" />
          </IconButton>
        </div>
        <Divider />
        {renderItems()}
        <Divider />
        <ListItem button style={style} onClick={logoutHandler}>
          <ListItemIcon>
            <img src={exitIcon} alt="Log Out" />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </Drawer>
      <main className={clsx("admin_container", classes.content)}>
        <div className={classes.toolbar} />
        <div className="">{children}</div>
      </main>
    </div>
  );
}
