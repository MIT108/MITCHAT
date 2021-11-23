<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
    <h5> {{Page}} </h5>
    
  <div class="q-pa-md">
    <q-btn no-caps color="purple" @click="showNotifs('top', 'red', 'danger')" label="Show timeout progress" />
  </div>
      <!-- <flash-message :error="serverError" /> -->

    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
    >
      <q-step
        :name="1"
        title="Select campaign settings"
        icon="settings"
        :done="step > 1"
      >

      <q-input
        filled
        v-model="userName"
        label="Your username *"
        hint="username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />


        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Create an ad group"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
      
      <q-input
        filled
        type="email"
        v-model="email"
        label="Your email *"
        hint="example: example@site.com"
        lazy-rules
        :rules="[ val => val && val.length > 0  || 'Please enter the Right email format']"
      />


        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
      
      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password *"
        hint="Secure password"
        lazy-rules
        :rules="[ val => val && val.length > 8 || 'the password is too short: 8 characters needed']"
      />



        <q-stepper-navigation>
          <q-btn color="primary" type="submit" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      </q-form>
    </q-stepper>

</div>
</template>

<script>
import {
    ref
} from 'vue'
import axios from 'axios';
import { useQuasar } from 'quasar'
import { signUpAction } from 'src/store/module-auth/actions';
import { mapActions, mapMutations } from 'vuex';
import { LOADING_SPINNER_SHOW_MUTATION, LOGIN_ACTION, SIGNUP_ACTION } from 'src/store/storeConstants';
// import FlashMessage from './FlashMessage.vue';



export default {
    components:{
      // FlashMessage
    },
    computed: {
    },
    props: {
        Page: String
    },
    data() {
        return {
            userName: null,
            email: null,
            password: null,
            passwordConfirm: null,
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
          color: type,
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
    ...mapActions('auth',{
        signUp: SIGNUP_ACTION
    }),
    ...mapMutations({
      showLoading:LOADING_SPINNER_SHOW_MUTATION
    }),
      async onSubmit(){
        this.showLoading(true);
        try {
            await this.signUp({email: this.email, password: this.password, userName:this.userName})
             this.showNotifs('bottom-right','green','positive',this.serverError);
            this.showLoading(false);
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
