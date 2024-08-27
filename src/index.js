import './style.css';

import { Todo } from './todo';
import { Project } from './project';

const newTodo = new Todo(
  'code app',
  'continue with the development of todo app',
  '12-09-2024',
  1
);
const anotherTodo = new Todo(
  'code Odin',
  'complete odin course work',
  '30-09-2024',
  2
);

// default project
const defaultProject = new Project();
console.log('Welcome, add a new todo list');
defaultProject.addTodo = newTodo;
console.log(defaultProject.todos.length);
defaultProject.addTodo = anotherTodo;
console.log(defaultProject.todos.length);
console.log(defaultProject.todos);
// console.log((defaultProject.removeTodo = newTodo));
console.log(defaultProject.todos.length);

// const programming = new Project([newTodo]);
// console.log(programming);
// console.log('Added a new todo to the programming project');

// programming.addTodo = anotherTodo;
// console.log(programming);
