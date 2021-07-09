import { Container } from "@material-ui/core";
import React from "react";
import ExternalPostComponent from "./external.post.component";

const ExternalPostsList = (props) => {
  const { posts } = props;

  return (
    <Container>
      {posts.length > 0 ? (
        posts.map((x) => <ExternalPostComponent {...x} key={x.id} />)
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

export default ExternalPostsList;
