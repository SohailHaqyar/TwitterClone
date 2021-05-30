import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Login, Home, Register,  PostFeed } from "./pages";
import theme from "./theme";
import { Navbar, PrivateRoute } from "./components";
import AuthProvider from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/posts" exact component={PostFeed} />
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
