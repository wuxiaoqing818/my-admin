/*
 * @Author: 吴晓晴
 * @Date: 2021-06-10 21:50:21
 * @LastEditTime: 2021-06-10 23:22:15
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\router\index.js
 */
import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
import Cookies from 'js-cookie'
import {base64decode} from '../utils/base64Code'
class Router extends React.Component {
  render() {
    const { token, role, getUserInfo } = this.props;
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              if (!token) {
                return <Redirect to="/login" />;
              } else {
                if (role) {
                  return <Layout />;
                } else {
                  getUserInfo({
                    admin: 'admin',
                    editor: 'editor',
                    guest: 'guest'
                  }[base64decode(Cookies.get('Role')||'')]).then(() => <Layout />);
                }
              }
            }}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect((state) => state.user, { getUserInfo })(Router);
