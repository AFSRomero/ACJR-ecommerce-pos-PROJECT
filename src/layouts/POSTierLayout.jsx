import React from "react";
import { Outlet } from "react-router-dom";

const POSTierLayout = () => {
  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>Internal POS Terminal</h2>
      <Outlet />
    </div>
  );
};

export default POSTierLayout;