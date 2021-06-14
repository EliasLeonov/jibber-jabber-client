import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useFeedSelector } from "../../storage/app.selectors";
import { createPost, fetchPosts } from "../../storage/feed.reducer";
import Post from "./post.component";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
  },
  postButton: { marginRight: 15 },
  postText: { flex: 1 },
}));

const FeedScreen = () => {
  const styles = useStyles();
  const [value, setValue] = useState("");
  const posts = useFeedSelector((state) => state.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Container>
      <Container className={styles.textContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={styles.postButton}
          onClick={async () =>
            await dispatch(
              createPost({ username: "bauti", text: "my first jab" })
            )
          }
        >
          Post
        </Button>
        <TextField
          className={styles.postText}
          multiline
          rowsMax={4}
          value={value}
          placeholder={"What is on your mind?"}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
        />
      </Container>
      <Container>
        {posts.map((x) => (
          <Post {...x} timestamp={x.timestamp} />
        ))}
      </Container>
    </Container>
  );
};

export default FeedScreen;
