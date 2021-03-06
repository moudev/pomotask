<template>
  <div>
    <div class="flex mb-4">
      <input
        ref="taskInput"
        v-model="taskInput"
        class="border-primary rounded-md w-full mr-2 pl-1 text-black font-semibold"
        type="text"
        placeholder="Tarea"
        @keydown.enter="addTask"
      >
      <button
        class="border-primary btn rounded-md py-1 px-2"
        @click="addTask"
      >
        Agregar
      </button>
    </div>  
    <TabNav
      :tabs="tabOptions"
      :current-tab="currentTab"
      class="mb-4"
      @update-current-tab="updateCurrentTab"
    />
    <div class="mb-4">
      <h2 class="text-center text-md font-semibold">
        Tareas
      </h2>
      <hr>
    </div>
    <div
      v-if="tasksFiltered.length > 0"
      @drop="drop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        v-for="task in tasksFiltered"
        :key="task.id"
        class="border-primary rounded-md my-2 p-2 flex flex-col cursor-pointer"
        draggable
        @dragstart="dragstart(task.id)"
        @dragenter="dragenter(task.id)"
      >
        <div class="leading-none mb-4 flex flex-col">
          <textarea
            v-if="task.edit"
            v-model="task.text"
            class="border-primary rounded-md pl-1 pt-2 h-20 text-black"
          />
          <span v-else>{{ task.text }}</span>
        </div>
        <div class="flex justify-between">
          <select
            class="text-color-secondary border-primary rounded-md mr-2 w-full capitalize"
            :value="task.stateString"
            @change="toggleTaskState($event, task)"
          >
            <option
              v-for="tab in tabOptions"
              :key="tab.name"
              :value="tab.name"
            >
              {{ tab.name }}
            </option>
          </select>
          <div class="flex justify-items-center">
            <button
              class="border-primary btn rounded-md p-1 mr-1 flex items-center"
              @click="task.edit ? toggleEditTaskText(task) : toggleEditTaskText(task)"
            >
              <Save v-if="task.edit" />
              <Edit v-else />
            </button>
            <button
              class="border-primary btn rounded-md p-1 mr-1 flex items-center"
              @click="deleteTask(task)"
            >
              <Delete />
            </button>
            <button class="border-primary btn rounded-md p-1 flex items-center">
              <Roadmap />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="text-center"
    >
      Sin tareas
    </div>
  </div>
</template>

<script>
import Edit from '~icons/carbon/edit'
import Delete from '~icons/carbon/delete'
import Roadmap from '~icons/carbon/roadmap'
import Save from '~icons/carbon/save'
import TabNav from './TabNav.vue'

import { uuid } from './../../utils'
import { tabs } from './tabs'

export default {
  components: {
    Edit,
    Delete,
    Roadmap,
    Save,
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
  },
  mounted() {
    this.getTasksAndTabLocalStorage()
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
        text: this.taskInput,
        edit: false,
      })

      this.taskInput = ''
      this.$refs.taskInput.focus()
    },
    toggleEditTaskText(task) {
      task.edit = !task.edit
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
  }
}
</script>