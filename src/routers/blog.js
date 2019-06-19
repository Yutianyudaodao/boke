const {getlist,getDetail,newBlog,updataBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res) => {
    const method = req.method //GET POST
    const id = req.query.id

    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getlist(author,keyword)
        const result = getlist(author,keyword)
        return result.then(listData=>{
            return new SuccessModel(listData) 
        })
    }

    //获取博客详情
    if(method === 'POST' && req.path === '/api/blog/detail'){
        const result = getDetail(id)
        if(result){
            return result.then(data => {
                return new SuccessModel(data)
            })
        }
    }

    //新建博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        req.body.author = 'daodao'
        const result = newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }

    //更新博客
    if(method === 'POST' && req.path === '/api/blog/update'){
        const result = updataBlog(id,req.body)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('更新失败')
            }
        })
    }

    //删除博客
    if(method === 'POST' && req.path === '/api/blog/del'){
        const author='lisi'
        const result = delBlog(id,author)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('删除失败')
            }
        })
    }
}

module.exports = handleBlogRouter