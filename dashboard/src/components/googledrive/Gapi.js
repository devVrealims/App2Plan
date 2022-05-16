import React from "react";
import { gapi } from "gapi-script";

const Gapi = () => {
  const API_KEY = "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";
  const CLIENT_ID =
    "1058919206979-6maneggfujm0ajlm0dgdkuk074vecjod.apps.googleusercontent.com";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then((res) => {
      console.log(res);
    });
  return <div>Gapi</div>;
};

export default Gapi;
