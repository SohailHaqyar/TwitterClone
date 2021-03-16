import React, { useEffect } from "react";
import { AlanButtonOptions } from "@alan-ai/alan-sdk-web/dist/AlanButtonOptions";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Login, Home, Register, TodoList } from "./pages";
import theme from "./theme";
import { Navbar, PrivateRoute } from "./components";
import AuthProvider from "./contexts/AuthContext";
import alanBtn from "@alan-ai/alan-sdk-web";
const alanKey =
  "7eeddbfb1b287d723743110c818ce82b2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App: React.FC = () => {
  useEffect(() => {
    const alanInstance = alanBtn({
      key: alanKey,
      onCommand: (commandData: { command: string; todos: any }) => {
        if (commandData.command === "addTodo") {
          alert("It's happening");
          console.log(commandData.todos);
        }
      },
    } as AlanButtonOptions);

    let userAccessToken = localStorage.getItem("userAccessToken");
    if (userAccessToken) {
      alanInstance.callProjectApi(
        "sendAuthData",
        { data: JSON.parse(userAccessToken!) },
        (error, result) => {
          if (error) console.error(error);
          console.log(result);
        }
      );
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/todos" exact component={TodoList} />
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
