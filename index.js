var io = require('socket.io')(4001, {
    path: '/',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const { EventConstants } = require('./src/config/constants.js')


io.httpServer.on(EventConstants.LISTENING, function () {
    console.log('listening on port', io.httpServer.address().port)

    io.on(EventConstants.CONNECTION, socket => {
        console.log('id do socket ==> ', socket.id)
        socket.on(EventConstants.CHAT_MESSAGE, (msg) => {
            socket.broadcast.emit(EventConstants.CHAT_MESSAGE, msg)
        })

        socket.on(EventConstants.DISCONNECT, teste =>
            {
                console.log('kk sai')
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

        socket.on(EventConstants.PING_SERVER, (data) => {
            console.log('ping ',data)
        })
    })
})