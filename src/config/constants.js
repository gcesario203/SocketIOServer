const EventConstants =
{
    LISTENING : 'listening',
    CONNECTION : 'connect',
    NO_OF_CONNECTIONS : "noOfConnections",
    CREATE_ROOM: 'createRoom',
    DISCONNECT : "disconnect",
    CHAT_MESSAGE :  "chat-message",
    JOIN : "joined",
    LEAVE : "leaved",
    TYPING : "typing",
    STOP_TYPING : "stoptyping",
    PING_SERVER : "ping"
}

const GeneralConstans = {
    BASEURL: "https://tcc-app-api.herokuapp.com",
    STORAGEKEY: 'TCCAPP'
}

const MethodsConstants ={
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}

module.exports = {EventConstants, GeneralConstans, MethodsConstants}