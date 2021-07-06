import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { useProfileSelector } from "../../storage/app.selectors";

const ProfileListItem = ({ history }) => {
  const username: string = useProfileSelector(
    (state) => state.profile.username
  );

  return (
    <ListItem
      button
      key={"Profile"}
      onClick={() => history.push(`/profile/${username}`)}
    >
      <ListItemText primary={"Profile"} />
    </ListItem>
  );
};

export default withRouter(ProfileListItem);
