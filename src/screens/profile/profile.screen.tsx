import { Container, TextField } from "@material-ui/core";
import ChangePassword from "./change.password";

const user = {
  username: "Bauti123",
  firstName: "Bauti",
  lastName: "Baiocchi",
  mail: "b@b.com",
};

const ProfileScreen = () => {
  return (
    <Container>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          defaultValue={user.username}
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
          defaultValue={user.firstName + " " + user.lastName}
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
          defaultValue={user.mail}
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

export default ProfileScreen;
