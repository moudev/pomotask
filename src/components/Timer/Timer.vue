<template>
  <div class="flex justify-between items-center">
    <TimerActions
      :is-playing="isPlaying"
      @startTimer="startTimer"
      @stopTimer="stopTimer"
    />
    
    <div class="w-full pt-3">
      <input
        v-if="!isPlaying"
        v-model="minutesToAdd"
        placeholder="Minutos"
        class="border-primary rounded-md w-full pl-1 mb-1 text-black font-semibold text-3xl"
        type="text"
        :min="MIN_MINUTES"
        :max="MAX_MINUTES"
      >
      <p class="text-[0.5rem] text-color-secondary">
        Máximo 60 minutos
      </p>
    </div>    
    

    <TimerCounter
      v-show="isPlaying"
      :minutes-to-add="minutesToAdd"
      :is-playing="isPlaying"
      class="w-full"
      @stopTimer="stopTimer"
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