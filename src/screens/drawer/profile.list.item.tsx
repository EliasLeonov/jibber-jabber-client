import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { useProfileSelector } from "../../storage/app.selectors";

const ProfileListItem = ({ history }) => {
  const id: string = useProfileSelector((state) => state.profile.id);

  return (
    <ListItem
      button
      key={"Profile"}
      onClick={() => history.push(`/profile/${id}`)}
    >
      <ListItemText primary={"Profile"} />
    </ListItem>
  );
};

export default withRouter(ProfileListItem);
