import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import ResponsiveDrawer from "../screens/post/post.screen";

const HomeNavigator = () => {
  return (
    <Switch>
      <Route path="/post" component={ResponsiveDrawer} />
      <Route>
        <Redirect to="/post" />
      </Route>
    </Switch>
  );
};

export default HomeNavigator;
