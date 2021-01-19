const STORAGE_KEY = 'todos-vuejs'
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) =>
      todo.id = index
    )
    todoStorage.uid = todos.length
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const filters = {
  completed(todos) {
    return todos.filter((todo) =>
      todo.completed)
  }
}

new Vue({
  el: '#app',
  data: {
    todos: [],
    todo: ''
  },
  watch: {
    todos: {
      handler(todos) {
        todoStorage.save(todos)
      },
    }
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {
    addTask() {
      const task = this.$refs.task
      if (task.value == '') {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        task: task.value,
        completed: false
      })
      task.value = ''
    },
    removeTask(todo) {
      const remains = []
      const todos = this.todos
      for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        if (!todo.completed) {
          remains.push(todo);
        }
      }
      this.todos = remains;
    }
  }
})
