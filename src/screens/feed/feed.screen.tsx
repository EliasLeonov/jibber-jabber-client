import React from "react";
import Post from "./post.component";

const FeedScreen = () => {
  const array = [
    { username: "user 1", text: "text 1" },
    { username: "user 2", text: "text 2" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 3", text: "text 3" },
    { username: "user 4", text: "text 4" },
  ];
  return (
    <div>
      {array.map((x) => (
        <Post username={x.username} text={x.text} />
      ))}
    </div>
  );
};

export default FeedScreen;
