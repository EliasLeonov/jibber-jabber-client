import { makeStyles } from "@material-ui/styles";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import CustomDrawer from "../screens/drawer/home.drawer";
import PostScreen from "../screens/post/post.screen";
import ProfileScreen from "../screens/profile/profile.screen";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
}));

const HomeNavigator = () => {
  return (
    <div>
      <CustomDrawer />
      <Switch>
        <Route path="/feed" component={PostScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route>
          <Redirect to="/feed" />
        </Route>
      </Switch>
    </div>
  );
};

export default HomeNavigator;
