const { ServerCalls } = require('../api/server.js')
const { GeneralConstans, MethodsConstants } = require('../config/constants')

const Utility = 
{
    getUserMemberBySocket: (pRooms, pSocketId) =>{

        let lReturnObject = {}
        for(let lKey in pRooms)
        {
            for(let lKey2 in pRooms[lKey])
            {
                if(lKey2 === 'users')
                {
                    if(pRooms[lKey][lKey2].filter(x => x.socketId === pSocketId).length > 0)
                    {
                        lReturnObject = pRooms[lKey][lKey2].find(x => x.socketId === pSocketId)
                    }
                }
            }
        }

        return lReturnObject
    },

    buildRoomObjectOnJoin: (pRooms, pClientData, pSocketId) =>{
        if (!pRooms[pClientData.roomName]) {
            pRooms[pClientData.roomName] = {}
        }

        if (!pRooms[pClientData.roomName].users) {
            pRooms[pClientData.roomName].users = []
        }

        if (pRooms[pClientData.roomName].users.filter(x => x.id === pClientData.userData.id).length > 0) {
            let lObj = pRooms[pClientData.roomName].users.find(x => x.id === pClientData.userData.id)

            lObj.socketId = pSocketId

            const lCache = pRooms[pClientData.roomName].users
                .filter(x => x.id !== pClientData.userData.id)


            pRooms[pClientData.roomName].users = [...lCache, lObj]

        }
        else {
            let lNewObj = {}

            lNewObj.id = pClientData.userData.id
            lNewObj.email = pClientData.userData.email
            lNewObj.name = pClientData.userData.nome
            lNewObj.socketId = pSocketId
            lNewObj.roomName = pClientData.roomName


            pRooms[pClientData.roomName].users.push(lNewObj)
        }
    },

    async saveMessage(pRoomId, pSocketId, pMsgContent, pRooms)
    {
        let lData ={}

        lData.salaId = pRoomId;
        lData.mensagens = []

        const lUser = this.getUserMemberBySocket(pRooms, pSocketId)

        let lContent = {}
        lContent.usuarioId = lUser.id
        lContent.conteudo = pMsgContent
    
        lData.mensagens.push(lContent)
        await ServerCalls.SendMessageUnauth(
            MethodsConstants.POST,
            `/messages`,
            lData
        )
    }
}

module.exports = { Utility }