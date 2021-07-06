import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useProfileSelector,
} from "../../storage/app.selectors";
import {
  followPublicProfile,
  unFollowPublicProfile,
} from "../../storage/profile.reducer";
import PostsList from "../feed/posts.list";
import LoadingScreen from "../loading.screen";
import { fetchPublicProfile, isFollowingProfile } from "./profile.request";

interface ParamTypes {
  username: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      margin: 10,
      flexGrow: 1,
    },
    text: {
      paddingRight: theme.spacing(10),
    },
  })
);

const PublicProfileScreen = () => {
  const { username } = useParams<ParamTypes>();
  const isLoggedIn = useProfileSelector((state) => state.profile != undefined);
  const [profile, setProfile] = useState(undefined);
  const [isFollowing, setIsFollowing] = useState(false);

  const classes = useStyles();

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchProfile() {
      const profile = await fetchPublicProfile(username).then(
        (res) => res.data
      );
      if (profile && isLoggedIn) {
        const following: boolean = await isFollowingProfile(profile.id).then(
          (res) => res.data
        );

        setIsFollowing(following);
      }

      setProfile(profile);
    }

    fetchProfile();
  }, []);

  if (!profile) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Grid container justify="center" className={classes.root}>
        <Typography variant="h5" className={classes.text}>
          Following: {profile.following.length}
        </Typography>
        <Typography variant="h5" className={classes.text}>
          Followers: {profile.followers.length}
        </Typography>
      </Grid>
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
      <Container>
        {isLoggedIn ? (
          isFollowing ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={async () =>
                await dispatch(unFollowPublicProfile({ id: profile.id })).then(
                  () => setIsFollowing(false)
                )
              }
            >
              unFollow
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={async () =>
                await dispatch(followPublicProfile({ id: profile.id })).then(
                  () => setIsFollowing(true)
                )
              }
            >
              Follow
            </Button>
          )
        ) : (
          <div />
        )}
        <PostsList posts={profile.posts} />
      </Container>
    </Container>
  );
};

export default PublicProfileScreen;
