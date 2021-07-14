import axios from 'axios';
// axios.defaults.baseURL = url 配置默认baseURL
//axios.create 创建axios实例（局部）
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        //如果有接口需要认证，就在这里统一设置

        //直接放行
        return config
    }, err => {
        console.log(err)
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data ? res.data : res;
        // return res;
    }, err => {
        //如果有需要授权才能访问的接口，统一跳转到登录界面

        //如果服务器返回的数据有错误，会在这里处理
        console.log(err)
    })

    return instance(config)
}