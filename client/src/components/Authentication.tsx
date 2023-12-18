import React from "react";
import { Outlet } from "react-router-dom";
import "./css/authen.css";
import defaultAvatar from "../imgs/5163895-200.png";
export default function Authentication() {
  return (
    <div className="authen_template">
      <div className="default_avatar">
        <img src={defaultAvatar} alt="" />
      </div>
      <div className="authen_form">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
