import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const ProfileListItem = ({ history }) => {
  return (
    <ListItem button key={"Profile"} onClick={() => history.push("/profile")}>
      <ListItemText primary={"Profile"} />
    </ListItem>
  );
};

export default withRouter(ProfileListItem);
