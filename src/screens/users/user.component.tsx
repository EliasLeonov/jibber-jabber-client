import { Card, CardHeader, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 25, width: "90%" },
}));

const UserComponent = (props) => {
  const styles = useStyles();
  return (
    <Container
      className={styles.root}
      onClick={() => props.history.push(`/profile/${props.username}`)}
    >
      <Card>
        <CardHeader title={props.firstname} subheader={`@${props.username}`} />
      </Card>
    </Container>
  );
};

export default withRouter(UserComponent);
