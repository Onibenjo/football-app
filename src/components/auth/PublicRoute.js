import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../auth";
import Layout from './../../HOC/Layout';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        rest.restricted ? (
          !!currentUser ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: props.location }
              }}
            />
          ) : (
              <Layout>
                
            <Component {...props} />
            </Layout>
          )
        ) : (
            <Layout>

              <Component {...props} />
            </Layout>
        )
      }
    />
  );
};

export default PublicRoute;
