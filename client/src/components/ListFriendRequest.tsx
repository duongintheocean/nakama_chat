import React, { useEffect, useState } from "react";
import {
  handleRefreshSession,
  handleTakeListRequestHasSent,
  handleTakeListReceived,
} from "../nakama";
import "./css/listFriend.css";
import { Session } from "@heroiclabs/nakama-js";
import { useNavigate } from "react-router-dom";
import FriendRequest from "./FriendRequest";
export default function ListFriendRequest() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session>();
  const [requestSents, setRequestSents] = useState<any[]>([]);
  const [requestReceives, setRequestReceives] = useState<any[]>([]);
  const handleSetup = async () => {
    const localStorageData = localStorage.getItem("session");
    if (localStorageData) {
      const newSession: Session = JSON.parse(localStorageData);
      if (
        newSession &&
        newSession.expires_at &&
        newSession.expires_at < Date.now()
      ) {
        try {
          const data = await handleRefreshSession(newSession);
          setSession(data);
          localStorage.setItem("session", JSON.stringify(data));
          const newListHasSent = await handleTakeListRequestHasSent(data);
          const newListReceive = await handleTakeListReceived(data);
          console.log(newListReceive.friends, "<---- line 24");
          if (!newListHasSent.friends) {
            return;
          }
          if (!newListReceive.friends) {
            return;
          }
          setRequestReceives(newListReceive.friends);
          return setRequestSents(newListHasSent.friends);
        } catch (error) {
          console.log(error);
        }
      } else {
        const newListHasSent = await handleTakeListRequestHasSent(newSession);
        const newListReceive = await handleTakeListReceived(newSession);
        if (!newListHasSent.friends) {
          return;
        }
        if (!newListReceive.friends) {
          return;
        }
        setRequestReceives(newListReceive.friends);
        setRequestSents(newListHasSent.friends);
        setSession(newSession);
      }
    } else {
      navigate("/authen");
    }
  };
  useEffect(() => {
    handleSetup();
  }, []);
  return (
    <div className="list_friend_container">
      <div>
        <h2>Your Friend Request</h2>
      </div>
      <div className="friend_request_type">
        <div>
          <h4>Sent</h4>
        </div>
        <div>
          <h4>Receive</h4>
          {requestReceives?.map((e) => {
            return (
              <FriendRequest atr={e} afterAction={handleSetup}></FriendRequest>
            );
          })}
        </div>
      </div>
    </div>
  );
}
