import { Badge, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { useConversationSelector } from "../../storage/app.selectors";

const ChatsListItem = ({ history }) => {
  const chats = useConversationSelector((state) => state.chats);

  const unreadCount =
    chats.length == 0
      ? 0
      : chats.map((c) => c.unreadCount).reduce((a, b) => a + b);

  return (
    <Badge badgeContent={unreadCount} color="primary">
      <ListItem button key={"Chats"} onClick={() => history.push("/chats")}>
        <ListItemText primary={"Chats"} />
      </ListItem>
    </Badge>
  );
};

export default withRouter(ChatsListItem);
