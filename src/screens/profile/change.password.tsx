import { Button, Container, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { changePassword } from "./profile.request";

const ChangePassword = () => {
  const [showFields, setShowFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("you tried lol");
  const [newPassword, setNewPassword] = useState("you tried again ..?");

  if (showFields) {
    return (
      <Container>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Current Password"
          type="password"
          id="old-password"
          autoComplete="current-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            color="primary"
            onClick={async () => {
              await changePassword(oldPassword, newPassword);
              setShowFields(false);
            }}
          >
            Change
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowFields(false)}
          >
            Cancel
          </Button>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setShowFields(true)}
      >
        Change Password
      </Button>
    </Container>
  );
};

export default ChangePassword;
