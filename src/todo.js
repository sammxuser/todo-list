export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }
  set changePriority(priority) {
    this.priority = priority;
  }
  set todoComplete(status = true) {
    this.complete = status;
  }
}
