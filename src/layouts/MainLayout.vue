<template>
<Auth />
<q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                <div v-if="userName == null">MIT-Max Chatting Application</div>
                <div v-else>
                    {{ userName }} <small><i>is typing</i></small>
                </div>
            </q-toolbar-title>
            <q-btn flat dense round icon="logout" aria-label="logout" @click="logout" />
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-list>
            <EssentialLink v-on:userData="getUserData" :newMessage="newMessage" />
        </q-list>
    </q-drawer>
    <Chat v-on:newMessage="getNewMessage" :userId="userId" :userImage="userImage" :userEmail="userEmail" :userName="userName" :index="index" />
</q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import Auth from "components/Auth.vue";
import Chat from "components/Chat.vue";
import {
    USER_DATA_GETTER
} from "../store/storeConstants";

import {
    defineComponent,
    ref
} from "vue";
import {
    mapActions
} from "vuex";
import {
    LOGOUT_ACTION,
    GET_USER_TOKEN_GETTER
} from "src/store/storeConstants";

export default defineComponent({
    data() {
        return {
            userId: null,
            userName: null,
            userEmail: null,
            userImage: null,
            index: null,
            user: [],
            newMessage: null,
        };
    },
    name: "MainLayout",

    components: {
        Auth,
        EssentialLink,
        Chat,
    },
    created() {

    },
    mounted() {
        console.log(this.userName);

        //getting user data
        // this.user = this.$store.getters[`auth/${USER_DATA_GETTER}`]
        // const token = this.$store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        // this.$echo.connector.pusher.config.auth.headers['Authorization'] = `Bearer ${token}`;console.log(this.user[0]);
        // console.log(this.user);
        // this.$echo.private('messages.'+this.user[0]).listen('NewMessage', (payload) => {
        //       console.log(payload);
        //    })
    },

    setup() {},
    methods: {
        ...mapActions("auth", {
            signOut: LOGOUT_ACTION,
        }),
        logout() {
            this.signOut;
        },
        //get user data
        getUserData: function (userData) {
            console.log(userData);
            this.userName = userData.name;
            this.index = userData.index;
            this.userId = userData.id;
            this.userEmail = userData.email;
            this.userImage = userData.image;
            console.log(this.userId);
        },
        getNewMessage: function (newMessage) {
            this.newMessage = newMessage
        }
    },
    setup() {
        const leftDrawerOpen = ref(false);

        return {
            // essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
});
</script>
