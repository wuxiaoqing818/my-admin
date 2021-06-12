/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "首页",
    path: "/dashboard",
    icon: "home",
    roles: ["admin", "editor", "guest"]
  },
  {
    title: "文章管理",
    path: "/articleManage",
    icon: "lock",
    children: [
      {
        title: "添加文章",
        path: "/articleManage/addArticle",
        roles: ["admin"]
      },
      {
        title: "文章列表",
        path: "/articleManage/articleList",
        roles: ["admin"]
      },
    
    ],
  },
 

  {
    title: "开发文档",
    path: "/doc",
    icon: "file",
    roles: ["admin", "editor", "guest"]
  },
  {
    title: "引导页",
    path: "/guide",
    icon: "key",
    roles: ["admin", "editor"]
  },
  // {
  //   title: "权限测试",
  //   path: "/permission",
  //   icon: "lock",
  //   children: [
  //     {
  //       title: "权限说明",
  //       path: "/permission/explanation",
  //       roles: ["admin"]
  //     },
  //     {
  //       title: "admin页面",
  //       path: "/permission/adminPage",
  //       roles: ["admin"]
  //     },
  //     {
  //       title: "guest页面",
  //       path: "/permission/guestPage",
  //       roles: ["guest"]
  //     },
  //     {
  //       title: "editor页面",
  //       path: "/permission/editorPage",
  //       roles: ["editor"]
  //     },
  //   ],
  // },
  // {
  //   title: "路由嵌套",
  //   path: "/nested",
  //   icon: "cluster",
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "菜单1",
  //       path: "/nested/menu1",
  //       children: [
  //         {
  //           title: "菜单1-1",
  //           path: "/nested/menu1/menu1-1",
  //           roles: ["admin", "editor"],
  //         },
  //         {
  //           title: "菜单1-2",
  //           path: "/nested/menu1/menu1-2",
  //           children: [
  //             {
  //               title: "菜单1-2-1",
  //               path: "/nested/menu1/menu1-2/menu1-2-1",
  //               roles: ["admin", "editor"],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "剪贴板",
  //   path: "/clipboard",
  //   icon: "copy",
  //   roles: ["admin", "editor"]
  // },
  // {
  //   title: "用户管理",
  //   path: "/user",
  //   icon: "usergroup-add",
  //   roles: ["admin"]
  // },
  {
    title: "关于作者",
    path: "/about",
    icon: "user",
    roles: ["admin", "editor", "guest"]
  },
];
export default menuList;
