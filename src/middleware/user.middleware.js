const userService = require("../service/user_service");
const {NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS} = require("../config/error");
const md5password = require('../utils/md5-password')

const verifyUser = async (ctx, next) => {
    // 获取用户传过来的信息
    const user = ctx.request.body

    // 验证客户端传递过来的user是否可以保存到数据库中
    // 验证用户名密码是否为空
    const {name, password} = user
    if (!name || !password) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    // 判断name是否在数据库中已经存在
    const users = await userService.findUserByName(name)
    if (users.length) {
        return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
    }
    await next()
}

const handlePassword = async (ctx, next) => {
    const {password} = ctx.request.body

    ctx.request.body.password = await md5password(password)
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}
