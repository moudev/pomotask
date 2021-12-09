<template>
  <div>
    <div>
      <input type="text" placeholder="task" v-model="taskInput" />  
      <button class="border p-2" @click="addTask">Add</button>  
    </div>  
    <div v-if="tasks.length > 0">
      <div
        v-for="task in tasks"
        :key="task.id"
        :class="{ 'line-through text-color-secondary': task.completed }"
        class="border flex justify-around items-center cursor-pointer hover:bg-secondary"
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
import { uuid } from './../../utils'

export default {
  components: {
    Checkbox,
    CheckboxCheckedFilled,
    Edit,
    Delete,
  }, 
  data() {
    return {
      taskInput: '',
      tasks: [],
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
      console.log('delete', task.text)
      const { id } = task
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks.splice(index, 1)
    },
  },
}
</script>