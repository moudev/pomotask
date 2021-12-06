<template>
  <div class="bg-main text-color-main overflow-hidden">
    <Timer />
    <ToggleThemeButton />
    <TodoList />
  </div>
</template>

<script>
import Timer from './components/Timer/Timer.vue'
import TodoList from './components/TodoList/TodoList.vue'
import ToggleThemeButton from './components/ToggleThemeButton.vue'

export default {
  name: 'App',
  components: {
    Timer,
    TodoList,
    ToggleThemeButton,
  },
}
</script>