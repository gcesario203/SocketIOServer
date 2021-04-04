const app = require('express')();
const http = require('http').Server(app);
const { EventConstants } = require('./src/config/constants.js')
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Conectado com sucesso</h1>')
})

io.on(EventConstants.CONNECTION, (socket) => {
    io.emit(EventConstants.NO_OF_CONNECTIONS, Object.keys(io.sockets.connected).length)


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

    socket.on(EventConstants.PING_SERVER,()=> {
        console.log('chegou aqui')
    })


})

http.listen(3000, () => {
    console.log('Server is started at http://localhost:3000')
})
