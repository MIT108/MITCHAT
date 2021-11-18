<template>
<div>
    <q-page-container v-if="userId != null">

        <div class="q-pa-md row justify-center">
            <div style="width: 100%;">
                <q-chat-message :name="userImage" :avatar="`https://cdn.quasar.dev/img/${userImage}`" :text="['hey, how are you?']" stamp="7 minutes ago" sent bg-color="amber-7" />
                <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="[
              'doing fine, how r you?',
              'I just feel like typing a really, really, REALLY long message to annoy you...'
            ]" size="6" stamp="4 minutes ago" text-color="white" bg-color="primary" />
                <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['Did it work?']" stamp="1 minutes ago" size="8" text-color="white" bg-color="primary" />
            </div>
            <q-footer elevated>
                <q-toolbar>
                    <q-input bg-color="white" class="full-width" outlined rounded label="message" dense>

                        <template v-slot:after>
                            <q-btn round dense flat color="white" icon="send" />
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

export default {
    setup() {
        return {
            basic: ref(false),
            fixed: ref(false),
        };
    },
    methods: {},
    props: {
        userId: String,
        userName: String,
        userImage: String,
        userEmail: String,
    },
    created() {},
    components: {
        EssentialLink
    },
};
</script>
