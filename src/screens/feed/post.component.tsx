import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { useProfileSelector } from "../../storage/app.selectors";
import { likePost, unlikePost } from "./post.requests";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 25, width: "90%" },
}));

const moment = require("moment");

const PostComponent = (props) => {
  const profile = useProfileSelector((state) => state.profile);
  const styles = useStyles();

  const handleLike = async () => {
    if (profile && profile.id != props.author.id) {
      if (props.isLiked) {
        await unlikePost(props.id);
      } else {
        await likePost(profile.id, props.id);
      }
    }
  };

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
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon
              onClick={async () => await handleLike()}
              style={{ fill: props.isLiked ? "red" : null }}
            />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default PostComponent;
