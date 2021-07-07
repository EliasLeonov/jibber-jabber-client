import { Card, CardHeader, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 25, width: "90%" },
}));

const Conversation = (props) => {
  const styles = useStyles();

  const title =
    props.unreadCount > 0
      ? `(${props.unreadCount}) ${props.firstname}`
      : `${props.firstname}`;

  return (
    <Container
      className={styles.root}
      onClick={() => props.history.push(`/chat/${props.username}`)}
    >
      <Card>
        <CardHeader
          title={title}
          subheader={`@${props.username}`}
          color="textPrimary"
        />
      </Card>
    </Container>
  );
};

export default withRouter(Conversation);
