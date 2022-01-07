<template>
  <div class="bg-main min-h-screen text-color-main overflow-hidden px-2 pb-16 flex flex-col gap-4">
    <Timer />
    <TodoList />
    <a
      class="border flex justify-center items-center mt-16 rounded-full"
      href="https://github.com/moudev/pomotask"
      target="_blank"
    >
      <LogoGithub class="mr-1" />
      Contribuir
    </a>
  </div>
</template>

<script>
import Timer from './components/Timer/Timer.vue'
import TodoList from './components/TodoList/TodoList.vue'
import LogoGithub from '~icons/carbon/logo-github'

export default {
  name: 'App',
  components: {
    Timer,
    TodoList,
    LogoGithub,
  },
}
</script>