import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='/api'; //填写域名

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json'
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
            console.log('错误请求')
          break;
        case 401:
            console.log('未授权，请重新登录')
          break;
        case 403:
          console.log('拒绝访问')
          break;
        case 404:
          console.log('请求错误,未找到该资源')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${err.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
    }
    return Promise.resolve(err.response)
})

const api = {
  exam(paramObj){
      return post('/api.php?ac=v2_djList',paramObj);
  },
  // 验证码
  getImageCoude(paramObj){
      return post('/userManage/GetImageCode',paramObj);
  },
  // 登陆
  login(paramObj){
      return post('/userManage/login',paramObj);
  },
  // 根据账号获取用户邮箱/userManage/getUserEmail
  getUserEmail(paramObj){
    return post('/userManage/getUserEmail',paramObj);
},
  // 发送邮箱验证码
  sendEmailCode(paramObj){
      return post('/userManage/sendEmailCode',paramObj);
  },
  // 邮箱验证码验证
  verifyEmailCode(paramObj){
      return post('/userManage/verifyEmailCode',paramObj);
  },
  // 修改密码
  updatePwd(paramObj){
      return post('/userManage/updatePwd',paramObj);
  },
  // 修改密码
  updateoldPwd(paramObj){
      return post('/userManage/updatePwdByOldPwd',paramObj);
  },
  // 获取用户列表
  getUserList(paramObj){
      return post('/userManage/getUserList',paramObj);
  },
  // 编辑用户
  updateUser(paramObj){
      return post('/userManage/updateUser',paramObj);
  },
  // 获取所有部门
  getOrgList(paramObj){
      return post('/userManage/getOrgList',paramObj);
  },
  // 获取部门下科室
  getSubOrgListbyOrgGUID(paramObj){
      return post('/userManage/getSubOrgListbyOrgGUID',paramObj);
  },
  // 获取部门下用户
  getusersbyOrgid(paramObj){
      return post('/userManage/getusersbyOrgid',paramObj);
  },
  // 获取功能列表
  getFunctionsList(paramObj){
      return post('/dicManage/getFunctionsList',paramObj);
  },
  // 获取功能列表
  getFunctionsListRole(paramObj){
      return post('/dicManage/getFunctionsListRole',paramObj);
  },
  // 获取角色列表（下拉）
  getRoleList(paramObj){
      return post('/roleManage/getRoleList',paramObj);
  },
  // 获取角色列表
  getRoleListByPage(paramObj){
      return post('/roleManage/getRoleListByPage',paramObj);
  },
  // 编辑角色
  updateRole(paramObj){
      return post('/roleManage/updateRole',paramObj);
  },
  // 编辑角色
  deleteRole(paramObj){
      return post('/roleManage/deleteRole',paramObj);
  },
  // 新建角色
  createRole(paramObj){
      return post('/roleManage/createRole',paramObj);
  },
  // 角色添加用户
  setRoleUsers(paramObj){
      return post('/roleManage/setRoleUsers',paramObj);
  },
  // 角色添加功能权限
  setRoleFunction(paramObj){
      return post('/roleManage/setRoleFunction',paramObj);
  },
  // 查看角色权限
  getRoleFunction(paramObj){
      return post('/roleManage/getRoleFunction',paramObj);
  },
  // 日志管理
  getLogList(paramObj){
      return post('/systemManage/getLogList',paramObj);
  },
  // 日志管理详情
  getLog(paramObj){
      return post('/systemManage/getLog',paramObj);
  },
  // 获取新闻列表
  getNewsList(paramObj){
      return post('/newsManage/getNewsList',paramObj);
  },
  // 修改新闻
  updateNews(paramObj){
      return post('/newsManage/updateNews',paramObj);
  },
  // 删除新闻
  deleteNews(paramObj){
      return post('/newsManage/deleteNews',paramObj);
  },
  // 获取公告列表
  newsgetNoticeList(paramObj){
      return post('/newsManage/getNoticeList',paramObj);
  },
  // 修改公告
  updateNotice(paramObj){
      return post('/newsManage/updateNotice',paramObj);
  },
  // 删除公告
  deleteNotice(paramObj){
      return post('/newsManage/deleteNotice',paramObj);
  },
  // 获取所有分类
  getNoticeList(paramObj){
      return post('/dicManage/getNoticeList',paramObj);
  },
  // 获取新闻公告文档分类
  getSubSorts(paramObj){
      return post('/dicManage/getSubSorts',paramObj);
  },
  // 新建分类
  createlineNews(paramObj){
      return post('/newsManage/createlineNews',paramObj);
  },
  // 获取文档列表
  getDocumentList(paramObj){
      return post('/docmentManage/getDocumentList',paramObj);
  },
  // 修改文档
  updateDocumentList(paramObj){
      return post('/docmentManage/updateDocument',paramObj);
  },
  // 文件下载权限
  downloadFile(paramObj){
      return post('/docmentManage/downloadFile',paramObj);
  },
  // 删除文档
  deleteDocument(paramObj){
      return post(' /docmentManage/deleteDocument',paramObj);
  },
  // 栏目新闻
  headlineNews(paramObj){
      return post('/newsManage/headlineNews',paramObj);
  },
  // 栏目新闻获取详情
  getNewsByID(paramObj){
      return post('/newsManage/getNewsByID',paramObj);
  },
  // 栏目新闻编辑
  updatelineNews(paramObj){
      return post('/newsManage/updatelineNews',paramObj);
  },
  // 删除栏目分类
  deletelineNews(paramObj){
      return post('/newsManage/deletelineNews',paramObj);
  },
  // 获取所有科室（下拉列表）
  getSubOrgList(paramObj){
      return post('/userManage/getSubOrgList',paramObj);
  },
  
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

/**
* 下面是获取数据的接口
*/
/** 
* 测试接口
* 名称：exam
* 参数：paramObj/null
* 方式：fetch/post/patch/put
*/
export default api