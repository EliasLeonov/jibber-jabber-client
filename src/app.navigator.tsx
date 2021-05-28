import React from "react";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import RegisterScreen from "./screens/register/register.screen";
import SignInScreen from "./screens/signin/signIn.screen";
import PostColumn from "./screens/post/post.column";
import PostScreen from "./screens/post/post.screen"

const AppNavigator = () => {
  return (
    <Switch>
      <Route path="/signin" component={SignInScreen} />
      <Route path="/register" component={RegisterScreen} />
        <Route path={"/post"} component={PostScreen}/>
      <Route>
        <Redirect to="/signin" />
      </Route>
    </Switch>
  );
};

export default AppNavigator;
