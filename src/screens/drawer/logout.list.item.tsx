import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { useAppDispatch } from "../../storage/app.selectors";
import { clearFeed } from "../../storage/feed.reducer";
import { clearProfile } from "../../storage/profile.reducer";
import { clearUsers } from "../../storage/users.reducer";
import { post } from "../../utils/HttpClient";

const LogOutListItem = ({ history }) => {
  const dispatch = useAppDispatch();

  return (
    <ListItem
      button
      key={"Logout"}
      onClick={async () => {
        await post("/auth/user/logout");
        dispatch(clearProfile());
        dispatch(clearUsers());
        dispatch(clearFeed());
        history.push(`/signin`);
      }}
    >
      <ListItemText primary={"Logout"} />
    </ListItem>
  );
};

export default withRouter(LogOutListItem);
