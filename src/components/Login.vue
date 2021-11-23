<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
    <h5> {{Page}} </h5>

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="email"
        label="Enter Login*"
        hint="Username or email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your Passord *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-toggle label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
    </q-stepper>
  </div>
</template>


<script>
import { ref , defineAsyncComponent } from 'vue'
import { useQuasar } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'
import axios from 'axios';
import { mapActions, mapMutations } from 'vuex';
import { LOADING_SPINNER_SHOW_MUTATION, LOGIN_ACTION } from 'src/store/storeConstants';
import { logigAction } from 'src/store/module-auth/actions';

const AsyncComp = defineAsyncComponent(()=> import("./Chat"))



export default {
    props: {
        Page: String
    },
    data() {
        return {
            email: null,
            password: null,
            serverError: null
        }
    },
    setup () {
    const $q = useQuasar()

    return {
      
      step: ref(1),
      showNotifs (position, color, type, message) {
        $q.notify({
          progress: true,
          message: message,
          color: color,
          type: type,
          multiLine: true,
          position: position,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
      }
    }
  },
    methods: {

      ...mapActions('auth', {
        login: LOGIN_ACTION
      }),
      ...mapMutations({
        showLoading:LOADING_SPINNER_SHOW_MUTATION
      }),
        async onSubmit(){
          this.showLoading(true);
          try {
            // await this.$store.dispatch(logigAction)
            await this.login({email: this.email, password: this.password});
            this.showLoading(false);
            this.showNotifs('bottom-right','green','positive',this.serverError);
            this.$router.push("/Chat");
          } catch (error) {
            console.log(error);
            console.log(this.$apiResponse(error));
            this.serverError = this.$apiResponse(error)
            this.showLoading(false);
            this.showNotifs('bottom-right','negative','negative',this.serverError);
          }
        }
    },
}
</script>
