import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import Image from "../../assets/images/ImportFormat";
import Espacio_h10px from "../../commons/Espacio_h10px/Espacio_h10px";
import Button from "react-bootstrap/Button";
import Title from "./components/title/Title";
import Label from "./components/label/Label";
import "./login.css";
import { Goologin } from "./components/google/Goologin";

//*********************************************************** //
////////////////////SEPARATOR///////////////////////////////////
//*********************************************************** //

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [clientid, setClientid] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const load = () => {
    setUser("");
    setPassword("");
    inputRef.current.focus();
  };

  //*********************************************************** //
  ////////////////////SEPARATOR///////////////////////////////////
  //*********************************************************** //

  //Fetch to bring the id of user and confirm login user//
  const handleSubmit = (e) => {
    e.preventDefault();
    /* fetch("https://34.125.79.13:5000/entry", { */
    fetch("https://server.vrealism.com:5000/entry", {
      /* fetch("https://45.33.102.146:5000/entry", { */
      method: "POST",
      body: JSON.stringify({
        user,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        auth.setUser(json[0].username);
        auth.setId(json[0].id);
        auth.setClientid(json[0].user_client_id);
        const client = json[0].user_client_id;
        //history.push("/");
        /* fetch("https://34.125.79.13:5000/api/bringclient", { */
        fetch("https://server.vrealism.com:5000/api/bringclient", {
          /* fetch("https://45.33.102.146:5000/api/bringclient", { */
          method: "POST",
          body: JSON.stringify({
            client,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((backjson) => {
            //console.log(backjson);
            auth.setClient(backjson[0].cli_name);
            auth.setType(backjson[0].type);
            auth.setRole(backjson[0].role);
            navigate("/");
          });
      });
  };
  //Fetch to bring the id of user and confirm login user//

  //*********************************************************** //
  ////////////////////SEPARATOR///////////////////////////////////
  //*********************************************************** //
  return (
    <form className="login" onLoad={load}>
      <div className="login-container">
        <Image />
        <Espacio_h10px />
        <Title text="Login" />
        <Espacio_h10px />
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your username"
            className="regular-style"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter your password"
            className="regular-style"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Espacio_h10px />
        <Button variant="outline-secondary" onClick={handleSubmit}>
          Entry
        </Button>
        <Espacio_h10px />
        <Goologin />
        {/*    <Label text="Don´t have an account?" />
        <Label text="Sign Up!" /> */}
      </div>
    </form>
  );
}
