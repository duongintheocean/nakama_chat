import { Session } from "inspector";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConversationSide from "./ConversationSide";
import ConversationContent from "./ConversationContent";
import "./css/home.css";
import ListFriendRequest from "./ListFriendRequest";
export default function Home() {
  const navigate = useNavigate();
  const [currentSession, setCurrentSession] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const localData = localStorage.getItem("session");
    if (localData) {
      setCurrentSession(localData);
    } else {
      navigate("/authen");
    }
  }, []);
  return (
    <div className="template_container">
      <div className="conversation_side">
        <ConversationSide></ConversationSide>
      </div>
      <div className="conversation_content">
        <ConversationContent></ConversationContent>
      </div>
      <div className="friend_request">
        <ListFriendRequest></ListFriendRequest>
      </div>
    </div>
  );
}
