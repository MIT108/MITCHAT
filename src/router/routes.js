const routes = [{
        path: '/Chat',
        component: () =>
            import ('layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [{
            path: '',
            component: () =>
                import ('pages/Index.vue')
        }]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    },
    // About page

    {
        path: '/About',
        component: () =>
            import ('pages/About.vue')

    },
    {
        path: '/',
        component: () =>
            import ('pages/Auth.vue')
    }
]

export default routes