<template>

  <div class="q-pa-md" style="width: 100%; display: flex; justify-content: center;">
    <div class="q-gutter-y-md" style="max-width: 600px">

      <q-tabs
        v-model="tab"
        inline-label
        class="bg-primary text-white shadow-2"
      >
        <q-tab name="mails" icon="login" label="Login" v-on:click="this.Page = 'Login'" />
        <q-tab name="alarms" icon="add" label="Register"  v-on:click="this.Page = 'Register'"/>
        <q-tab name="movies" icon="movie" label="Reset Password"  v-on:click="this.Page = 'Forget'"/>
      </q-tabs>
    </div>
    <div>

    </div>

  </div>
  <center>
    <div style="" v-if="this.Page == 'Login'">
        <Login :Page="Page" />
    </div>
    <div style="" v-if="this.Page == 'Register'">
        <Register :Page="Page" />
    </div>
    <div style="" v-if="this.Page == 'Forget'">
        <Register :Page="Page" />
    </div>
  </center>
</template>

<script>
import { ref } from 'vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'

export default {
  setup () {
    return {
      tab: ref('mails'),
    }
  },
  data() {
      return {
          Page: "Login",
      }
  },
  components: {
      Register,
      Login
  },
}
</script>
