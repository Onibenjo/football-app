import React from "react";
import "./Resources/css/app.css";
import Layout from "./HOC/Layout";
import { Switch } from "react-router-dom";
import { AuthProvider } from "./auth";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Home from "./components/home";
import SignIn from "./components/signin";
import TheTeam from "./components/team";
import TheMatches from "./components/matches";
import Dashboard from "./components/admin/Dashboard";
import Matches from "./components/admin/Matches";
import AddEditMatch from "./components/admin/AddEditMatch";
import Players from "./components/admin/Players";
import AddEditPlayer from "./components/admin/AddEditPlayer";
import Error404Page from "./components/UI/Error404Page";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <PrivateRoute exact component={Dashboard} path="/dashboard" />
        <PrivateRoute exact component={Matches} path="/admin_matches" />
        <PrivateRoute exact component={Players} path="/admin_players" />
        <PrivateRoute
          exact
          component={AddEditMatch}
          path="/admin_matches/edit"
        />
        <PrivateRoute
          exact
          component={AddEditMatch}
          path="/admin_matches/edit/:id"
        />
        <PrivateRoute
          exact
          component={AddEditPlayer}
          path="/admin_players/edit"
        />
        <PrivateRoute
          exact
          component={AddEditPlayer}
          path="/admin_players/edit/:id"
        />
        <PublicRoute exact component={Home} path="/" />{" "}
        <PublicRoute exact restricted component={SignIn} path="/signin" />
        <PublicRoute exact component={TheTeam} path="/the_team" />
        <PublicRoute exact component={TheMatches} path="/the_matches" />
        <PublicRoute component={Error404Page} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
