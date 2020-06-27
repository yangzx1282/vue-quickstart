/**
 * API文件
 */
// const SERVER_BASE = 'http://127.0.0.1:8999';   // 服务器地址
const SERVER_BASE = '//47.110.125.56:8999';   // 服务器地址
const BASE_API = SERVER_BASE + '/api';   // 服务器地址

const apis = {
  SERVER_BASE: SERVER_BASE,
  LOGIN: "/login",
  LOGOUT: "/logout",
  // USER_REGISTER: "/register",
  
  QUOTE: "https://api.ixiaowai.cn/ylapi/index.php/?code=json",
  HUMBLE_DOG_DIARY: "http://test.isiyuan.net/tiangou/tg.php",
  HUMBLE_DOG_DIARY1: "https://v1.alapi.cn/api/dog?format=text",
  
  USER_API: "/user",
  USER_INFO: "/user/info",
  
  ROLE_API: "/role",
  ROLE_MENU_API: "/role/menu",
  
  MENU_API: "/menu",
  MENU_TREE_API: "/menu/tree",
  
  TASK_API: "/task",
  
  PROP_API: "/prop",
  
  LOG_API: "/log",
  
  TOKEN_QINIU: "/token/qiniu",
  FILE_UPLOAD: "/file/upload",
}

const apisBuild = function() {
  const regx = /^(http)[s]{0,1}(:\/\/)/;
  Object.keys(apis).forEach(key => {
    // console.log(regx.test(apis[key]), key)
    apis[key] = regx.test(apis[key]) ? apis[key] : BASE_API + apis[key];
  })
  console.log(apis)
  return apis;
}

export { SERVER_BASE }

export default apisBuild()
