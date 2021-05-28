import React from "react";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import RegisterScreen from "../screens/register/register.screen";
import SignInScreen from "../screens/signin/signIn.screen";

const SignInNavigator = () => {
  return (
    <Switch>
      <Route path="/signin" component={SignInScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route>
        <Redirect to="/signin" />
      </Route>
    </Switch>
  );
};

export default SignInNavigator;
