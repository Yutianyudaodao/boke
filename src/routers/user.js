const { login } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')

const getCookieExpires = () =>{
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*10000));
    return d.toGMTString() //cookie的一种时间格式
}

const handleUserRouter = (req,res) => {
    const method = req.method
    //登陆
    if(method === 'GET' && req.path === '/api/user/login'){
        const { username, password} = req.query
        const result = login(username,password)
        return result.then(data=>{
            if(data.username){
                console.log(111)
                //操作cookie
                res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly；expires=${getCookieExpires()}`)
                //httpOnly 只允许后端修改cookie
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    //登录验证
    if(method === 'GET' && req.path === '/api/user/login-test'){
        if(req.cookie.username){
            return Promise.resolve(
                new SuccessModel(
                    username.req.cookie.username
                )
            ) 
        }
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

module.exports = handleUserRouter