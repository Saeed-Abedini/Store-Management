import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { AuthProvider } from "./contexts/Auth";
import { ThemeProvider } from "./contexts/theme";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { indexRoutes } from "./routes";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Switch>
          <TransitionGroup timeout={300} classNames="fade">
            {indexRoutes.map((prop, key) => {
              return (
                <CSSTransition timeout={300} classNames="fade" key={key}>
                  <Route
                    path={prop.path}
                    key={key}
                    component={prop.component}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </Switch>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
