const querystring = require('querystring')
const handleBlogRouter = require('./src/routers/blog')
const handleUserRouter = require('./src/routers/user')


const getCookieExpires = () =>{
  const d = new Date();
  d.setTime(d.getTime() + (24*60*60*10000));
  return d.toGMTString() //cookie的一种时间格式
}
const SESSION_DATA = {};
const getPostData = (req) => {
    const promise = new Promise((resolve,reject)=>{
        if(req.method != 'POST') {
            resolve({})
            return 
        }
        if(req.headers['content-type'] != 'application/json') {
            resolve({})
            return 
        }

        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHeader = (req,res) =>{
    console.log('ok')
    //设置返回json格式
    res.setHeader('Content-type', 'application/json')
    //获取path
    const url = req.url
    req.path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])
    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item){
            return 
        }
        const arr = item.split('=')
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val
    });
    let needSetCookie = false;
    let userId = req.cookie.userId;
    if(userId){
      if(!SESSION_DATA[userId]){
        SESSION_DATA[userId] = {}
      }
    }else{
      needSetCookie = true;
      userId = `${Date.now()}_${Math.random()}`;
      SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    //处理post data
    getPostData(req).then(postData=>{
        req.body = postData
        //处理blog路由
        const blogResult = handleBlogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData=>{
              if(needSetCookie){
                res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                //httpOnly 只允许后端修改cookie
              }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        //处理user路由
        const userData = handleUserRouter(req,res)
        if(userData){
            userData.then(userData=>{
              if(needSetCookie){
                res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
              }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        //404
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 NOT FOUND")
        res.end
    })

    
}
module.exports = serverHeader



