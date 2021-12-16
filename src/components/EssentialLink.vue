<template>
<div class="" style="max-width: 350px">

    <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list v-if="userListLoading">
        <div class="q-p-3" style="padding: 10px;">

            <q-input rounded bottom-slots v-model="search" label="search" >
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
                <template v-slot:append>
                    <q-icon name="close" @click="search = ''" class="cursor-pointer" />
                </template>

            </q-input>
        </div>

        <q-item-label header>Recent contacts</q-item-label>

        <div v-if="search == '' || search == null">

            <div v-for="(user, index) in userListOld" :key="index">
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
        </div>
        <div v-else>

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
        </div>

    </q-list>

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

// import { VuejsDatatableFactory } from 'vuejs-datatable';

// Vue.use( VuejsDatatableFactory );

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
        search: function () {
          var temp = []
            for (let index = 0; index < this.userListOld.length; index++) {
              if (this.userListOld[index].username.includes(this.search)) {
                temp.push(this.userListOld[index]);
              }
            }
            console.log(temp);
            this.userList = temp
        },
        newMessage: function () {
            if (this.active == 1) {
                console.log(this.newMessage);
                if (this.newMessage[3] == null) {
                    this.userList[this.newMessage[0]].email = this.newMessage[1]

                } else {
                    this.userList[this.newMessage[0]].email = "me : " + this.newMessage[1]
                }
                this.userList[this.newMessage[0]].username = this.newMessage[2]
                console.log(this.newMessage);

                this.userList.unshift(this.userList[this.newMessage[0]])
                this.userList.splice(this.newMessage[0] + 1, 1)
            } else {

                this.user = this.$store.getters[`auth/${USER_DATA_GETTER}`]
                const token = this.$store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
                this.$echo.connector.pusher.config.auth.headers['Authorization'] = `Bearer ${token}`;
                this.$echo.private('messages.' + this.user[0]).listen('NewMessage', (payload) => {
                    this.userList[100].email = payload.message.message

                    this.userList[100].username = payload.message.sender
                    this.userList.unshift(this.userList[100])
                    this.userList.splice(100 + 1, 1)

                })

            }
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
            userListOld: null,
            search: null,
            active: 0,
            userListLoading: false,
        };
    },
    methods: {
        sendResultValues: function (index, id, name, email, image) {
          this.search =""
            console.log(index);
            this.userData.index = index;
            this.userData.id = id;
            this.userData.email = email;
            this.userData.name = name;
            this.userData.image = image;
            this.active = 1

            this.$emit("userData", this.userData);
        }
    },
    async mounted() {
        const $q = useQuasar();

        await this.$api.get("list")
            .then((response) => {
                $q.loading.hide();
                this.userList = response.data.data;
                this.userListOld = response.data.data;
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
