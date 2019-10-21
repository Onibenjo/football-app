import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../HOC/AdminLayout";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

import { firebaseArrayLoop, reverseArray } from "../UI/misc";
import { firebaseMatches } from "../../firebase";

const styles = theme => ({
  root: {
    width: "85%",
    margin: "0 auto",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const AdminMatches = ({ classes }) => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
      firebaseMatches
      .orderByChild("date")
      .once("value")
      .then(res => {
        const matches = firebaseArrayLoop(res);
        setMatches(reverseArray(matches));
        setLoading(false);
      });

    return () => firebaseMatches.off();
  }, []);

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
                <TableCell>Date</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches && matches.length > 0
                ? matches.map(match => {
                    return (
                      <TableRow key={match.id}>
                        <TableCell component="th" scope="row">
                          {match.date}
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_matches/edit/${match.id}`}>
                            {match.local} <strong>-</strong> {match.away}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {match.resultLocal} <strong>-</strong>{" "}
                          {match.resultAway}
                        </TableCell>
                        <TableCell>
                          {match.final === "Yes" ? (
                            <span className="matches_tag_red">Final</span>
                          ) : (
                            <span className="matches_tag_green">
                              Not played yet
                            </span>
                          )}
                        </TableCell>
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

export default withStyles(styles)(AdminMatches);
