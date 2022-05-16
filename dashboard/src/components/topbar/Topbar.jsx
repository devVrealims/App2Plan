import React from "react";
import useAuth from "../../auth/useAuth";
import { Link } from "react-router-dom";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  const auth = useAuth();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          {/* <span className="logo">VRealism</span> */}
          <Link to="/">
            <img src="/img/VRealism_final-01.png" />
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            {auth.user ? <NotificationsNone /> : null}
            {auth.user ? <span className="topIconBadge">8</span> : null}
          </div>
          <div className="topbarIconContainer">
            {auth.user ? <Settings /> : null}
          </div>
          <div className="topbarIconContainer">
            {auth.user ? auth.user : null}
          </div>
          {auth.user ? (
            <button
              className="btn btn-outline-secondary"
              style={{ height: "40px" }}
              onClick={() => auth.setUser(null)}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
