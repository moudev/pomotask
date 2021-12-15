<template>
  <div>
    <div>
      <input type="text" placeholder="task" v-model="taskInput" @keydown.enter="addTask" ref="taskInput" />
      <button class="border p-2" @click="addTask">Add</button>  
    </div>  
    <TabNav
      :tabs="tabOptions"
      :currentTab="currentTab"
      @update-current-tab="updateCurrentTab"
    />
    <div v-if="tasksFiltered.length > 0" @drop="drop($event)" @dragover.prevent @dragenter.prevent>
      <div
        v-for="task in tasksFiltered"
        :key="task.id"
        class="border flex justify-around items-center cursor-pointer hover:bg-secondary"
        draggable
        @dragstart="dragstart(task.id)"
        @dragenter="dragenter(task.id)"
      >
        <div class="flex justify-items-center">
          <select :value="task.stateString" @change="toggleTaskState($event, task)">
            <option v-for="tab in tabOptions" :key="tab.name" :value="tab.name">{{ tab.name }}</option>
          </select>
        </div>
        <span>{{ task.text }}</span>
        <div class="flex justify-items-center">
          <button class="border" v-if="!task.completed" @click="editTaskText(task)">
            <Edit />
          </button>
          <button class="border" @click="deleteTask(task)">
            <Delete />
          </button>
          <button class="border">
            <Draggable />
          </button>
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
import Draggable from '~icons/carbon/draggable'
import TabNav from './TabNav.vue'

import { uuid } from './../../utils'
import { tabs } from './tabs'

export default {
  components: {
    Edit,
    Delete,
    Draggable,
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