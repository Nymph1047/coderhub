const KoaRouter = require('@koa/router')
const UserController = require('../controller/user.controller')
const {verifyUser, handlePassword} = require("../middleware/user.middleware");

const userRouter = new KoaRouter({prefix: '/users'})

// 用户注册接口
userRouter.post('/', verifyUser, handlePassword, UserController.create)


module.exports = userRouter
