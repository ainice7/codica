<template>
  <Loader v-if="loading" />
  <div class="city-weather-detail" v-else>
    <h1>{{city.name}}, {{city.sys.country}}</h1>
    <div class="detail-info">
      <div class="detail-left-side">
        <h3 class="icon-container">
          <i class="wi display-1" :class="getIcon"></i>
        </h3>
        <div class="weather-description">{{city.weather[0].description}}</div>
      </div>
      <div class="detail-right-side">
        <div class="current-temperature">
          Current temperature: {{getTemp('temp')}}&deg;C,
          Feels like: {{getTemp('feels_like')}}&deg;C
        </div>
        <div class="temp">
          <span>Min: {{getTemp('temp_min')}}&deg;C, </span>
          <span>Max: {{getTemp('temp_max')}}&deg;C</span>
        </div>
        <div>Pressure: {{city.main.pressure}} hPa</div>
        <div>Wind Speed: {{city.wind.speed}}m/s</div>
        <div class="btn-container">
          <button 
            class="waves-effect waves-light btn" 
            @click="buttonHandler" 
            v-html="buttonDetermination"
          ></button>
          <router-link to="/" tag="button" class="waves-effect waves-light btn">Go to main page</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cityMixin from '@/mixins/city.mixin'
export default {
  name: 'detail',
  data: () => ({
    city: {},
    loading: true
  }),
  mixins: [cityMixin],
  async mounted() {
    this.city = await this.$store.dispatch('getCityById', this.$route.params.id) 
    this.loading = false
  },
  computed: {
    buttonDetermination() {
      if(this.$store.getters.giveCityByID(this.city.id)) {
        return '<i class="material-icons">delete</i>Delete from favourite'
      } else {
        return '<i class="material-icons left">add_circle</i>Add to favourite'
      }
    }
  },
  methods: {
    buttonHandler() {
      if(this.$store.getters.giveCityByID(this.city.id)) {
        this.$store.commit('deleteCity', this.city.id)
      } else {
        this.$store.commit('addCity', this.city)
      }
    }
  }
}
</script>

<style lang="scss">
.city-weather-detail {
  h1 {
    margin: 0;
    font-size: 45px;
    text-align: center;
  }
  .detail-info {
    display: flex;
    justify-content: center;
    .detail-left-side, .detail-right-side {
      margin: 20px;
    }
    .detail-left-side {
      h3 {
        font-size: 60px;
        margin: 10px 0;
      }
      .weather-description {
        text-transform: capitalize;
      }
    }
    .btn-container {
      display: flex;
      flex-direction: column;
      button {
        margin-top: 20px;
      }
    }
  }
}
</style>