const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log(`socket_id: ${socket.id} is connected.`)

  // joinイベントを受け取ったらルームに登録する
  socket.on('join', roomId => {
    socket.join(roomId)
    console.log(`socket_id: ${socket.id} joined in room ${roomId}`)
  })

  // send-msgイベントを受け取ったら指定のルームにブロードキャストする
  socket.on('send-msg', (msg, roomId) => {
    socket.to(roomId).emit('new-msg', msg)
    console.log(`receive message: ${JSON.stringify(msg)}`)
  })
})

server.listen(3001)