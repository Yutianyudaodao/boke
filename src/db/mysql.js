const mysql = reuqire('mysql')
const { MYSQL_CONFIG } = reuqire('../config/db.js')

const connect = mysql.creatConnection(MYSQL_CONFIG)
connect.connect()

//执行sql
function exec(sql){
    const promise = new Promise((resolve,reject)=>{
        connect.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
    
}

module.exports = {
    exec
}