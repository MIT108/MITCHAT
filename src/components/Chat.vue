<template>
<div class="back">
    <q-page-container v-if="userId != null">

        <div class="q-pa-md row justify-center">
            <div style="width: 100%;">
                <!--
                <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']" stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
-->

                <div v-if="!messageLoad">
                    <div v-if="messages.length == 0">
                        <center style="margin-top: 10%;">

                            <img src="/images/noChat.jfif" centered alt="" srcset="" width="250">
                            <br>
                            <q-btn unelevated rounded color="primary" @click="basic = true" label="No message!! click to start one" />

                        </center>
                    </div>
                    <div v-else ref="feed" id="feed">
                        <div v-for="msg in messages" :key="msg.id" class="caption q-py-sm">

                            <q-chat-message :name="msg.username" :label="checkDate(msg.created_at)" avatar='/images/defaultUser.png' :sent="checkSender(msg.sender_id)" :text="[msg.message]" :stamp="sendTime(msg.created_at)" text-color="white" :bg-color="messageColor(msg.sender_id)" /> <img alt="" srcset="">

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
                    <q-input :disable="messageLoad" bg-color="white" class="full-width" @keydown.enter="saveMessage()" outlined rounded label="message" v-model.trim="message" dense>

                        <template v-slot:after>
                            <q-btn :disable="messageLoad" round dense flat color="white" v-on:click="saveMessage()" icon="send" />
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
import EssentialLink from "./EssentialLink.vue";
import spinner from "./Spinner.vue";
import {
    date
} from 'quasar'
import {
    USER_DATA_GETTER,
    GET_USER_TOKEN_GETTER
} from 'src/store/storeConstants';
export default {
    mounted() {

        this.user = this.$store.getters[`auth/${USER_DATA_GETTER}`]
        const token = this.$store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        this.$echo.connector.pusher.config.auth.headers['Authorization'] = `Bearer ${token}`;
        this.$echo.private('messages.' + this.user[0]).listen('NewMessage', (payload) => {

            console.log(payload.message);

            // this.messages.push(this.cloneMessage(payload.message));

            if (payload.message.sender_id == this.userId) {
                this.messages.push(this.cloneMessage(payload.message));
            }
            var newMessage = [this.index, payload.message.message, payload.message.sender, null]
            this.$emit("newMessage", newMessage)

        })

        // this.$echo.private(`chat.${this.user[0]}`)
        //     .listenForWhisper('typing', (e) => {
        //       console.log("meindjem thieery")
        //     });

    },

    props: {
        userId: String,
        userName: String,
        userImage: String,
        userEmail: String,
        index: String,
    },
    created() {},
    components: {
        EssentialLink,
        spinner
    },
    watch: {
        message: function () {
            // const token = this.$store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
            // this.$echo.connector.pusher.config.auth.headers['Authorization'] = `Bearer ${token}`;
            // this.$echo.private(`chat.${this.userId}`)
            //     .whisper('typing', {
            //         name: this.userId
            //     });
        },
        userId: function (va) {
            this.user = this.$store.getters[`auth/${USER_DATA_GETTER}`]

            this.messageLoad = true
            this.$api
                .get("collect_message/" + this.userId + "/" + this.user[0])
                .then(response => {
                    this.messages = response.data.data
                    console.log(this.messages);
                    // this.scrollToBottom()
                    this.messageLoad = false
                })
                .catch(error => {
                    console.log(error);
                })
            // const height = document.getElementById('feed').offsetHeight
            // console.log(height)
        },
        messages: function () {
            // this.scrollToBottom()

        }

    },
    data() {
        return {
            message: "",
            newMessage: {
                sender_id: null,
                receiver_id: null,
                message: null,
                created_at: null,
            },
            messages: [],
            messagesExist: false,
            messageLoad: false,
            user: [],
            currentDate: null
        }
    },
    methods: {
        loadMessage() {},
        messageName(sender) {
            if (sender == this.user[0]) {
                return "me"
            } else {
                return this.userName
            }
        },
        checkDate(time) {
            time = time.substr(0, 10);
            var n = time
            var now = new Date().toISOString().substr(0, 10)
            var yesterday

            time = date.formatDate(time.substr(0, 10), 'X')

            now = date.formatDate(now, 'X')
            yesterday = now - 86400

            var dates
            if (now == time) {
                dates = "today"

                if (dates == this.currentDate) {
                    return
                }
                this.currentDate = dates
            } else if (yesterday == time) {
                dates = "yesterday"

                if (dates == this.currentDate) {
                    return
                }
                this.currentDate = dates
            } else {
                dates = this.getMonth(n.substr(5, 2)) + " " + n.substr(8, 2) + ", " + n.substr(0, 4);

                if (dates == this.currentDate) {
                    return
                }
                this.currentDate = dates
            }

            return dates
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
            if (sender == this.user[0]) {
                return true
            } else {
                return false
            }

        },
        messageColor(sender) {
            if (sender == this.user[0]) {
                return "primary"
            } else {
                return
            }
        },
        saveMessage() {

            if (this.message == "") {
                alert("enter message")

            } else {
                var currentdate = new Date();
                var datetime = currentdate.getFullYear() + "-" +
                    (currentdate.getMonth() + 1) + "-" +
                    currentdate.getDate() + " " +
                    currentdate.getHours() + ":" +
                    currentdate.getMinutes() + ":" +
                    currentdate.getSeconds();
                this.newMessage.sender_id = this.user[0];
                this.newMessage.receiver_id = this.userId;
                this.newMessage.message = this.message;
                this.newMessage.created_at = datetime;
                this.messages.push(this.cloneMessage(this.newMessage));

                var sendMessage = this.message
                this.message = ""
                console.log(this.messages);

                this.$api.post("send", {
                        contact_id: this.userId,
                        text: sendMessage
                    })
                    .then(response => {
                        // // JSON responses are automatically parsed
                        // this.messages.push(response.data.message[0])
                        // // console.log(response.data.data);
                        // console.log(response.data.message[0]);
                        sendMessage = ""
                    })

                var newMessage = [this.index, sendMessage, null, "me"]
                this.$emit("newMessage", newMessage)
            }

        },
        getMonth(m) {
            switch (m) {
                case "01":
                    return "Jan"
                    break;
                case "02":
                    return "Feb"
                    break;
                case "03":
                    return "May"
                    break;
                case "04":
                    return "Apr"
                    break;
                case "05":
                    return "Mar"
                    break;
                case "06":
                    return "Jun"
                    break;
                case "07":
                    return "Jul"
                    break;
                case "08":
                    return "Aug"
                    break;
                case "09":
                    return "Sep"
                    break;
                case "10":
                    return "Oct"
                    break;
                case "11":
                    return "Nov"
                    break;
                case "12":
                    return "Dec"
                    break;
            }
        },
        cloneMessage(servermessage) {
            var clone = {};
            for (var key in servermessage) {
                if (servermessage.hasOwnProperty(key)) //ensure not adding inherited props
                    clone[key] = servermessage[key];
            }
            return clone;
        }
    },
};
</script>

<style scoped>
.back {
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1089577/background.png);
    width: 100%;
    overflow-y: auto;
    height: 100vh;
}
</style>
