import {
  Button,
  Container,
  createStyles,
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
import { fetchMessages, sendMessage } from "../../storage/conversation.reducer";
import LoadingScreen from "../loading.screen";
import { fetchPublicProfile } from "../profile/profile.request";

interface ParamTypes {
  username: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: 1,
    },
    messageContainer: {
      paddingRight: theme.spacing(10),
      flex: 1,
    },
    textContainer: {
      marginTop: 25,
      display: "flex",
      flexDirection: "row",
    },
    postButton: { marginRight: 15 },
    postText: { flex: 1 },
  })
);

const PrivateChatScreen = () => {
  const { username } = useParams<ParamTypes>();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const styles = useStyles();
  const myProfile = useProfileSelector((state) => state.profile);
  const [profile, setProfile] = useState(undefined);
  const messages = [];

  useEffect(() => {
    async function fetchProfile() {
      const profile = await fetchPublicProfile(username)
        .then((res) => res.data)
        .catch((err) => {
          setProfile({});
        });
      if (profile) {
        setProfile(profile);
        await dispatch(
          fetchMessages({ userId: myProfile.id, recipientId: profile.id })
        );
      } else {
        setProfile({});
      }
    }

    fetchProfile();
  }, []);

  if (!profile) {
    return <LoadingScreen />;
  }

  if (Object.keys(profile).length == 0) {
    return (
      <Container>
        <Typography variant="h3">{username} doesn't exist</Typography>
      </Container>
    );
  }

  return (
    <Container className={styles.container}>
      <Container>
        <Typography variant="h3">{username}</Typography>
      </Container>
      <Container className={styles.messageContainer}>
        {messages.map((m) => {
          return <label>m</label>;
        })}
      </Container>
      <Container className={styles.textContainer}>
        <TextField
          className={styles.postText}
          multiline
          rowsMax={4}
          value={value}
          placeholder={"message"}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="outlined"
          color="primary"
          className={styles.postButton}
          onClick={() => {
            if (value.trim() !== "") {
              dispatch(
                sendMessage({
                  msg: value.trim(),
                  senderId: myProfile.id,
                  receiverId: profile.id,
                })
              );
              setValue("");
            }
          }}
        >
          Send
        </Button>
      </Container>
    </Container>
  );
};

export default PrivateChatScreen;
