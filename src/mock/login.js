import adminAvatar from "../assets/images/wechat.jpg"
import otherAvatar from "../assets/images/reward.jpg"

const users = {
  "admin": {
    id: "admin",
    role: "admin",
    name: "阿晴",
    avatar: adminAvatar,
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar: otherAvatar,
    description: "可以看到除户管理页面之外的所有页面",
  },
  "guest": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar: otherAvatar,
    description: "仅能看到Dashboard、开发文档、权限测试和关于作者四个页面",
  },
};

export default {
  userInfo: (config) => {
    const token = config.body;
    const userInfo = users[token];
    if (!userInfo) {
      return {
        status: 1,
        message: "获取用户信息失败",
      };
    }
    return {
      status: 0,
      userInfo,
    };
  },
  getUsers: () => {
    return {
      status: 0,
      users: Object.values(users),
    };
  },
  logout: (_) => {
    return {
      status: 0,
      data: "success",
    };
  },
};
