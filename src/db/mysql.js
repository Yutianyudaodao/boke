const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db.js')

const connect = mysql.createConnection(MYSQL_CONFIG)
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