import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useAppDispatch, useFeedSelector } from "../../storage/app.selectors";
import { createPost } from "../../storage/feed.reducer";
import Post from "./post.component";

const array = [
  { username: "user 1", text: "text 1" },
  { username: "user 2", text: "text 2" },
  { username: "user 3", text: "text 3" },
  { username: "user 3", text: "text 3" },
  { username: "user 3", text: "text 3" },
  { username: "user 3", text: "text 3" },
];

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
  const feed = useFeedSelector((state) => state.feed);

  const dispatch = useAppDispatch();

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
        {feed.map((x) => (
          <Post username={x.username} text={x.text} />
        ))}
      </Container>
    </Container>
  );
};

export default FeedScreen;
