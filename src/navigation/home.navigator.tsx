import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import ChatsScreen from "../screens/chats/chats.screen";
import PrivateChatScreen from "../screens/chats/private.chat.screen";
import CustomDrawer from "../screens/drawer/home.drawer";
import FeedScreen from "../screens/feed/feed.screen";
import ProfileEditScreen from "../screens/profile/profile.edit.screen";
import ProfileScreen from "../screens/profile/profile.screen";
import UsersScreen from "../screens/users/users.screen";

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
          <Route path="/profile/:username?" exact component={ProfileScreen} />
          <Route
            path="/profile/:username?/edit"
            exact
            component={ProfileEditScreen}
          />
          <Route path="/chats" component={ChatsScreen} />
          <Route path="/chat/:username?" component={PrivateChatScreen} />
          <Route path="/users" component={UsersScreen} />
          <Route>
            <Redirect to="/feed" />
          </Route>
        </Switch>
      </Container>
    </Container>
  );
};

export default HomeNavigator;
