import {
  Card,
  CardContent,
  CardHeader,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 25, width: "90%" },
}));

const Conversation = (props) => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <Card>
        <CardHeader
          title={props.firstName}
          subheader={`@${props.username}`}
          color="textPrimary"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.lastMessage}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Conversation;
