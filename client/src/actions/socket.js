/**
 * Created by yuxuan on 9/13/16.
 */
import io from 'socket.io-client'

const socket = io('http://' + location.hostname + ':3000')
function createInterface (method) {
  return function (path, data, cb) {
    this.emit('message', { method: method, path: path, data: data }, cb)
  }
}
function socketWrap (socket) {
  socket.get = createInterface('GET')
  socket.post = createInterface('POST')
  socket.put = createInterface('PUT')
  socket.delete = createInterface('DELETE')
  return socket
}
export default socketWrap(socket)
