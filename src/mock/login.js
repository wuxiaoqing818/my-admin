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
    name: "编辑者",
    avatar: otherAvatar,
    description: "可以看到除户管理页面之外的所有页面",
  },
  "guest": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar: otherAvatar,
    description: "没有操作权限",
  },
};

export default {
  userInfo: (config) => {
    const token = config.body;
    const userInfo = users[token];
    console.log(config)
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
  logout: (_) => {
    return {
      status: 0,
      data: "success",
    };
  },
};
