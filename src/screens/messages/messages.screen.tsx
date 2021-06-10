import { Container } from "@material-ui/core";
import Conversation from "./conversation.card";

const conversations = [
  {
    username: "PabloRocks123",
    firstName: "Pablo",
    lastMessage: "Yo when are we leaving?",
  },
  {
    username: "BigManlo",
    firstName: "Biggie",
    lastMessage: "BTC is going to the moon, you know it, i know it.",
  },
];

const MessagesScreen = () => {
  return (
    <Container>
      {conversations.map((conv) => (
        <Conversation
          username={conv.username}
          firstName={conv.firstName}
          lastMessage={conv.lastMessage}
        />
      ))}
    </Container>
  );
};

export default MessagesScreen;
