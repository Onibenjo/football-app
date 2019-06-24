import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../auth";

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
            <Component {...props} />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
