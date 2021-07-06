import { Button, Container, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { changePassword } from "./profile.request";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("you tried lol");
  const [newPassword, setNewPassword] = useState("you tried again ..?");
  const [failed, setFailed] = useState(false);

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
        onBlur={() =>
          oldPassword === "" ? setOldPassword("you tried lol") : null
        }
        onFocus={() =>
          oldPassword === "you tried lol" ? setOldPassword("") : null
        }
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
        onBlur={() =>
          newPassword === "" ? setNewPassword("you tried again ..?") : null
        }
        onFocus={() =>
          newPassword === "you tried again ..?" ? setNewPassword("") : null
        }
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Grid item xs={12} sm={6}>
        <Button
          variant="outlined"
          color="primary"
          onClick={async () => {
            const result = await changePassword(oldPassword, newPassword);
            if (result.data) {
              setFailed(false);
            } else {
              setFailed(true);
            }
            setNewPassword("you tried again ..?");
            setOldPassword("you tried lol");
          }}
        >
          Change
        </Button>
      </Grid>
    </Container>
  );
};

export default ChangePassword;
