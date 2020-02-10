<template>
  <div class="homepage">
    <Form />
    <div class="city-cards-container" v-if="cities.length !== 0">
      <CityCard v-for="city in cities" :city="city" :key="city.id" />
    </div>
    <p v-else>There is no cities yet</p>
  </div>
</template>

<script>
import Form from '@/components/Form'
import CityCard from '@/components/CityCard'
import messages from '@/utils/messages'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  components: {
    Form,
    CityCard
  },
  computed: {
    ...mapGetters({
      cities: 'giveCities'
    }),
    error() {
      return this.$store.getters.error
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeo)
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError] || "Something went wrong")
    }
  },
  methods: {
    setGeo(geo) {
      this.$store.dispatch('getCityByGeo', geo)
    }
  }
}
</script>

<style lang="scss">
.city-cards-container {
  display: flex;
  padding: 20px 0;
}
</style>