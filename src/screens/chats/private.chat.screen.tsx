import {
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SocketJsClient from "react-stomp";
import {
  useAppDispatch,
  useConversationSelector,
  useProfileSelector,
} from "../../storage/app.selectors";
import {
  fetchMessages,
  messageReceived,
  setConnected,
} from "../../storage/conversation.reducer";
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
  let client: any = useRef(undefined);
  const [value, setValue] = useState("");
  const connected: boolean = useConversationSelector(
    (state) => state.connected
  );
  const styles = useStyles();
  const myProfile = useProfileSelector((state) => state.profile);
  const [profile, setProfile] = useState(undefined);
  const messages = useConversationSelector((state) => state.messages);

  const sendMessage = () => {
    if (value.trim() !== "") {
      const message = {
        msg: value.trim(),
        senderId: myProfile.id,
        receiverId: profile.id,
      };

      setValue("");
      client.sendMessage(`/app/chat`, JSON.stringify(message));
    }
  };

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

  const onMessage = (msg, topic) => {
    console.log("MESAGE RECEIVED");
    dispatch(messageReceived({ message: msg }));
  };

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
        <Typography variant="h3">{connected}</Typography>
      </Container>
      <Container className={styles.messageContainer}>
        {messages
          .filter(
            (m) => m.receiverId === profile.id || m.senderId === profile.id
          )
          .map((m) => {
            return <label>MESSAGE</label>;
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
          onClick={sendMessage}
        >
          Send
        </Button>
      </Container>
      {profile && myProfile && (
        <SocketJsClient
          url={"http://localhost:9002/ws"}
          topics={[`/user/${myProfile.id}/queue/messages`]}
          ref={(c) => {
            client = c;
          }}
          onConnect={() => {
            dispatch(setConnected(true));
          }}
          onDisconnect={() => dispatch(setConnected(false))}
          onConnectFailure={() => dispatch(setConnected(false))}
          onMessage={onMessage}
          debug={true}
        />
      )}
    </Container>
  );
};

export default PrivateChatScreen;
