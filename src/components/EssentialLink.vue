<template>
<div class="" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list>
        <q-item-label header v-on:click="display()">Online</q-item-label>
        <div v-for="user in userList" :key="user.id">
            <q-item v-if="user.status == 1" class="q-mb-sm" clickable v-on:click="sendResultValues(user.id, user.username,  user.email, user.email )" v-ripple>

                <q-item-section avatar>
                    <q-avatar>
                        <img src="/images/defaultUser.png">
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

        <q-separator />
        <q-item-label header>Offline</q-item-label>

        <div v-for="user in userList" :key="user.id">
            <q-item v-if="user.status == 0" class="q-mb-sm" clickable v-on:click="sendResultValues(user.id, user.username,  user.email, user.email )" v-ripple>

                <q-item-section avatar>
                    <q-avatar>
                        <img src="/images/defaultUser.png">
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
    </q-list>
</div>
</template>

<script>
import axios from "axios";
// import defineAsyncComponent from 'quasar'
// const Load = defineAsyncComponent(()=> import('../components/Loading'))

export default {
    data() {
        return {
            userData: {
                id: null,
                email: null,
                name: null,
                image: null,
            },
            userList: null,
        };
    },
    methods: {
        sendResultValues: function (id, name, email, image) {
            this.userData.id = id;
            this.userData.email = email;
            this.userData.name = name;
            this.userData.image = image;
            this.$emit("userData", this.userData);
        },
        display() {
            console.log(this.userList);
        },
    },
    setup() {
      return {

            URL: "https://7a10-154-72-150-96.ngrok.io/api",
      }
    },
    async mounted() {
        await axios
            .get(this.URL+"/list")
            .then(response => {
                this.userList = response.data;
                // this.userList = JSON.stringify(this.userList)
            })
            .catch(error => {
                console.log(error);
                // this.errored = true
            });
    },
};
</script>
