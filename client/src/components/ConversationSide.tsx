import React, { useEffect, useState } from "react";
import "./css/conversation.css";
import Conversation from "./Conversation";
import client, {
  handleAddFriendByName,
  handleTakeListFriend,
  handleRefreshSession,
} from "../nakama";
import { useNavigate } from "react-router-dom";
import { Session } from "@heroiclabs/nakama-js";
import { message } from "antd";
export default function ConversationSide() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<string>("");
  const [session, setSession] = useState<Session>();
  const [listFriend, setListFriend] = useState<any[]>([]);
  const handleSetup = async () => {
    const localStorageData = localStorage.getItem("session");
    if (localStorageData) {
      const storedSession: Session = JSON.parse(localStorageData);
      if (storedSession && storedSession.expires_at && storedSession.expires_at < Date.now()) {
        try {
          const refreshedSession = await handleRefreshSession(storedSession);
          setSession(refreshedSession);
          const newListFriend = await handleTakeListFriend(refreshedSession);
          console.log(newListFriend,"<--- newListFriend");
          
          if (newListFriend.friends) {
            setListFriend(newListFriend.friends);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        handleTakeListFriend(storedSession);
        setSession(storedSession);
      }
    } else {
      navigate("/authen");
    }
  };

  useEffect(() => {
    handleSetup();
  }, []);

  const handleSubmitFriendRequest = async () => {
    try {
      if (!session || !session.expires_at || session.expires_at < Date.now()) {
        if (!session) {
          return
        }
        const newSession = await handleRefreshSession(session);
        setSession(newSession);
        const response = await handleAddFriendByName(newSession, userInput);
        const newListFriend = await handleTakeListFriend(newSession);
        if (newListFriend.friends) {
          setListFriend(newListFriend.friends);
        }
        message.success("Your friend request has been sent");
      } else {
        await handleAddFriendByName(session, userInput);
        message.success("Your friend request has been sent");
      }
    } catch (error) {
      message.error("This username does not exist");
      console.error(error);
    }
  };
  return (
    <div className="conversation_side_container">
      <div className="chat_title">
        <h2>Chat of {session?.username}</h2>
      </div>
      <div className="search_bar_container">
        <input type="text" className="hide_input" />
        <div className="search_container">
          <div className="search_dump_div">
            <div className="search_icon">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "#C2C2C4" }}
              ></i>
            </div>
            <input
              placeholder="enter your friend name"
              className="input_messenger"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            <div className="add_icon" onClick={handleSubmitFriendRequest}>
              <i className="fa-solid fa-plus" style={{ color: "white" }}></i>
            </div>
          </div>
        </div>
      </div>
      <div className="conversation_template">
        {listFriend.map((element: any) => {
          return <Conversation atr={element}></Conversation>;
        })}
      </div>
    </div>
  );
}
