import React, { useState, useEffect, useRef } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../auth/useAuth";

export const Goologin = () => {
  const googleid =
    "1058919206979-6maneggfujm0ajlm0dgdkuk074vecjod.apps.googleusercontent.com";

  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const responseGoogle = (response) => {
    const user = response.profileObj.email;
    /* fetch("https://45.33.102.146:5000/entry", { */
    /* fetch("https://34.125.79.13:5000/entry", { */
    fetch("https://server.vrealism.com:5000/entry", {
      method: "POST",
      body: JSON.stringify({
        user,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        auth.setUser(json[0].username);
        auth.setId(json[0].id);
        auth.setClientid(json[0].user_client_id);
        const client = json[0].user_client_id;
        /*  */
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
        /*  */
      });
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleid}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
