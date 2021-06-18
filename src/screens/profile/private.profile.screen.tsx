import { Container, TextField } from "@material-ui/core";
import { useProfileSelector } from "../../storage/app.selectors";
import ChangePassword from "./change.password";

const PrivateProfileScreen = () => {
  const profile = useProfileSelector((state) => state.profile);

  return (
    <Container>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          defaultValue={profile.username}
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          defaultValue={profile.firstname + " " + profile.lastname}
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          defaultValue={profile.mail}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <ChangePassword />
      </form>
    </Container>
  );
};

export default PrivateProfileScreen;
