var
  path = require('path'),
  beRoot = path.resolve(__dirname, '..');

module.exports = {
    // cookie-session
    cs: { 
      name: 'Lol',
      keys: ["Lol"]
    },
    // 数据库配置
    db: { 
      uri: 'mongodb://localhost:27017/server',
      opts: {
        user: '',
        pass: ''
      }
    },
    //启动端口
    port: 3002
  };