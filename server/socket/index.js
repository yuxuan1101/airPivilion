/**
 * Created by yuxuan on 9/13/16.
 */

module.exports = function (io) {
  io.on('connect',function (socket) {
    //设置TCP连接超时时间
    socket.on('login',(info,next) => {
      console.log(info+' login');
    })
  })
}