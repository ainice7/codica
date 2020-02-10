import Vue from 'vue'
import Vuex from 'vuex'
import {checkCookie, getCookie, setCookie} from '@/utils/cookie'

Vue.use(Vuex)
const key = process.env.VUE_APP_WEATHER

export default new Vuex.Store({
  state: {
    cities: [],
    error: null,
    geoCity: null
  },
  mutations: {
    updateCity(state, city) {
      const index = state.cities.findIndex(item => item.id === city.id)
      state.cities.splice(index, 1, city)
    },
    addGeoCity(state, city) {
      state.geoCity = city
    },
    addCity(state, city) {
      if(!city || Object.keys(city).length < 3) {
        return
      }
      const isCookieExist = getCookie('ids')
        .split(', ')
        .find(id => +id === city.id)
      if(!isCookieExist) {
        checkCookie(city.id)
      }
      state.cities.push(city)
    },
    deleteCity(state, cityID) {
      const index = state.cities.findIndex(city => city.id === cityID)
      const newCookies = getCookie('ids')
        .split(', ')
        .filter(id => +id !== cityID)
        .join(', ')
      setCookie('ids', newCookies)
      state.cities.splice(index, 1)
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async getCityById({commit}, id) {
      try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}`);
        const cityObj = await res.json();
        return cityObj
      } catch (error) {
        commit('setError', 'undefined')
        return false
      }
    },
    async getCityByGeo({commit}, geo) {
      try {
        const lat = geo.coords.latitude.toFixed(2)
        const lon = geo.coords.longitude.toFixed(2)
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
        const cityObj = await res.json();
        if(this.getters.giveCityByID(cityObj.id)) {
          return {}
        } else {
          commit('addGeoCity', cityObj)
        }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateCityById({commit, dispatch}, cityId) {
      const cityObj = await dispatch('getCityById', cityId);
      commit('updateCity', cityObj)
    },
    async getCity({commit}, {city, country}) {
      try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`);
        const cityObj = await res.json()
        if(this.getters.giveCityByID(cityObj.id)) {
          commit('setError', 'exist')
          return false
        } else if(cityObj.cod === "404") {
          commit('setError', 'undefined')
          return false
        } else {
          commit('addCity', cityObj)
          return cityObj
        }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async getCities({commit, dispatch}) {
      let ids = getCookie('ids');
      ids = ids.length > 0 ? ids.split(', ') : ''
      if(ids !== '') {
        ids.forEach(async (id) => {
          const cityObj = await dispatch('getCityById', id);
          commit('addCity', cityObj)
        })
      }
    }
  },
  getters: {
    giveGeoCity: s => s.geoCity,
    giveCities: s => s.cities,
    giveCityByID: s => id => s.cities.find(el => el.id === id),
    error: s => s.error
  }
})