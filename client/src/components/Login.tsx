import React, { useState } from "react";
import "./css/authen.css";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../nakama";

export default function Login() {
  const [userInformation, setUserInformation] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const navigate = useNavigate();
  const handleTakeInFormation = (argument: EventTarget & HTMLInputElement) => {
    const newUserInformation = {
      ...userInformation,
      [argument.name]: argument.value,
    };
    setUserInformation(newUserInformation);
  };
  const handleSubmit = async () => {
    try {
      const session = await handleLogin({
        email: userInformation.email,
        password: userInformation.password,
      });
      console.log("line 25");
      localStorage.setItem("session", JSON.stringify(session));
      navigate("/");
    } catch (error: any) {
      return alert("your email or password or wrong");
    }
  };
  return (
    <div className="login_container">
      <span className="login_div">
        <h2>Login</h2>
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(e) => {
              handleTakeInFormation(e.target);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => {
              handleTakeInFormation(e.target);
            }}
          />
        </div>
        <div className="submit_button">
          <button onClick={handleSubmit}>Login</button>
        </div>
        <span className="register_option">
          or <Link to={"register"}>signup</Link>
        </span>
      </form>
    </div>
  );
}
