// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        height: "60px", // Fixed height
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#E0218A", // Indigo color
        color: "white",
        zIndex: 1000, // High z-index to ensure visibility
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link to="/" style={{ color: "black", textDecoration: "none" }}>
        Home
      </Link>
      <Link
        to="/create-post"
        style={{ color: "black", textDecoration: "none" }}
      >
        Create Post
      </Link>
      <Link to="/forum" style={{ color: "black", textDecoration: "none" }}>
        Forum
      </Link>
      <Link to="/newsletter" style={{ color: "black", textDecoration: "none" }}>
        Newsletter
      </Link>
    </nav>
  );
};

export default Navbar;
