import { boot } from 'quasar/wrappers'
import Echo from 'laravel-echo'
import { GET_USER_TOKEN_GETTER } from 'src/store/storeConstants';
import store from 'src/store/module-auth'
// window.io = require('socket.io-client')

// import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
const echo = new Echo({
    broadcaster: 'pusher',
    key: "cce61bed1cd09ff5e1a3",
    cluster: "eu",
    forceTLS: true,
    authEndpoint: "https://laravel-vue-chat-api.herokuapp.com/api/broadcasting/auth"
});
console.log(echo);
export default boot(({ app, store }) => {
    app.config.globalProperties.$echo = echo
})
export { echo }