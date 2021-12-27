<template>
  <div class="bg-main text-color-main overflow-hidden px-2 pb-16 flex flex-col gap-4">
    <Timer />
    <TodoList />
  </div>
</template>

<script>
import Timer from './components/Timer/Timer.vue'
import TodoList from './components/TodoList/TodoList.vue'

export default {
  name: 'App',
  components: {
    Timer,
    TodoList,
  },
}
</script>