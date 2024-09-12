export class Project {
  constructor(name, ...todos) {
    this.name = name;
    this.todos = todos;
  }

  set addTodo(todo) {
    this.todos.push(todo);
  }
  set removeTodo(todo) {
    this.todos.pop(todo);
  }
}
