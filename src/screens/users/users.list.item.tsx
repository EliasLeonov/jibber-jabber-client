import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const UsersListItem = ({ history }) => {
  return (
    <ListItem button key={"Users"} onClick={() => history.push("/users")}>
      <ListItemText primary={"Users"} />
    </ListItem>
  );
};

export default withRouter(UsersListItem);
