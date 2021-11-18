<template>
<Auth />
<q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                <div v-if="userName == null">
                    MIT-Max Chatting Appication
                </div>
                <div v-else>
                    {{ userName }} Chat
                </div>
            </q-toolbar-title>

            <q-btn flat dense round icon="logout" aria-label="logout" @click="logout" />

        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-list>
            <EssentialLink v-on:userData="getUserData" />
        </q-list>
    </q-drawer>
    <Chat :userId="userId" :userName="userName" />

</q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Auth from 'components/Auth.vue'
import Chat from 'components/Chat.vue'

import {
    defineComponent,
    ref
} from 'vue'
import {
    LocalStorage,
    SessionStorage
} from 'quasar'

export default defineComponent({
    data() {
        return {
            userId: null,
            userName: null
        }
    },
    name: 'MainLayout',

    components: {
        Auth,
        EssentialLink,
        Chat
    },

    mounted() {

        let value = LocalStorage.getItem("MITMATUSER")
        console.log(value)
        // if (value == "null") {
        //     console.log("pl")
        //     window.location.href = "/"
        // }

    },

    setup() {

    },
    methods: {
        logout() {

            const key = "MITMATUSER"

            LocalStorage.set(key, "null")

            window.location.href = "/"
        },
        //get user data
        getUserData: function (userData) {
            console.log(userData)
            this.userName = userData.name
            this.userId = userData.id
            console.log(this.userId)
        }
    },
    setup() {
        const leftDrawerOpen = ref(false)

        return {
            // essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }
    }
})
</script>
