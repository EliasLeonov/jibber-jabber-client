import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useAppDispatch } from "../../storage/app.selectors";
import { clearToken } from "../../storage/core.reducer";
import FeedListItem from "./feed.list.item";
import ProfileListItem from "./profile.list.item";

const CustomDrawer = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Divider />
      <List>
        <FeedListItem />
        <ProfileListItem />
        <Divider />
        <ListItem button onClick={() => dispatch(clearToken())}>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );
};

export default CustomDrawer;
