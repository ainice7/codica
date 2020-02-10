<template>
  <form @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="teal-text card-title">Enter city</span>
      <div class="inputs-container">
        <div class="input-field">
        <input 
          id="city" 
          type="text" 
          v-model.trim="city"
        />
        <label for="city">City</label>
        </div>
        <div class="input-field">
          <input 
            id="country" 
            type="text" 
            v-model.trim="country"
          />
          <label for="country">Country</label>
        </div>
        <button class="waves-effect waves-light btn" type="submit">
          <i class="material-icons left">add_circle</i>
          Add
        </button>
        <button 
          class="waves-effect waves-light btn" 
          @click="addGeoCity"
          :class="{disabled: geoCity}"
          type="button">
          <i class="material-icons left">location_on</i>
          get location
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    city: "",
    country: ""
  }),
  computed: {
    geoCity() {
      let geo = this.$store.getters.giveGeoCity
      return geo === null || Object.keys(geo).length === 0 || this.$store.getters.giveCityByID(geo.id)
    }
  },
  methods: {
    async onSubmit() {
      const cityData = {
        city: this.city,
        country: this.country
      }
      const newCity = await this.$store.dispatch('getCity', cityData)
      if(newCity) {
        this.city = '',
        this.country = ''
      }
    },
    addGeoCity() {
      this.$store.commit('addCity', this.$store.getters.giveGeoCity)
    }
  }
}
</script>

<style lang="scss" scoped>
.inputs-container {
  display: flex;
  padding-top: 20px;
  .input-field {
    margin: 0 20px;
    width: 25%;
  }
  button {
    margin: 0 10px;
  }
}
</style>
