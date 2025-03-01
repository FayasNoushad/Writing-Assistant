import React from "react";
import "./Header.css";
import draft from "../../helpers/draft";

function Header({ userLogin }) {
  return (
    <div className="header">
      <div
        className="branding"
        onClick={() => {
          if (userLogin) {
            window.location.href = "/";
          }
        }}
      >
        Writing Assistant
      </div>
      {userLogin && (
        <div className="header-buttons">
          <button
            type="button"
            className="btn btn-success"
            onClick={async () => await draft.create()}
          >
            New
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
