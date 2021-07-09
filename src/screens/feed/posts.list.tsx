import { Container } from "@material-ui/core";
import React from "react";
import PostComponent from "./post.component";

const PostsList = (props) => {
  const { posts } = props;

  return (
    <Container>
      {posts.length > 0 ? (
        posts.map((x) => <PostComponent {...x} key={x.id} />)
      ) : (
        <EmptyComponent />
      )}
    </Container>
  );
};

const EmptyComponent = (props) => {
  return (
    <Container>
      <label>No posts</label>
    </Container>
  );
};

export default PostsList;
