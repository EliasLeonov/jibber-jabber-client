import { Card, CardHeader, Container, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 25, width: "90%" },
}));

const UserComponent = (props) => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <Card>
        <CardHeader title={props.firstname} subheader={`@${props.username}`} />
      </Card>
    </Container>
  );
};

export default UserComponent;
