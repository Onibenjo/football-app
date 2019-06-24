import React from "react";
import { Redirect } from "react-router-dom";
import AdminLayout from "../../HOC/AdminLayout";

const Dashboard = ({ location }) => {
  let { from } = location.state || { from: { pathname: "/" } };

  if (from.pathname === "/signin")
    return <Redirect to={from.state.from.pathname} />;

  return (
    <AdminLayout>
      <div className="user_dashboard">
        <div>The dashboard</div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
