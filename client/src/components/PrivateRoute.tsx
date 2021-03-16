import { useAuthDataContext } from "../contexts/AuthContext";
import React from "react";

import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component, ...rest }: any) => {
  const { username: authData } = useAuthDataContext();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authData !== "" ? (
          React.createElement(component, routeProps)
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};
