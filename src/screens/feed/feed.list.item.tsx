import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const FeedListItem = ({ history }) => {
  return (
    <ListItem button key={"Feed"} onClick={() => history.push("/feed")}>
      <ListItemText primary={"Feed"} />
    </ListItem>
  );
};

export default withRouter(FeedListItem);
