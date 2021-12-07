<template>
  <Loader v-if="showLoading"></Loader>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Loader from './components/Loader.vue'
import { AUTO_ACTION_LOGIN } from './store/storeConstants';
export default defineComponent({
  name: 'App',
  computed:{
    ...mapState({
      showLoading: (state) => state.showLoading
    })
  },
  created(){
      this.$store.dispatch(`auth/${AUTO_ACTION_LOGIN}`);
  },
  components:{
    Loader
  }
})
</script>
