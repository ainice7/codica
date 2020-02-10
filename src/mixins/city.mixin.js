import messages from '@/utils/messages'

export default {
  computed: {
    getIcon() {
      const rangeId = this.city.weather[0].id
      switch (true) {
        case rangeId >= 200 && rangeId < 232:
          return "wi-thunderstorm";
        case rangeId >= 300 && rangeId <= 321:
          return "wi-sleet";
        case rangeId >= 500 && rangeId <= 521:
          return "wi-storm-showers";
        case rangeId >= 600 && rangeId <= 622:
          return "wi-snow";
        case rangeId >= 701 && rangeId <= 781:
          return "wi-fog";
        case rangeId === 800:
          return "wi-day-sunny";
        case rangeId >= 801 && rangeId <= 804:
          return "wi-day-fog";
        default:
          return "wi-day-fog";
      }
    }
  },
  methods: {
    getTemp(temp) {
      return Math.floor(this.city.main[temp] - 273,15)
    },
    deleteCard() {
      this.$store.commit('deleteCity', this.city.id)
      this.$message(messages['deleted'])
    },
    async updateCard() {
      await this.$store.dispatch('updateCityById', this.city.id)
      this.$message(messages['updated'])
    }
  }
}