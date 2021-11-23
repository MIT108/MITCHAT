import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
    baseURL: process.env.chatapp.API_URL,
    headers: {
        Accept: 'application/json'
    }
})

export default boot(({ app }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios
        // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
        //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api
        // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
        //       so you can easily perform requests against your app's API
})

export { axios, api }

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.chatapp.MIX_PUSHER_APP_KEY,
    cluster: process.env.chat.app.MIX_PUSHER_APP_CLUSTER,
    encrypted: true
})