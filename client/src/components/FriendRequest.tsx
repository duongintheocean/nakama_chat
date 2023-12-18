import React, { useEffect, useState } from "react";
import defaultAvarta from "../imgs/blank-avatar-photo-place-holder-600nw-1095249842.webp";
import "./css/friendRequestContainer.css";
import {
  handleAcceptFriendRequest,
  handleDeleteFriendRelation,
  handleRefreshSession,
} from "../nakama";

import { Session } from "@heroiclabs/nakama-js/dist/session";
import { useNavigate } from "react-router-dom";

export default function FriendRequest(props: any) {
  const [session, setSession] = useState<Session>();
  const navigate = useNavigate();
  const handleSetup = async () => {
    const localStorageData = localStorage.getItem("session");

    if (localStorageData) {
      let newSession: Session = JSON.parse(localStorageData);

      // Check if the session has expired
      if (newSession.expires_at && newSession.expires_at < Date.now()) {
        try {
          // Attempt to refresh the session
          newSession = await handleRefreshSession(newSession);
        } catch (error) {
          console.error("Error refreshing session:", error);
          navigate("/authen");
          return;
        }
      }

      // Set the updated session
      setSession(newSession);
    } else {
      navigate("/authen");
    }
  };
  useEffect(() => {
    handleSetup();
  }, []);
  return (
    <div className="friend_request_container">
      <span className="default_avarta_in_request">
        <img src={defaultAvarta} alt="" />
      </span>
      <span className="user_name">
        <h4>{props.atr.user.username}</h4>
      </span>
      <span
        className="friend_request_actions"
        onClick={() => {
          props.afterAction();
        }}
      >
        <button
          onClick={() => {
            session !== undefined &&
              handleAcceptFriendRequest([props.atr.user.id], session);
          }}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button
          onClick={() => {
            session !== undefined &&
              handleDeleteFriendRelation([props.atr.user.id], session);
          }}
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </span>
    </div>
  );
}
