import React from "react";
import { Link } from "react-router-dom";

import { firebase } from "../../firebase";
import { ListItem } from "@material-ui/core";

const AdminNav = props => {
  const links = [
    {
      title: "Matches",
      link: "/admin_matches"
    },
    {
      title: "Add Match",
      link: "/admin_matches/edit"
    },
    {
      title: "Players",
      link: "/admin_players"
    },
    {
      title: "Add Player",
      link: "/admin_matches/add_matches"
    }
  ];

  const style = {
    color: "#ffffff",
    fontWeight: "300",
    borderBottom: "1px solid #353535",
    padding: "1.2rem"
  };

  const renderItems = () =>
    links.map(link => (
      <Link to={link.link} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged Out");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={logoutHandler}>
        Log Out
      </ListItem>
    </div>
  );
};

export default AdminNav;
