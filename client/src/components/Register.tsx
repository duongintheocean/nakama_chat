import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/authen.css";
import { handleSignup } from "../nakama";
import { message } from "antd";
export default function Register() {
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const [userInformation, setUserInformation] = useState<{
    email: string;
    username: string;
    password: string;
    refillPassword: string;
  }>({ email: "", username: "", password: "", refillPassword: "" });
  const handleTakeInformation = (argument: EventTarget & HTMLInputElement) => {
    const newUserInformation = {
      ...userInformation,
      [argument.name]: argument.value,
    };
    setUserInformation(newUserInformation);
  };
  const handleSubmit = async () => {
    console.log("running in to it", userInformation);

    if (validateEmail(userInformation.email)) {
      if (!userInformation.username.trim()) {
        return alert("khong de trong user name");
      }
      if (!userInformation.password.trim()) {
        return alert("khong de trong password");
      }
      if (
        userInformation.password.trim() !==
        userInformation.refillPassword.trim()
      ) {
        return alert("password va refill password khong trung nhau");
      }
      try {
        const session = await handleSignup({
          email: userInformation.email.trim(),
          password: userInformation.password.trim(),
          userName: userInformation.username.trim(), // Corrected this line
        });

        localStorage.setItem("session", JSON.stringify(session));
        return message.success("dang ki thanh cong");
      } catch (error) {}
    } else {
      return alert("email sai dinh dang");
    }
  };
  return (
    <div className="register_container">
      <span className="login_div">
        <h2>Register</h2>
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
            onChange={(e) => handleTakeInformation(e.target)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleTakeInformation(e.target)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleTakeInformation(e.target)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="refill password"
            name="refillPassword"
            onChange={(e) => handleTakeInformation(e.target)}
          />
        </div>
        <div className="submit_button">
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <span className="register_option">
          or <Link to={"/authen"}>login</Link>
        </span>
      </form>
    </div>
  );
}
