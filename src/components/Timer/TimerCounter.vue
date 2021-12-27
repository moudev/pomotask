<template>
  <div class="text-6xl text-center w-full">
    {{ screenTime.minutes }}:{{ screenTime.seconds }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      intervalTimerId: null,
      distanceTimeMsec: 0,
      limitTimeMSec: 0,
      INTERVALS_STORAGE_KEY: 'intervals',
    }
  },
  props: {
    isPlaying: {
      type: Boolean,
      required: true,
      default: false,
    },
    minutesToAdd: {
      type: String,
      required: true,
      default: "0",
    }
  },
  methods: {
    manipulateIntervalsLocalStorage(action = 'get', id = 0) {
      const intervals = localStorage.getItem(this.INTERVALS_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(this.INTERVALS_STORAGE_KEY))
        : []

      if (action === 'add') {
        intervals.push(id)
        localStorage.setItem('intervals', JSON.stringify(intervals))
      } else if (action === 'clear') {
        localStorage.removeItem(this.INTERVALS_STORAGE_KEY)
      }

      return intervals
    },
    clearIntervals() {
      const intervals = this.manipulateIntervalsLocalStorage('get')
      intervals.map(id => clearInterval(id))
      this.manipulateIntervalsLocalStorage('clear')
    },  
    startTimer() {
      console.log('======== START ========')
  
      this.limitTimeMSec = parseInt(this.$dayjs().add(this.minutesToAdd, 'm').format('x'), 10)

      // https://www.w3schools.com/howto/howto_js_countdown.asp
      this.intervalTimerId = setInterval(() => {
        console.log('Running...')
        this.distanceTimeMsec =  this.limitTimeMSec - new Date().getTime()

        if (this.distanceTimeMsec < 0) {
          this.stopTimer()
        }
      }, 1000)

      this.manipulateIntervalsLocalStorage('add', this.intervalTimerId)
    },
    stopTimer() {
      console.log('========= STOP =========')

      this.$emit('stopTimer')
      this.intervalTimerId = null
      this.distanceTimeMsec = 0
      this.clearIntervals()
    },
  },
  computed: {
    screenTime() {
      const minutes =Math.floor((this.distanceTimeMsec % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((this.distanceTimeMsec % (1000 * 60)) / 1000)

      return {
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds  < 10 ? `0${seconds}` : seconds,
      }
    }
  },
  watch: {
    isPlaying(newVal) {
      if (newVal) {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    }
  }
}
</script>