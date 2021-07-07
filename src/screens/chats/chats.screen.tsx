import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  useAppDispatch,
  useConversationSelector,
  useProfileSelector,
  useUsersSelector,
} from "../../storage/app.selectors";
import { fetchAllChats } from "../../storage/conversation.reducer";
import { getAllChatUsers } from "../../storage/users.reducer";
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

function merge(users: any[], chats: any[]) {
  const merged = [];
  for (var c = 0; c < chats.length; c++) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == chats[c].receiverId) {
        merged.push({ ...chats[c], receiver: users[i] });
      }
    }
  }
  return merged;
}

const ChatsScreen = ({ history }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const profile = useProfileSelector((state) => state.profile);
  const chats: any[] = useConversationSelector((state) => state.chats);
  const users: any[] = useUsersSelector((state) => state.users);

  useEffect(() => {
    async function fetchChats() {
      await dispatch(fetchAllChats({ userId: profile.id }));
    }

    fetchChats();
  }, []);

  useEffect(() => {
    async function fetchRecipients() {
      await dispatch(getAllChatUsers({ chats }));
    }

    fetchRecipients();
  }, [chats]);

  console.log(chats);

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
          onClick={() => {
            if (value.trim() !== "") {
              history.push(`/chat/${value.trim()}`);
            }
          }}
        >
          Chat
        </Button>
      </Container>
      {users &&
        chats &&
        merge(users, chats).map((conv) => (
          <Conversation
            key={conv.id}
            username={conv.receiver.username}
            firstname={conv.receiver.firstname}
            receiverId={conv.receiverId}
            unreadCount={conv.unreadCount}
          />
        ))}
    </Container>
  );
};

export default withRouter(ChatsScreen);
