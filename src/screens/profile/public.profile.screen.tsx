import { Container, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../loading.screen";
import { fetchPublicProfile } from "./profile.request";

interface ParamTypes {
  username: string;
}

const PublicProfileScreen = () => {
  const { username } = useParams<ParamTypes>();
  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    async function fetchProfile() {
      const profile = await fetchPublicProfile(username).then(
        (res) => res.data
      );
      setProfile(profile);
    }

    fetchProfile();
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
          value={profile.firstname}
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
        />
      </form>
    </Container>
  );
};

export default PublicProfileScreen;
