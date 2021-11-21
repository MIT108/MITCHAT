<template>
<div>
    <q-page-container v-if="userId != null">

        <div class="q-pa-md row justify-center">
            <div style="width: 100%;">

                <q-infinite-scroll @load="onLoad" reverse>
                    <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner color="primary" name="dots" size="40px" />
                        </div>
                    </template>
                    <!--
                <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']" stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
-->

                    <div v-for="(item, index) in items" :key="index" class="caption q-py-sm">
                        <q-chat-message :name="messageName(items.length - index)" :label="checkDate(items.length - index)" avatar='/images/defaultUser.png' :sent="checkSender(items.length - index)" :text="['doing fine, how r you?','I REALLY long messageI just feel like typing a really, reg a really, really, REALLY long messageI just feel like typing a really, reall ty a realan']" stamp="4 minutes ago" text-color="white" :bg-color="messageColor(items.length - index)" /> <img :src="`https://cdn.quasar.dev/img/${userImage}`" alt="" srcset="">
                    </div>
                </q-infinite-scroll>
            </div>
            <q-footer elevated>
                <q-toolbar>
                    <q-input bg-color="white" class="full-width" outlined rounded label="message" v-model.trim="msg" dense>

                        <template v-slot:after>
                            <q-btn round dense flat color="white" v-on:click="saveMessage()" icon="send" />
                        </template>
                    </q-input>
                </q-toolbar>
            </q-footer>
        </div>
    </q-page-container>

    <q-page-container v-else width="100%" height="80vh" style="height: 100vh; display: flex; justify-content: center; align-items:center; flex-direction: column;">

        <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
            <q-card>
                <EssentialLink />

                <q-card-actions align="right">
                    <q-btn flat label="Close" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <img src="/images/noChat.jfif" centered alt="" srcset="" width="250">
        <br>
        <q-btn unelevated rounded color="primary" @click="basic = true" label="click Here to start a new chat" />
    </q-page-container>

</div>
</template>

<script>
import {
    ref
} from "vue";
import EssentialLink from "./EssentialLink.vue";
import axios from 'axios';

export default {
  data () {
    return {
            URL: "https://7a10-154-72-150-96.ngrok.io/api",
    }
  },
    setup() {
      const items = ref([])

        return {
            // items,
            // onLoad(index, done) {
            //   var data
            //     axios
            //         .get("https://7a10-154-72-150-96.ngrok.io/api/collect_message/1/2")
            //         .then(response => {
            //           // this.message = response.data
            //           console.log(response.data);
            //           data = response.data
            //             // this.userList = JSON.stringify(this.userList)
            //         })
            //         .catch(error => {
            //             console.log(error);
            //             // this.errored = true
            //         })
            //     .finally(() => done())
            //     setTimeout(() => {
            //         items.value.splice(data)
            //         done()
            //     }, 2000)
            // },
            // msg: "",

            // basic: ref(false),
            // fixed: ref(false),
        };
    },
    methods: {
        messageName(sender) {
            if (sender % 2 != 0) {
                return "me"
            } else {
                return this.userName
            }
            return "miendjem"
        },
        checkDate(time) {
            if (time % 7 != 0) {
                return null
            } else {
                return time
            }
        },
        checkSender(sender) {
            if (sender % 2 != 0) {
                return true
            } else {
                return false
            }

        },
        messageColor(sender) {
            if (sender % 2 != 0) {
                return "primary"
            } else {
                return
            }
        },
        saveMessage() {
            if (this.msg == "") {
                alert("enter message")

            } else {
                axios.post(this.URL +"/message", {
                        sender_id: '1',
                        receiver_id: this.userId,
                        message: 'good'
                    })
                    .then(response => {
                        // JSON responses are automatically parsed
                        console.log(response);
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            }

        }
    },
    props: {
        userId: String,
        userName: String,
        userImage: String,
        userEmail: String,
    },
    created() {
        console.log("ok");
      
        axios
            .get("https://7a10-154-72-150-96.ngrok.io/api/collect_message/1/2")
            .then(response => {
              // this.message = response.data
              console.log(response.data);
                // this.userList = JSON.stringify(this.userList)
            })
            .catch(error => {
                console.log(error);
                // this.errored = true
            })

    },
    components: {
        EssentialLink,
    },
};
</script>
