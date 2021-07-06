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
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  useAppDispatch,
  useFeedSelector,
  useProfileSelector,
} from "../../storage/app.selectors";
import { fetchPosts } from "../../storage/feed.reducer";
import { fetchProfile } from "../../storage/profile.reducer";
import PostsList from "../feed/posts.list";
import LoadingScreen from "../loading.screen";

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

const PrivateProfileScreen = ({ history }) => {
  const profile = useProfileSelector((state) => state.profile);
  const posts = useFeedSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    async function fetch() {
      await dispatch(fetchProfile());
      await dispatch(fetchPosts());
    }

    fetch();
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
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => history.push(`/profile/${profile.username}/edit`)}
        >
          Edit
        </Button>
      </form>
      <Container>
        <PostsList posts={posts.filter((p) => p.author.id == profile.id)} />
      </Container>
    </Container>
  );
};

export default withRouter(PrivateProfileScreen);
