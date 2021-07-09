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
import Post from "../../models/post";
import {
  useAppDispatch,
  useFeedSelector,
  useProfileSelector,
} from "../../storage/app.selectors";
import { savePosts } from "../../storage/feed.reducer";
import {
  followPublicProfile,
  unFollowPublicProfile,
} from "../../storage/profile.reducer";
import ExternalPostsList from "../feed/external.post.list";
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
  const posts: Post[] = useFeedSelector((state) => state.posts);

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
      dispatch(savePosts({ posts: profile.posts }));
    }

    fetchProfile();
  }, [isFollowing]);

  if (!profile) {
    return <LoadingScreen />;
  }

  const getPost = () => {
    if (profile) {
      return posts.filter((p) => p.author.id === profile.id);
    }
    return [];
  };

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
        {isLoggedIn ? (
          <PostsList posts={getPost()} />
        ) : (
          <ExternalPostsList posts={profile.posts} />
        )}
      </Container>
    </Container>
  );
};

export default PublicProfileScreen;
