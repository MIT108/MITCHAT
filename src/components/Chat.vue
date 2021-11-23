<template>
<div>
    <q-page-container v-if="userId != null">

        <div class="q-pa-md row justify-center">
            <div style="width: 100%;">

                <!--
                <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']" stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
-->
                <div v-if="messageLoad">
                    <div v-if="messages.length == 0">
                        <center style="margin-top: 10%;">

                            <img src="/images/noChat.jfif" centered alt="" srcset="" width="250">
                            <br>
                            <q-btn unelevated rounded color="primary" @click="basic = true" label="No message!! click to start one" />

                        </center>
                    </div>
                    <div v-else ref="feed" id="feed">
                        <div v-for="msg in messages" :key="msg.id" class="caption q-py-sm">
                            <q-chat-message :name="msg.username" :label="msg.created_at" avatar='/images/defaultUser.png' :sent="checkSender(msg.sender_id)" :text="[msg.message]" :stamp="sendTime(msg.created_at)" text-color="white" :bg-color="messageColor(msg.sender_id)" /> <img alt="" srcset="">
                        </div>
                    </div>
                </div>
                <div v-else>
                    <center>
                        <spinner />
                    </center>
                </div>
            </div>
            <q-footer elevated>
                <q-toolbar>
                    <q-input bg-color="white" class="full-width" @keydown.enter="saveMessage()" outlined rounded label="message" v-model.trim="message" dense>

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
import spinner from "./Spinner.vue";
import axios from 'axios';
import {
    date
} from 'quasar'
import Vue from "vue"

export default {
    watch: {
        userId: function (va) {
            this.messageLoad = false
            axios
                .get(process.env.chatapp.API_URL + "collect_message/" + this.userId + "/1")
                .then(response => {
                    this.messages = response.data
            this.scrollToBottom()
                    this.messageLoad = true
                })
                .catch(error => {
                    console.log(error);
                })
        },
        messages: function () {
            this.scrollToBottom()

        }

    },
    data() {
        return {
            message: "",
            messages: [],
            messagesExist: false,
            messageLoad: false
        }
    },
    methods: {
        loadMessage() {
            console.log("meidnjem");
        },
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
                return Math.round(MINUTE_MILLIS / SECOND_MILLIS);
            } else if (diff < 2 * MINUTE_MILLIS) {
                return "a minute ago";
            } else if (diff < 50 * MINUTE_MILLIS) {
                return Math.round(diff / MINUTE_MILLIS) + " minutes ago";
            } else if (diff < 90 * MINUTE_MILLIS) {
                return "an hour ago";
            } else if (diff < 24 * HOUR_MILLIS) {
                return Math.round(diff / HOUR_MILLIS) + " hours ago";
            } else if (diff < 48 * HOUR_MILLIS) {
                return "yesterday";
            } else {
                return Math.round(diff / DAY_MILLIS) + " days ago";
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

            if (this.message == "") {
                alert("enter message")

            } else {
                axios.post(process.env.chatapp.API_URL + "message", {
                        sender_id: this.userId,
                        receiver_id: '1',
                        message: this.message
                    })
                    .then(response => {
                        // JSON responses are automatically parsed
                        this.messages.push(response.data[0])
                        this.message = ""
                        console.log(this.messages);
                    })
            }

        },
        scrollToBottom() {
            setTimeout(() => {
                var container = this.$el.querySelector("#feed");
                container.scrollTop = container.scrollHeight;
                console.log(this.$refs.feed.scrollHeight);
                console.log(this.$refs.feed.clientHeight);
                console.log(this.$refs.feed.scrollTop);
                this.$refs.feed.scrollTop = this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight;
            }, 50)
        }
    },
    props: {
        userId: String,
        userName: String,
        userImage: String,
        userEmail: String,
    },
    created() {
        this.loadMessage()
    },
    components: {
        EssentialLink,
        spinner
    },
};
</script>
