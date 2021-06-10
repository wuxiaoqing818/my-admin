import React from "react";
import logo from "@/assets/images/wechat.jpg";
import "./index.less";
const Logo = () => {
  return (
    <div className="sidebar-logo-container">
      <img src={logo} className="sidebar-logo" alt="logo" />
      <h1 className="sidebar-title">阿晴</h1>
    </div>
  );
};

export default Logo;
