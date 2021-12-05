import { boot } from 'quasar/wrappers'
import Echo from 'laravel-echo'
window.io = require('socket.io-client')

const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://127.0.0.1:6001',
    auth: {
        headers: {
            /** I'm using access tokens to access  **/
            Authorization: 'Bearer 12|hZlrR9kDTx0PWzKWxzywMo0zKwIWOUQGetwgddhZ'
        }
    }
})

export default boot(({ app }) => {
    app.config.globalProperties.$echo = echo
})
export { echo }