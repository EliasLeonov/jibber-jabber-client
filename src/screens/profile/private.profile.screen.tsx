import { Container, TextField } from "@material-ui/core";
import { useEffect } from "react";
import {
  useAppDispatch,
  useProfileSelector,
} from "../../storage/app.selectors";
import { fetchProfile } from "../../storage/profile.reducer";
import PostsList from "../feed/posts.list";
import LoadingScreen from "../loading.screen";
import ChangePassword from "./change.password";

const PrivateProfileScreen = () => {
  const profile = useProfileSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetch() {
      await dispatch(fetchProfile());
    }

    fetch();
  }, []);

  if (!profile) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          value={profile.username}
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
          value={profile.firstname + " " + profile.lastname}
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
          value={profile.mail}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <ChangePassword />
      </form>
      <Container>
        <PostsList posts={profile.posts} />
      </Container>
    </Container>
  );
};

export default PrivateProfileScreen;
