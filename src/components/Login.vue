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
        v-model="logData.emailUsername"
        label="Enter Login*"
        hint="Username or email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="logData.password"
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
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'
import axios from 'axios';



export default {
    props: {
        Page: String
    },
    data() {
        return {    
          logData: {
            emailUsername: null,
            password: null
          }
        }
    },
    setup () {
        return {
        step: ref(1)
        }
    },
    methods: {
        onSubmit(){
          
            axios.post(`http://192.168.8.101:8000/api/chatters`,{
              username : "fasdf",
              email: "ok",
              password: "okk"
            })
            .then(response => {
                // JSON responses are automatically parsed
                console.log(response);
            })
            .catch(e => {
                this.errors.push(e)
            });
              
            const $q = useQuasar()
            try {
              const key = "MITMATUSER"
              
              LocalStorage.set(key, this.logData)
            } catch (e) {
              console.log(e);
            }
        }
    },
}
</script>