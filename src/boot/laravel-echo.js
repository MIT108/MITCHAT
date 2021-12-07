import { boot } from 'quasar/wrappers'
import Echo from 'laravel-echo'
// window.io = require('socket.io-client')

// import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
const echo = new Echo({
    broadcaster: 'pusher',
    key: "cce61bed1cd09ff5e1a3",
    cluster: "eu",
    forceTLS: true
});
console.log(echo);
export default boot(({ app }) => {
    app.config.globalProperties.$echo = echo
})
export { echo }