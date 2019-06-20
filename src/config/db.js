// const env = process.env.NODE_DEV //环境参数
let MYSQL_CONFIG = {
  host:'localhost',
  user:'root',
  password:'',
  port:'3306',
  database:'myblog'
}

let REDIS_CONFIG = {
  port:6379,
  host:'127.0.0.1'
}



module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}

