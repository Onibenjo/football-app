import React from "react";
import "./App.css";
import "./Resources/css/app.css";
import Layout from "./HOC/Layout";
import { Switch } from "react-router-dom";
import { AuthProvider } from "./auth";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Home from "./components/home";
import SignIn from "./components/signin";
import Dashboard from "./components/admin/Dashboard";
import Matches from "./components/admin/Matches";
import AddEditMatch from "./components/admin/AddEditMatch";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Switch>
          <PublicRoute exact component={Home} path="/" />
          <PublicRoute exact restricted component={SignIn} path="/signin" />
          <PrivateRoute exact component={Dashboard} path="/dashboard" />
          <PrivateRoute exact component={Matches} path="/admin_matches" />
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
        </Switch>
      </Layout>
    </AuthProvider>
  );
};

export default App;
