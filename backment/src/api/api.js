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
    // console.log(config);
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
  // 发送邮箱验证码
  sendEmailCode(paramObj){
      return post('/userManage/sendEmailCode',paramObj);
      // obj = {
      //   umail:'984057903@qq.com'
      // }
  },
  // 邮箱验证码验证
  verifyEmailCode(paramObj){
      return post('/userManage/verifyEmailCode',paramObj);
      // obj = {
      //   inputcode:'688960', 
      //   umail:'984057903@qq.com'
      // }
  },
  // 修改密码
  updatePwd(paramObj){
      return post('/userManage/updatePwd',paramObj);
      // obj = {
      //   "uid":"12594267",
      //   "upwd":"12345678",
      //   "confirmpwd":"12345678",
      // }
  },
  // 获取用户列表
  getUserList(paramObj){
      return post('/userManage/getUserList',paramObj);
      
  },
  // 编辑用户
  updateUser(paramObj){
      return post('/userManage/updateUser',paramObj);
      obj = {
        "uid":13000476,
        "orgguid":1,
        uname:'',
        ucode:'',
        umail:'',
        lastUpdate:'',
        utelno:'',
        isvalid:'',
        }
  },
  // 获取所有部门
  getOrgList(paramObj){
      return post('/userManage/getOrgList',paramObj);
  },
  // 获取部门下科室
  getSubOrgListbyOrgGUID(paramObj){
      return post('/userManage/getSubOrgListbyOrgGUID',paramObj);
      obj = {
        orgparentguid:'',
        }
  },
  // 获取功能列表
  getFunctionsList(paramObj){
      return post('/dicManage/getFunctionsList',paramObj);
  },
  // 获取角色列表（下拉）
  getRoleList(paramObj){
      return post('/roleManage/getRoleList',paramObj);
  },
  // 获取角色列表（下拉）
  getRoleListByPage(paramObj){
      return post('/roleManage/getRoleListByPage',paramObj);
  },
  // 编辑角色
  updateRole(paramObj){
      return post('/roleManage/updateRole',paramObj);
  },
  // 角色添加用户
  setRoleUsers(paramObj){
      return post('/roleManage/setRoleUsers',paramObj);
  },
  // 日志管理
  getLogList(paramObj){
      return post('/systemManage/getLogList',paramObj);
  },
  // 获取新闻列表
  getNewsList(paramObj){
      return post('/newManage/getNewsList',paramObj);
  },
  // 修改新闻
  updateNews(paramObj){
      return post('/newManage/updateNews',paramObj);
  },
  // 获取公告列表
  getNoticeList(paramObj){
      return post('/newManage/getNoticeList',paramObj);
  },
  // 修改公告
  updateNotice(paramObj){
      return post('/newManage/updateNotice',paramObj);
  },
  // 获取文档列表
  getDocumentList(paramObj){
      return post('/docmentManage/getDocumentList',paramObj);
  },
  // 修改文档
  updateDocumentList(paramObj){
      return post('/docmentManage/updateDocumentList',paramObj);
  },
  // 栏目新闻
  headlineNews(paramObj){
      return post('/newManage/headlineNews',paramObj);
  },
  // 栏目新闻编辑
  updatelineNews(paramObj){
      return post('/newManage/updatelineNews',paramObj);
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