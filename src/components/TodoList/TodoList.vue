<template>
  <div>
    <div>
      <input type="text" placeholder="task" v-model="taskInput" />  
      <button class="border p-2" @click="addTask">Add</button>  
    </div>  
    <div v-if="tasks.length > 0" @drop="drop($event)" @dragover.prevent @dragenter.prevent>
      <div
        v-for="(task, taskIndex) in tasks"
        :key="task.id"
        :class="{ 'line-through text-color-secondary': task.completed }"
        class="border flex justify-around items-center cursor-pointer hover:bg-secondary"
        draggable
        @dragstart="dragstart($event, taskIndex)"
        @dragenter="dragenter($event, taskIndex)"
      >
        <div class="flex justify-items-center">
          <CheckboxCheckedFilled v-if="task.completed"/>
          <Checkbox v-else/>
          <input type="checkbox" :checked="task.completed" @click="toggleTaskState(task)" />
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
import Checkbox from '~icons/carbon/checkbox'
import CheckboxCheckedFilled from '~icons/carbon/checkbox-checked-filled'
import Edit from '~icons/carbon/edit'
import Delete from '~icons/carbon/delete'
import Draggable from '~icons/carbon/draggable'
import { uuid } from './../../utils'

export default {
  components: {
    Checkbox,
    CheckboxCheckedFilled,
    Edit,
    Delete,
    Draggable,
  }, 
  data() {
    return {
      taskInput: '',
      tasks: [],
      fromIndex: 0,
      toIndex: 0,
    }
  },
  methods: {
    toggleTaskState(task) {
      const { id } = task
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].completed = !this.tasks[index].completed
    },
    addTask() {
      if (!this.taskInput) return

      this.tasks.push({
        id: uuid(),
        completed: false,
        text: this.taskInput
      })

      this.taskInput = ''
    },
    editTaskText(task) {
      console.log('edit', task.text)
    },
    deleteTask(task) {
      const { id } = task
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks.splice(index, 1)
    },
    dragstart(e, taskIndex) {
      e.dataTransfer.setData("text/plain", taskIndex)
      this.fromIndex = taskIndex
    },
    dragenter(e, taskIndex) {
      this.toIndex = taskIndex
    },
    drop() {
      const taskToAdd = this.tasks.splice(this.fromIndex, 1)[0]
      this.tasks.splice(this.toIndex, 0, taskToAdd)

      this.fromIndex = 0
      this.toIndex = 0
    },
  },
}
</script>