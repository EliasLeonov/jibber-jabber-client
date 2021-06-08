import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const MessagesListItem = ({ history }) => {
  return (
    <ListItem button key={"Messages"} onClick={() => history.push("/messages")}>
      <ListItemText primary={"Messages"} />
    </ListItem>
  );
};

export default withRouter(MessagesListItem);
