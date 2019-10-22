import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import AdminLayout from "./../../HOC/AdminLayout";

import { firebaseArrayLoop, reverseArray } from "../UI/misc";
import { firebasePlayers } from "../../firebase";

const styles = theme => ({
  root: {
    width: "100%",
    margin: "0 auto",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  table: {
    minWidth: 580
  }
});

const Players = ({ classes }) => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  const playerList = useCallback(() => {
    firebasePlayers.once("value").then(res => {
      const data = firebaseArrayLoop(res);
      setPlayers(reverseArray(data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    playerList();

    return () => firebasePlayers.off();
  }, [playerList]);

  return (
    <AdminLayout>
      <Paper className={classes.root}>
        {loading ? (
          <div className="admin_progress">
            <CircularProgress thickness={6} style={{ color: "#98c5e9" }} />
          </div>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.length > 0
                ? players.map(player => {
                    return (
                      <TableRow key={player.id}>
                        <TableCell component="th" scope="row">
                          <Link to={`/admin_players/edit/${player.id}`}>
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_players/edit/${player.id}`}>
                            {player.lastname}
                          </Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        )}
      </Paper>
    </AdminLayout>
  );
};

export default withStyles(styles)(Players);
