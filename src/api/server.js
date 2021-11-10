const Axios = require('axios').default
const { GeneralConstans } = require('../config/constants.js')

const ServerCalls = {
    async SendMessageUnauth(pMethod, pRoute, pData = null) {

        try {
            var lResponse = await Axios({
                method: pMethod,
                url: `${GeneralConstans.BASEURL}${pRoute}`,
                data: pData
            })

            return lResponse
        } catch (error) {
             console.log(error.response.data.error)
        }
    },
}

module.exports = { ServerCalls }