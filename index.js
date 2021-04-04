var io = require('socket.io')(4001,{
    path:'/',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})
const {EventConstants} = require('./src/config/constants.js')


io.httpServer.on(EventConstants.LISTENING, function () {
  console.log('listening on port', io.httpServer.address().port)

  io.on(EventConstants.CONNECTION,socket=>
  {
    socket.on(EventConstants.DISCONNECT, () => {
        io.emit(EventConstants.NO_OF_CONNECTIONS, Object.keys(io.sockets.connected).length)
    })

    socket.on(EventConstants.CHAT_MESSAGE, (msg) => {
        socket.broadcast.emit(EventConstants.CHAT_MESSAGE, msg)
    })
    socket.on(EventConstants.JOIN, (name) => {
        socket.broadcast.emit(EventConstants.JOIN, name)
    })
    socket.on(EventConstants.LEAVE, (name) => {
        socket.broadcast.emit(EventConstants.LEAVE, name)
    })

    socket.on(EventConstants.TYPING, (data) => {
        socket.broadcast.emit(EventConstants.TYPING, data)
    })
    socket.on(EventConstants.STOP_TYPING, () => {
        socket.broadcast.emit(EventConstants.STOP_TYPING)
    })

    socket.on(EventConstants.PING_SERVER, () => {
        console.log('chegou aqui')
    })
  })
})