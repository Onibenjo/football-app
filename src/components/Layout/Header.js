import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { CityLogo } from "../UI/icons";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <AppBar position="fixed" className={styles.appbar}>
      <Toolbar className={styles.toolbar}>
        <div className={styles.header}>
          <div className="header_logo">
            <CityLogo link={true} linkTo="/" width="60px" height="60px" />
          </div>
        </div>
        <Link to="/the_team" className={styles.link}>
          <Button color="inherit">The Team</Button>
        </Link>
        <Link to="/the_matches" className={styles.link}>
          <Button color="inherit">The Matches</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
