<template>
  <div class="flex justify-between items-center">
    <TimerActions
      :isPlaying="isPlaying"
      @startTimer="startTimer"
      @stopTimer="stopTimer"
    />
    
    <input
      v-if="!isPlaying"
      placeholder="Minutos"
      class="border-primary rounded-md w-full text-black font-semibold pl-1 text-3xl"
      type="text"
      v-model="minutesToAdd"
      :min="MIN_MINUTES"
      :max="MAX_MINUTES"
    />

    <TimerCounter
      v-show="isPlaying"
      :minutesToAdd="minutesToAdd"
      :isPlaying="isPlaying"
      @stopTimer="stopTimer"
      class="w-full"
    />

    <ToggleThemeButton class="ml-2" />
  </div>
</template>

<script>
import TimerActions from "./TimerActions.vue"
import TimerCounter from "./TimerCounter.vue"
import ToggleThemeButton from '../ToggleThemeButton.vue'


export default {
  name: 'App',
  components: {
    TimerActions,  
    TimerCounter,
    ToggleThemeButton,
  },
  data() {
    return {
      isPlaying: false,
      minutesToAdd: "",
      MIN_MINUTES: 1,
      MAX_MINUTES: 60,
    }
  },
  methods: {
    startTimer() {
      if (this.minutesToAdd >= this.MIN_MINUTES && this.minutesToAdd <= this.MAX_MINUTES) {
        this.isPlaying = true
      }
    },
    stopTimer() {
      this.isPlaying = false
    }
  }
}
</script>