const crypto = require('crypto')

function md5password(password) {
    const md5 = crypto.createHash('md5')

    const md5password = md5.update(password).digest('hex')

    return md5password
}

module.exports = md5password
