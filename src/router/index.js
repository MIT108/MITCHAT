import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes';
import { GET_USER_TOKEN_GETTER } from 'src/store/storeConstants';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function({ store }) {
    const createHistory = process.env.SERVER ?
        createMemoryHistory :
        (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
    });


    Router.beforeEach((to, from, next) => {
        if ('auth' in to.meta && to.meta.auth && !store.getters[`auth/${GET_USER_TOKEN_GETTER}`]) {
            next('/')
        } else if ('auth' in to.meta && !to.meta.auth && store.getters[`auth/${GET_USER_TOKEN_GETTER}`]) {
            next('/Chat')
        } else {
            next()
        }
    })

    return Router
})