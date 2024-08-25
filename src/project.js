export class Project {
  constructor(...todos) {
    this.todos = todos;
  }

  set addTodo(todo) {
    this.todos.push(todo);
  }
  set removeTodo(todo) {
    this.todos.pop(todo);
  }
}
