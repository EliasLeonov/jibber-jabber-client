import { Container, Divider, List, makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import FeedListItem from "../feed/feed.list.item";
import MessagesListItem from "../messages/message.list.item";
import ProfileListItem from "../profile/profile.list.item";
import UsersListItem from "../users/users.list.item";
import LogOutListItem from "./logout.list.item";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "10%",
  },
}));

const CustomDrawer = ({ history }) => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <Divider />
      <List>
        <FeedListItem />
        <UsersListItem />
        <MessagesListItem />
        <ProfileListItem />
        <Divider />
        <LogOutListItem />
      </List>
    </Container>
  );
};

export default withRouter(CustomDrawer);
