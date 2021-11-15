<template>
  <Auth />
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          MIT-Max Chatting Appication
        </q-toolbar-title>
        
        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="logout"
          @click="logout"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list >

        <EssentialLink />
      </q-list>
    </q-drawer>

    <q-page-container>
        
      <div class="q-pa-md row justify-center">
        <div style="width: 100%;">
          <q-chat-message
            name="me"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="['hey, how are you?']"
            stamp="7 minutes ago"
            sent
            bg-color="amber-7"
          />
          <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar5.jpg"
            :text="[
              'doing fine, how r you?',
              'I just feel like typing a really, really, REALLY long message to annoy you...'
            ]"
            size="6"
            stamp="4 minutes ago"
            text-color="white"
            bg-color="primary"
          />
          <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar5.jpg"
            :text="['Did it work?']"
            stamp="1 minutes ago"
            size="8"
            text-color="white"
            bg-color="primary"
          />
        </div>
        <q-footer elevated>
          <q-toolbar>
            <q-input
              bg-color= "white"
              class = "full-width"
              outlined
              rounded
              label="message"
              dense>

              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  color="white"
                  icon="send"/>
            </template>
            </q-input>
          </q-toolbar>
        </q-footer>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Auth from 'components/Auth.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { defineComponent, ref } from 'vue'
import { LocalStorage, SessionStorage } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Auth,
    EssentialLink
  },
  
    mounted() {
                
        let value = LocalStorage.getItem("MITMATUSER")
        console.log(value)
        if (value == "null") {
            console.log("pl")
            window.location.href = "/"
        }

    },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    logout(){

      const key = "MITMATUSER"
      
      LocalStorage.set(key, "null")

      window.location.href = "/"
    }
  },
})
</script>
