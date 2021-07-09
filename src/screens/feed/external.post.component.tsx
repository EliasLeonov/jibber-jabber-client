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

const moment = require("moment");

const ExternalPostComponent = (props) => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <Card>
        <CardHeader
          title={props.author.username}
          subheader={moment(props.timestamp).format("llll")}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ExternalPostComponent;
