import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import auth from './module-auth/index'
import { LOADING_SPINNER_SHOW_MUTATION } from './storeConstants'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function( /* { ssrContext } */ ) {
    const Store = createStore({
        modules: {
            auth
        },
        state: {
            showLoading: false,
        },
        mutations: {
            [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
                state.showLoading = payload;
            }
        },

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env.DEBUGGING
    })

    return Store
})