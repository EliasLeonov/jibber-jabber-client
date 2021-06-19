import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useAppDispatch } from "../../storage/app.selectors";
import { clearProfile } from "../../storage/profile.reducer";
import FeedListItem from "../feed/feed.list.item";
import MessagesListItem from "../messages/message.list.item";
import ProfileListItem from "../profile/profile.list.item";
import UsersListItem from "../users/users.list.item";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "10%",
  },
}));

const CustomDrawer = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  return (
    <Container className={styles.root}>
      <Divider />
      <List>
        <FeedListItem />
        <UsersListItem />
        <MessagesListItem />
        <ProfileListItem />
        <Divider />
        <ListItem button onClick={() => dispatch(clearProfile())}>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Container>
  );
};

export default CustomDrawer;
