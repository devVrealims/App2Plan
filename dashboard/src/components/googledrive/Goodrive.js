export const Goodrive = () => {
  const { google } = require("googleapis");
  const CLIENT_ID =
    "1058919206979-6maneggfujm0ajlm0dgdkuk074vecjod.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04jzzFMqOBAM7CgYIARAAGAQSNwF-L9Ir3cu6txgm_4XbVHUw15bZ8wzBWn3Wz3sOSAk480xz5MtzJYK6cPva_yl_FzNm5IQmGxk";

  const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({
    version: "v3",
    auth: oauth2client,
  });

  console.log();

  return (
    <div>
      <h1>Goodrive</h1>
    </div>
  );
};
