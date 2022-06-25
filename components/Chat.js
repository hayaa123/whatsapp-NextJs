import { Avatar } from "@mui/material";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
function Chat({ id, users }) {
  let router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <Container onClick={enterChat}>
      {recipient ? <UserAvatar src={recipient?.photoURL} /> : <UserAvatar />}

      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;
export async function GetServerSideProps(context) {
  const ref = db.collections("chats").doc(context.query.id);
  // prep the messager on the server

  const messageRes = await ref
    .collection("messages")
    .order("timestamp", "asc")
    .get();

  const messages = messagesRes.docs.map(doc => ({
    id:doc.id,
    ...doc.data()
  })).map(messages => ({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime()
  }))


  // prep the chat 
    const ChatRes = await ref.get();
    const chat = {
      id : ChatRes.id,
      ...ChatRes.data()
    }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
