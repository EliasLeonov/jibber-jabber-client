import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const LoadingScreen = () => {
  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size={150} />
      </div>
    </Container>
  );
};

export default LoadingScreen;
