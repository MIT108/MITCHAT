<template>
<div class="" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list v-if="userListLoading">
        <q-item-label header>Recent contacts</q-item-label>

        <div v-for="(user, index) in userList" :key="index">
            <q-separator />
            <div v-if="index == active" style="background-color: rgba(0, 0, 0, 0.158);">
                <q-item class="q-mb-sm" clickable v-on:click="
            sendResultValues(index, user.id, user.username, user.email, user.email)
          " v-ripple>
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="/images/defaultUser.png" />
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ user.username }}</q-item-label>
                        <q-item-label caption lines="1">{{ user.email }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-icon name="chat_bubble" color="grey" />
                    </q-item-section>
                </q-item>
            </div>
            <div v-if="index != active">
                <q-item class="q-mb-sm" clickable v-on:click="
            sendResultValues(index, user.id, user.username, user.email, user.email)
          " v-ripple>
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="/images/defaultUser.png" />
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ user.username }}</q-item-label>
                        <q-item-label caption lines="1">{{ user.email }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-icon name="chat_bubble" color="grey" />
                    </q-item-section>
                </q-item>
            </div>
        </div>
        <q-separator />

    </q-list>

    <div v-else>
        <center>
            <h6>Searching for users</h6>
            <spinner />
        </center>
    </div>
</div>
</template>

<script>
import spinner from "../components/Spinner.vue";
import axios from "axios";
import {
    useQuasar
} from "quasar";

// import defineAsyncComponent from 'quasar'
// const Load = defineAsyncComponent(()=> import('../components/Loading'))

export default {
    watch: {
        newMessage: function () {
            this.userList[this.newMessage[0]].email = "me: " + this.newMessage[1]
            this.userList.unshift(this.userList[this.newMessage[0]])
            this.userList.splice(this.newMessage[0] + 1, 1)

          this.active = 0
        }
    },
    props: {
        newMessage: [],
    },
    components: {
        spinner,
    },
    computed: {
        api_url() {
            return process.env.chatapp.API_URL;
        },
    },
    data() {
        return {
            userData: {
                index: null,
                id: null,
                email: null,
                name: null,
                image: null,
            },
            userList: null,
            active: null,
            userListLoading: false,
        };
    },
    methods: {
        sendResultValues: function (index, id, name, email, image) {
            console.log(index);
            this.userData.index = index;
            this.userData.id = id;
            this.userData.email = email;
            this.userData.name = name;
            this.userData.image = image;
            this.active = index

            this.$emit("userData", this.userData);
        },
        display() {
            console.log(this.userList);
        },
    },
    setup() {},
    async mounted() {
        const $q = useQuasar();
        // Echo.private(`messages${1}`)
        // .listen()

        await axios
            .get(process.env.chatapp.API_URL + "list")
            .then((response) => {
                $q.loading.hide();
                this.userList = response.data;
                console.log(response.data);
                // this.userList = JSON.stringify(this.userList)
                this.userListLoading = true;
            })
            .catch((error) => {
                console.log(error);
                // this.errored = true
            });
    },
};
</script>
