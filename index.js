var io = require('socket.io')(4001, {
    path: '/',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const { EventConstants } = require('./src/config/constants.js')



io.on(EventConstants.CONNECTION, socket => {
    socket.join('test room')

    socket.on(EventConstants.CHAT_MESSAGE, (msg) => {
        socket.broadcast.to('test room').emit(EventConstants.CHAT_MESSAGE, msg)
    })

    socket.on(EventConstants.DISCONNECT, () => {
        if(typeof io.sockets.adapter.rooms.get('test room') !== 'undefined')
        {
            const connections = [...io.sockets.adapter.rooms.get('test room')]
            console.log('disconnect',connections)
            socket.to('test room').emit(EventConstants.LEAVE, connections)
        }
        else
        {
            socket.to('test room').emit(EventConstants.LEAVE, [])
        }
        
    })

    socket.on(EventConstants.CREATE_ROOM, () => {
        const roomsList = [...socket.rooms]

        const roomId = roomsList.find(value => value.toString() === socket.id)
        socket.emit(EventConstants.CREATE_ROOM, roomId)
    })

    socket.on(EventConstants.JOIN, () => {
        const connections = [...io.sockets.adapter.rooms.get('test room')]
        console.log('connect',connections)
        socket.to('test room').emit(EventConstants.JOIN, connections)
    })

    socket.on(EventConstants.TYPING, (data) => {
        socket.broadcast.to('test room').emit(EventConstants.TYPING, data)
    })
    socket.on(EventConstants.STOP_TYPING, () => {
        socket.broadcast.to('test room').emit(EventConstants.STOP_TYPING)
    })

    socket.on(EventConstants.PING_SERVER, (data) => {
        console.log('ping ', data)
    })
})
