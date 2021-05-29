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
import { clearToken } from "../../storage/core.reducer";
import FeedListItem from "./feed.list.item";
import ProfileListItem from "./profile.list.item";

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
        <ProfileListItem />
        <Divider />
        <ListItem button onClick={() => dispatch(clearToken())}>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Container>
  );
};

export default CustomDrawer;
