import { Client, Session } from "@heroiclabs/nakama-js";
import { message } from "antd";

const serverKey = "defaultkey";
const serverHost = "localhost"; // Change this to your Nakama server's address
const serverPort = "7350";
const client = new Client(serverKey, serverHost, serverPort, false);
export default client;
const socket = client.createSocket();
export const connectSockt = async (session: Session) => {
  await socket.connect(session, true);
};
export const handleAddFriendByName = (session: Session, name: string) => {
  return client.addFriends(session, [], [name]);
};

export const handleRefreshSession = async (session: Session) => {
  try {
    const newSession = Session.restore(session.token, session.refresh_token);
    return newSession;
  } catch (error) {
    console.error("Error refreshing session:", error);
    throw error;
  }
};

export const handleAuthenticateUser = async (
  email: string,
  password: string
) => {
  try {
    const session = await client.authenticateEmail(email, password);
    return session;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error; // Propagate the error for the caller to handle
  }
};

export const handleSignup = async (e: {
  email: string;
  password: string;
  userName: string;
}) => {
  const session = await client.authenticateEmail(
    e.email,
    e.password,
    true,
    e.userName
  );
  return session;
};

export const handleLogin = async (e: { email: string; password: string }) => {
  const session = await client.authenticateEmail(e.email, e.password, false);
  return session;
};

export const handleConnectSocket = async (session: Session) => {
  const socket = client.createSocket();
  let appearOnline = true;
  await socket.connect(session, appearOnline);
  return socket;
};
export const handleTakeListRequestHasSent = (session: Session) => {
  const result = client.listFriends(session, 1, 20);
  return result;
};
export const handleTakeListReceived = (session: Session) => {
  const result = client.listFriends(session, 2, 20);
  return result;
};
export const handleTakeListFriend = (session: Session) => {
  const result = client.listFriends(session, 0, 20);
  return result;
};
export const handleDeleteFriendRelation = (ids: string[], session: Session) => {
  const result = client.deleteFriends(session, ids);
  message.success("delete successfull");
  return result;
};
export const handleAcceptFriendRequest = (ids: string[], session: Session) => {
  console.log(ids, session);
  const result = client.addFriends(session, ids);
  message.success("you are friend now");
  return result;
};
export const handleBlockUser = (ids: string[], session: Session) => {
  const result = client.blockFriends(session, ids);
  return result;
};
