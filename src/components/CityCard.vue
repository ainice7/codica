<template>
  <router-link :to="{ name: 'detail', params: { id: city.id }}" class="city-card">
    <div class="city-options">
      <span v-tooltip="'Update weather'" @click.stop.prevent="updateCard"><i class="material-icons">refresh</i></span>
      <span v-tooltip="'Remove city'" @click.stop.prevent="deleteCard"><i class="material-icons">delete</i></span>
    </div>
    <h2>{{city.name}}, {{city.sys.country}}</h2>
    <div class="city-info">
      <h3 class="icon-container">
      <i class="wi display-1" :class="getIcon"></i>
      </h3>
      <div class="current-temperature">Current temperature: <h4>{{getTemp('temp')}}&deg;C</h4></div>
      <div class="temp">
        <div><small>Min:</small> {{getTemp('temp_min')}}&deg;C</div>
        <div><small>Max:</small> {{getTemp('temp_max')}}&deg;C</div>
      </div>
      <div class="weather-description">{{city.weather[0].description}}</div>
    </div>
  </router-link>
</template>

<script>
import cityMixin from '@/mixins/city.mixin'
export default {
  props: ['city'],
  mixins: [cityMixin]
}
</script>

<style lang="scss">
.city-card {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  padding: 20px 0 0;
  position: relative;
  width: 175px;
  height: 275px;
  border: 5px solid grey;
  border-radius: 20px;
  text-align: center;
  color: black;
  cursor: pointer;
  &:hover {
    border: 5px solid teal;
    .city-options {
      display: flex;
      justify-content: space-between;
    }
  }
  .city-options {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 5px;
    .material-icons:hover {
      color: teal;
    }
  }
  h2 {
    font-size: 22px;
    margin: 10px 5px;
    align-self: stretch;
  }
  .city-info {
    position: absolute;
    bottom: 10px;
    left: 15px;
    width: calc(100% - 30px);
    .icon-container {
      font-size: 50px;
      margin: 0 0 10px;
    }
    .current-temperature {
      h4 {
        margin: 0;
        font-size: 20px;
      }
    }
    .temp {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
      }
    }
    .weather-description {
      font-size: 14px;
      text-transform: capitalize;
    }
  }
}
</style>
