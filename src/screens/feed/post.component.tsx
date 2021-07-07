import {
  Button,
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
import {
  useAppDispatch,
  useFeedSelector,
  useProfileSelector,
} from "../../storage/app.selectors";
import {
  deleteUserPost,
  likeUserPost,
  unLikeUserPost,
} from "../../storage/feed.reducer";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 25, width: "90%" },
}));

const moment = require("moment");

const PostComponent = (props) => {
  const profile = useProfileSelector((state) => state.profile);
  const isLoggedIn = useProfileSelector((state) => state.profile != undefined);
  const isLiked = useFeedSelector(
    (state) => state.posts.find((p) => p.id === props.id).isLiked
  );
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const isAuthor: boolean = profile && profile.id == props.author.id;

  const handleLike = async () => {
    if (!isAuthor) {
      if (isLiked) {
        await dispatch(unLikeUserPost({ postId: props.id }));
      } else {
        await dispatch(likeUserPost({ userId: profile.id, postId: props.id }));
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
        {isLoggedIn && (
          <CardActions disableSpacing>
            {isAuthor ? (
              <Button
                size="small"
                onClick={async () => {
                  await dispatch(deleteUserPost({ postId: props.id }));
                }}
              >
                Delete
              </Button>
            ) : (
              <IconButton aria-label="add to favorites">
                <FavoriteIcon
                  onClick={async () => await handleLike()}
                  style={{ fill: isLiked ? "red" : null }}
                />
              </IconButton>
            )}
          </CardActions>
        )}
      </Card>
    </Container>
  );
};

export default PostComponent;
