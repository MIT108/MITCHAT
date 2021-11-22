<template>
<div>
    <q-page-container v-if="userId != null">

        <div class="q-pa-md row justify-center">
            <div style="width: 100%;">

                <!--
                <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']" stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
-->
                <div v-for="msg in messages" :key="msg.id" class="caption q-py-sm">
                    <q-chat-message :name="msg.username" :label="msg.created_at" avatar='/images/defaultUser.png' :sent="checkSender(msg.sender_id)" :text="[msg.message]" :stamp="sendTime(msg.created_at)" text-color="white" :bg-color="messageColor(msg.sender_id)" /> <img :src="`https://cdn.quasar.dev/img/${userImage}`" alt="" srcset="">
                </div>
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
import subDays, {
    formatDistance
} from 'date-fns'
import {
    date
} from 'quasar'
import Vue from "vue"

export default {
    data() {
        messages: ""
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
        sendTime(time) {
            time = date.formatDate(time, 'X')
            var SECOND_MILLIS = 1000;
            var MINUTE_MILLIS = 60 * SECOND_MILLIS;
            var HOUR_MILLIS = 60 * MINUTE_MILLIS;
            var DAY_MILLIS = 24 * HOUR_MILLIS;

            if (time < 1000000000000) {
                // if timestamp given in seconds, convert to millis
                time *= 1000;
            }

            var now = new Date();
            if (time > now || time <= 0) {
                return null;
            }

            var diff = now - time;
            if (diff < MINUTE_MILLIS) {
                return MINUTE_MILLIS / SECOND_MILLIS;
            } else if (diff < 2 * MINUTE_MILLIS) {
                return "a minute ago";
            } else if (diff < 50 * MINUTE_MILLIS) {
                return diff / MINUTE_MILLIS + " minutes ago";
            } else if (diff < 90 * MINUTE_MILLIS) {
                return "an hour ago";
            } else if (diff < 24 * HOUR_MILLIS) {
                return diff / HOUR_MILLIS + " hours ago";
            } else if (diff < 48 * HOUR_MILLIS) {
                return "yesterday";
            } else {
                return diff / DAY_MILLIS + " days ago";
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
                axios.post(process.env.chatapp.API_URL + "message", {
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
            .get(process.env.chatapp.API_URL + "collect_message/1/2")
            .then(response => {
                // this.message = response.data
                this.messages = response.data
                console.log(response.data)
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
