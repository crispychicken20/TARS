// src/components/NavBar.js

import React from "react";
import { Link } from "react-router-dom";


const Navigation = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 30px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: Logo */}
      <div style={{ fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" }}>
        T.A.R.S
      </div>

      {/* Right: About */}
      <div>
        <Link
          to="/about"
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "100px",
            textDecoration: "none",
          }}
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
