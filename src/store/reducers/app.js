/*
 * @Author: 吴晓晴
 * @Date: 2021-06-06 17:33:26
 * @LastEditTime: 2021-06-06 19:25:24
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\admin-template\src\store\reducers\app.js
 */
import * as types from "../action-types";
const initState = {
  sidebarCollapsed: false,
  settingPanelVisible: false,
};
export default function app(state = initState, action) {
  switch (action.type) {
    case types.APP_TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case types.APP_TOGGLE_SETTINGPANEL:
      return {
        ...state,
        settingPanelVisible: !state.settingPanelVisible,
      };
    default:
      return state;
  }
}
