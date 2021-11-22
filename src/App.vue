<template>
  <Loader v-if="showLoading"></Loader>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Loader from './components/Loader.vue'
export default defineComponent({
  name: 'App',
  computed:{
    ...mapState({
      showLoading: (state) => state.showLoading
    })
  },
  components:{
    Loader
  }
})
</script>
