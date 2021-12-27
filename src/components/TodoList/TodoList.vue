<template>
  <div>
    <div class="flex mb-4">
      <input class="border-primary rounded-md w-full mr-2 text-black font-semibold pl-1" type="text" placeholder="Tarea" v-model="taskInput" @keydown.enter="addTask" ref="taskInput" />
      <button class="border-primary py-1 px-2 rounded-md btn" @click="addTask">Agregar</button>
    </div>  
    <TabNav
      :tabs="tabOptions"
      :currentTab="currentTab"
      @update-current-tab="updateCurrentTab"
      class="mb-4"
    />
    <div class="mb-4">
      <h2 class="text-center text-md font-semibold">Tareas</h2>
      <hr>
    </div>
    <div v-if="tasksFiltered.length > 0" @drop="drop($event)" @dragover.prevent @dragenter.prevent>
      <div
        v-for="task in tasksFiltered"
        :key="task.id"
        class="border-primary rounded-md flex flex-col cursor-pointer my-2 p-2"
        draggable
        @dragstart="dragstart(task.id)"
        @dragenter="dragenter(task.id)"
      >
        <div class="leading-none mb-4">
          <span>{{ task.text }}</span>
        </div>
        <div class="flex justify-center">
          <select  class="text-color-secondary rounded-md mr-2 border-primary capitalize" :value="task.stateString" @change="toggleTaskState($event, task)">
            <option v-for="tab in tabOptions" :key="tab.name" :value="tab.name">{{ tab.name }}</option>
          </select>
          <div class="flex justify-items-center">
            <button class="border-primary rounded-md flex items-center p-1 mr-1 btn" v-if="!task.completed" @click="editTaskText(task)">
              <Edit />
            </button>
            <button class="border-primary rounded-md flex items-center p-1 mr-1 btn" @click="deleteTask(task)">
              <Delete />
            </button>
            <button class="border-primary rounded-md flex items-center p-1 btn">
              <Roadmap />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      Sin tareas pendientes
    </div>
  </div>
</template>

<script>
import Edit from '~icons/carbon/edit'
import Delete from '~icons/carbon/delete'
import Roadmap from '~icons/carbon/roadmap'
import TabNav from './TabNav.vue'

import { uuid } from './../../utils'
import { tabs } from './tabs'

export default {
  components: {
    Edit,
    Delete,
    Roadmap,
    TabNav,
  }, 
  data() {
    return {
      taskInput: '',
      tasks: [],
      fromIndex: 0,
      toIndex: 0,
      currentTab: tabs.filter(t => t.isDefaultTab)[0],
      defaultTaskState: tabs.filter(t => t.isDefaultTab)[0],
      TASKS_STORAGE_KEY: 'taks',
      TAB_STORAGE_KEY: 'currentTab',
    }
  },
  methods: {
    toggleTaskState(e, task) {
      const { id } = task
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].stateString = e.target.selectedOptions[0].value
    },
    addTask() {
      if (!this.taskInput) return

      this.tasks.push({
        id: uuid(),
        stateString: this.defaultTaskState.name,
        text: this.taskInput
      })

      this.taskInput = ''
      this.$refs.taskInput.focus()
    },
    editTaskText(task) {
      console.log('edit', task.text)
    },
    deleteTask(task) {
      const { id } = task
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks.splice(index, 1)
    },
    dragstart(taskId) {
      this.fromIndex = this.tasks.findIndex(task => task.id === taskId)
    },
    dragenter(taskId) {
      this.toIndex = this.tasks.findIndex(task => task.id === taskId)
    },
    drop() {
      const taskToAdd = this.tasks.splice(this.fromIndex, 1)[0]
      this.tasks.splice(this.toIndex, 0, taskToAdd)

      this.fromIndex = 0
      this.toIndex = 0
    },
    updateCurrentTab(tab) {
      this.currentTab = tab
    },
    // separate functions to use 'deep: true' in the watcher 'tasks'
    // https://vuejs.org/v2/api/#watch
    getTasksAndTabLocalStorage() {
      const tasksFromLocalStorage = localStorage.getItem(this.TASKS_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(this.TASKS_STORAGE_KEY))
        : []

      const currentTabLocalStorage = localStorage.getItem(this.TAB_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(this.TAB_STORAGE_KEY))
        : this.defaultTaskState

      this.tasks = tasksFromLocalStorage
      this.currentTab = currentTabLocalStorage
    },
    setTasksAndTabLocalStorage() {
      localStorage.setItem(this.TASKS_STORAGE_KEY, JSON.stringify(this.tasks))
      localStorage.setItem(this.TAB_STORAGE_KEY, JSON.stringify(this.currentTab))
    }
  },
  mounted() {
    this.getTasksAndTabLocalStorage()
  },
  computed: {
    tabOptions() {
      return tabs.map(tab => ({
        ...tab,
        count: this.tasks.filter(task => task.stateString === tab.name).length
      }))
    },
    tasksFiltered() {
      return this.tasks.filter(task => task.stateString === this.currentTab.name)
    }
  },
  watch: {
    tasks: {
      handler: 'setTasksAndTabLocalStorage',
      deep: true
    },
    currentTab: {
      handler: 'setTasksAndTabLocalStorage',
    }
  }
}
</script>