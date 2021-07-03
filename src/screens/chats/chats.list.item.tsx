import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const ChatsListItem = ({ history }) => {
  return (
    <ListItem button key={"Chats"} onClick={() => history.push("/chats")}>
      <ListItemText primary={"Chats"} />
    </ListItem>
  );
};

export default withRouter(ChatsListItem);
