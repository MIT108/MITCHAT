<template>
<div class="" style="max-width: 350px">

    <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list v-if="userListLoading">
        <q-item-label header>Recent contacts</q-item-label>

        <div v-for="(user, index) in userList" :key="index">
            <div>
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
    </q-list>
    <!--<div v-if="true">
        <center>
            <span style="color: black; background-color: rgba(128, 128, 128, 0.719);padding: 6px;cursor:pointer;  border-radius: 20px;">
                show more
            </span>
        </center>
    </div>-->

    <div v-if="!userListLoading">
        <center>
            <h6>Searching for users</h6>
            <spinner />
        </center>
    </div>

</div>
</template>

<script>
import spinner from "../components/Spinner.vue";
import {
    useQuasar
} from "quasar";

import {
    ref
} from 'vue'
// import defineAsyncComponent from 'quasar'
// const Load = defineAsyncComponent(()=> import('../components/Loading'))

export default {
    setup() {
        const items = ref([{}, {}, {}, {}, {}, {}, {}])

        return {
            items,
            onLoad(index, done) {
                setTimeout(() => {
                    items.value.push({}, {}, {}, {}, {}, {}, {})
                    done()
                }, 2000)
            }
        }
    },
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
    async mounted() {
        const $q = useQuasar();

        await this.$api.get("list")
            .then((response) => {
                $q.loading.hide();
                console.log("ok")
                this.userList = response.data.data.data;
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
