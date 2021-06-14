import { Container } from "@material-ui/core";
import { useEffect } from "react";
import {
  useAppDispatch,
  useConversationSelector,
} from "../../storage/app.selectors";
import { fetchAll } from "../../storage/conversation.reducer";
import Conversation from "./conversation.card";

const MessagesScreen = () => {
  const dispatch = useAppDispatch();
  const conversations: any[] = useConversationSelector(
    (state) => state.conversations
  );

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  return (
    <Container>
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

export default MessagesScreen;
