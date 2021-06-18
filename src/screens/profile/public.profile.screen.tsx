import { Container, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}

const PublicProfileScreen = () => {
  const { id } = useParams<ParamTypes>();
  const [profile, setProfile] = useState({
    username: undefined,
    id,
    firstname: undefined,
  });

  useEffect(() => {
    setProfile({ username: "PabloRocks", id, firstname: "Pablo" });
  }, []);

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
          defaultValue={profile.firstname}
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
