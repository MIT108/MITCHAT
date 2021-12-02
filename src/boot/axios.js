import { boot } from 'quasar/wrappers'
import axios from 'axios';
import { GET_USER_TOKEN_GETTER } from 'src/store/storeConstants';
import store from 'src/store/index'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
    baseURL: '127.0.0.1:8000/api/v1/',
    headers: {
        Accept: 'application/json'
    }
})

export default boot(({ app, store }) => {
    api.interceptors.request.use((config) => {
        const token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
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
    key: "cce61bed1cd09ff5e1a3",
    cluster: "eu",
    encrypted: true
})