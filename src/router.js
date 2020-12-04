import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// home router outlet
const AppRouter = () => (
  <Switch>
    <Route exact path='/login' component={Login} />
    <Route path='/' component={Dashboard} />
  </Switch>
);

export default AppRouter;