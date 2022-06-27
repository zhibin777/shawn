// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

axios.defaults.baseURL='http://ajax-api.itheima.net'
// axios的请求拦截器(一个函数)
// 作用:对本次请求做一些前置处理
// 作用:可以统一携带一些参数(例如请求头+token)
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response) {
  
  return response.data
}, function(error) {
  console.dir(error)
  if (error.response.status === 401) {
    // 被动退出登录
    localStorage.clear()
    location.href = './login.html'
  }
  return Promise.reject(error)
})
