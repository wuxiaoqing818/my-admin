/*
 * @Author: 吴晓晴
 * @Date: 2021-06-10 21:50:21
 * @LastEditTime: 2021-06-10 23:32:56
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\config\routeMap.js
 */
import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const addArticle = Loadable({loader: () => import(/*webpackChunkName:'addArticle'*/'@/views/articleManage/AddArticle'),loading: Loading});
const articleList = Loadable({loader: () => import(/*webpackChunkName:'articleList'*/'@/views/articleManage/ArticleList'),loading: Loading});
const articleMarket = Loadable({loader: () => import(/*webpackChunkName:'articleMarket'*/'@/views/articleManage/ArticleMarket'),loading: Loading});
const Doc = Loadable({loader: () => import(/*webpackChunkName:'Doc'*/'@/views/doc'),loading: Loading});
const Guide = Loadable({loader: () => import(/*webpackChunkName:'Guide'*/'@/views/guide'),loading: Loading});
const Explanation = Loadable({loader: () => import(/*webpackChunkName:'Explanation'*/'@/views/permission'),loading: Loading});
const AdminPage = Loadable({loader: () => import(/*webpackChunkName:'AdminPage'*/'@/views/permission/adminPage'),loading: Loading});
const GuestPage = Loadable({loader: () => import(/*webpackChunkName:'GuestPage'*/'@/views/permission/guestPage'),loading: Loading});
const EditorPage = Loadable({loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/permission/editorPage'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});
const About = Loadable({loader: () => import(/*webpackChunkName:'About'*/'@/views/about'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin","editor","guest"] },
  { path: "/articleManage/addArticle", component: addArticle, roles: ["admin"] },
  { path: "/articleManage/articleList", component: articleList, roles: ["admin"] },
  { path: "/articleManage/articleMarket", component: articleMarket, roles: ["admin","editor","guest"] },
  { path: "/doc", component: Doc, roles: ["admin","editor","guest"] },
  { path: "/guide", component: Guide, roles: ["admin","editor"] },
  { path: "/permission/explanation", component: Explanation, roles: ["admin"] },
  { path: "/permission/adminPage", component: AdminPage, roles: ["admin"] },
  { path: "/permission/guestPage", component: GuestPage, roles: ["guest"] },
  { path: "/permission/editorPage", component: EditorPage, roles: ["editor"] },
  { path: "/about", component: About, roles: ["admin", "editor", "guest"] },
  { path: "/error/404", component: Error404 },
];
