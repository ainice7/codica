<template>
  <div id="app">
    <Navbar />
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <main class="app-content">
        <div class="app-page">
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
export default {
  data: () => ({
    loading: true,
    transitionName: ''
  }),
  components: {
    Navbar
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  async mounted() {
    if(!Object.keys(this.$store.getters.giveCities).length) {
      await this.$store.dispatch('getCities')
    }
    
    this.loading = false
  }
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import '~weather-icons/css/weather-icons.css';
.app-main-layout{
  position:relative;
  min-height:100vh;
  .app-content{
    padding-top:64px;
    position:relative;
    .app-page{
      padding:2rem;
    }
  }
}
</style>