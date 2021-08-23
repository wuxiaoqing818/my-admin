import React from "react";
import logo from "@/assets/images/wechat.jpg";
import "./index.less";
import { connect } from "react-redux";
const Logo = (props) => {
  const {avatar} = props
  return (
    <div className="sidebar-logo-container">
      <img src={avatar} className="sidebar-logo" alt="logo" />
      <h1 className="sidebar-title">阿晴</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default connect(mapStateToProps)(Logo);
