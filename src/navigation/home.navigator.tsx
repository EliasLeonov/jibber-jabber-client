import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import CustomDrawer from "../screens/drawer/home.drawer";
import FeedScreen from "../screens/feed/feed.screen";
import MessagesScreen from "../screens/messages/messages.screen";
import ProfileScreen from "../screens/profile/profile.screen";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
}));

const HomeNavigator = () => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <CustomDrawer />
      <Container>
        <Switch>
          <Route path="/feed" component={FeedScreen} />
          <Route path="/profile/:username?" component={ProfileScreen} />
          <Route path="/messages" component={MessagesScreen} />
          <Route>
            <Redirect to="/feed" />
          </Route>
        </Switch>
      </Container>
    </Container>
  );
};

export default HomeNavigator;
