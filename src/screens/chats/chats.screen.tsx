import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useConversationSelector,
  useProfileSelector,
} from "../../storage/app.selectors";
import { connect } from "../../storage/conversation.reducer";
import Conversation from "./conversation.card";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
  },
  postButton: { marginRight: 15 },
  postText: { flex: 1 },
}));

const ChatsScreen = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const connected: boolean = useConversationSelector(
    (state) => state.connected
  );
  const profile = useProfileSelector((state) => state.profile);
  const conversations: any[] = [];

  useEffect(() => {
    dispatch(connect({ userId: profile.id }));
  }, [connected]);

  return (
    <Container>
      <Container>
        <TextField
          className={styles.postText}
          multiline
          rowsMax={4}
          value={value}
          placeholder={"@username"}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
        />{" "}
        <Button
          variant="outlined"
          color="primary"
          className={styles.postButton}
          onClick={() => {}}
        >
          Chat
        </Button>
      </Container>
      {conversations.map((conv) => (
        <Conversation
          key={conv.id}
          username={conv.username}
          firstName={conv.firstName}
          lastMessage={conv.lastMessage}
        />
      ))}
    </Container>
  );
};

export default ChatsScreen;
