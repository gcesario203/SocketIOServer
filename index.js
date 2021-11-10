var io = require('socket.io')(process.env.PORT || 4001, {
    path: '/',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const { EventConstants } = require('./src/config/constants.js')
const { Utility } = require('./src/utils/utils.js')

const rooms = {}

io.on(EventConstants.CONNECTION, socket => {

    socket.on(EventConstants.CHAT_MESSAGE, async (obj) => {

        await Utility.saveMessage(obj.roomId, socket.id, obj.msg, rooms)

        let lReturnObject = Utility.getUserMemberBySocket(rooms, socket.id)

        socket.broadcast.to(obj.roomName).emit(EventConstants.CHAT_MESSAGE, { message:obj.msg, userName: lReturnObject.name, broadcasted: true})
    })

    socket.on(EventConstants.DISCONNECT, () => {

        let lReturnObject = Utility.getUserMemberBySocket(rooms, socket.id)
        
        socket.to(lReturnObject.roomName).emit(EventConstants.LEAVE, socket.id)
    })

    socket.on(EventConstants.JOIN, (roomData) => {
        socket.join(roomData.roomName)

        Utility.buildRoomObjectOnJoin(rooms, roomData, socket.id)
        // console.log(socket.users.length)
        socket.nsp.to(roomData.roomName).emit(EventConstants.JOIN, rooms[roomData.roomName].users)
    })

    socket.on(EventConstants.TYPING, (roomName, data) => {
        socket.broadcast.to(roomName).emit(EventConstants.TYPING, data)
    })
    socket.on(EventConstants.STOP_TYPING, (roomName) => {
        socket.broadcast.to(roomName).emit(EventConstants.STOP_TYPING)
    })
})
