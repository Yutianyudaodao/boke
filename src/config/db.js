const env = process.env.NODE_DEV //环境参数
let MYSQL_CONFIG;
let REDIS_CONFIG;

if(env === 'env'){
  MYSQL_CONFIG = {
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'myblog'
  }
  REDIS_CONFIG = {
    port:6379,
    host:'127.0.0.1'
  }
}else if(env === 'production'){
  MYSQL_CONFIG = {
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'myblog'
  }
  REDIS_CONFIG = {
    port:6379,
    host:'127.0.0.1'
  }
}



module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}

