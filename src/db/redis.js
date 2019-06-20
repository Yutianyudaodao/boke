const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");

const redisClient = redis.createClient(REDIS_CONFIG.port,REDIS_CONFIG.redisClient.on('error',err=>{
  console.error(err)
}))
