import React from "react";
import "./css/conversation.css";
import avartaDefault from "../imgs/blank-avatar-photo-place-holder-600nw-1095249842.webp";
export default function Conversation(props: any) {
  console.log(props, "<-- line 5"); 
  return (
    <div className="conversation_detail">
      <div className="conversation_detail_image">
        <img src={avartaDefault} alt="" />
      </div>
      <div className="conversation_detail_content">
        <div>{props.atr.user.username}</div>
      </div>
    </div>
  );
}
