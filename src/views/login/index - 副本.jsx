import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import ParticlePage from '@components/Particle'
import Cookies from 'js-cookie'
import { base64decode } from '../../utils/base64Code'


const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  // const copyMethods = ()=>{
  //   var text = '被复制的内容，啦啦啦~';
  //   if (navigator.clipboard) {
  //       // clipboard api 复制
  //       navigator.clipboard.writeText(text);
  //   } else {
  //       var textarea = document.createElement('textarea');
  //       document.body.appendChild(textarea);
  //       // 隐藏此输入框
  //       textarea.style.position = 'fixed';
  //       textarea.style.clip = 'rect(0 0 0 0)';
  //       textarea.style.top = '10px';
  //       // 赋值
  //       textarea.value = text;
  //       // 选中
  //       textarea.select();
  //       // 复制
  //       document.execCommand('copy', true);
  //       // 移除输入框
  //       document.body.removeChild(textarea);
  //   }
  // }

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("登录成功");
        handleUserInfo()
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        message.error('登录失败');
      });
  };

  // 获取用户信息
  const handleUserInfo = () => {
    // console.log(username)
    const role = base64decode(Cookies.get('Role'))
    getUserInfo(role)
      .then((data) => {
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
        // copyMethods()

      }
    });
  };

  const zxcvbnPassword = (e) => {
    const intension = document.querySelector('meter');
    intension.value = window.zxcvbn(e.target.value).guesses_log10;

  }

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"用户登录"}>
      <div className="login-container">
        <ParticlePage />
        {/* 使用video制作背景图 */}
        {/* <video muted autoplay="autoplay" loop="loop" className="video-bg">
          <source src=""></source>
        </video> */}
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>用户登录</h2>
          </div>
          <Spin spinning={loading} tip="登录中...">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名",
                  },
                ],
                initialValue: "", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入密码",
                  },
                ],
                initialValue: "", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                  onChange={(e) => zxcvbnPassword(e)}
                />
              )}
              <meter min="0" max="12" low="4" high="8" optimum="10" />
            </Form.Item>

            <Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
            {/* <Form.Item>
              <span>账号 : admin 密码 : 随便填</span>
              <br />
              <span>账号 : editor 密码 : 随便填</span>
              <br />
              <span>账号 : guest 密码 : 随便填</span>
            </Form.Item> */}
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
