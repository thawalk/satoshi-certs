import React, { Component, useState } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "./Components/Admin";
import GenerateCert from "./Components/GenerateCert";
import CertificateDisplay from "./Components/CertificateDisplay";
import NavBarInstitute from "./Components/NavBarInstitute";
import NavBarSysAdmin from "./Components/NavBarSysAdmin";
import NavBarLanding from "./Components/NavBarLanding";

const DynamicLayoutRoute = (props) => {
  const { component: RoutedComponent, layout, ...rest } = props;

  // render actual Route from react-router
  const actualRouteComponent = (
    <Route {...rest} render={(props) => <RoutedComponent {...props} />} />
  );

  // depends on the layout, you can wrap Route component in different layouts
  switch (layout) {
    case "INSTITUTE": {
      return (
        <div>
          <NavBarInstitute />
          {actualRouteComponent}
        </div>
      );
    }
    case "SYSADMIN": {
      return (
        <div>
          <NavBarSysAdmin />
          {actualRouteComponent}
        </div>
      );
    }
    default: {
      return (
        <div>
          <NavBarLanding />
          {actualRouteComponent}
        </div>
      );
    }
  }
};

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <Switch>
          <DynamicLayoutRoute
            exact
            path="/"
            component={Admin}
            layout="LANDING"
          />
          <DynamicLayoutRoute
            exact
            path="/admin"
            component={Admin}
            layout="SYSADMIN"
          />
          <DynamicLayoutRoute
            exact
            path="/institute"
            component={GenerateCert}
            layout="INSTITUTE"
          />
          <DynamicLayoutRoute
            path="/certificate/:id"
            component={CertificateDisplay}
          />
          <DynamicLayoutRoute path="*">
            <Redirect to="/" />
          </DynamicLayoutRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
