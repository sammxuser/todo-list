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
const defaultProject = new Project('default');
defaultProject.addTodo = newTodo;
// console.log(defaultProject.todos.length);
defaultProject.addTodo = anotherTodo;
// console.log(defaultProject.todos);
// console.log((defaultProject.removeTodo = newTodo));
// console.log(defaultProject.todos.length);

const programming = new Project('programming');
// programming.addTodo = anotherTodo;

const allProjects = [defaultProject, programming];
const anotherProject = new Project('project 2');

const todo2 = new Todo(
  'read a book',
  'Read 5 pages of book A',
  '30-09-2024',
  3
);
anotherProject.addTodo = todo2;

allProjects.push(anotherProject);

// allProjects.forEach((project) => {
//   console.log(project.name);
//   for (let i = 0; i < project.todos.length; i++) {
//     console.log(i + 1 + '. ' + project.todos[i].title);
//   }
// });

// select options for projects
const select = document.getElementById('project');
// for (let i = 0; i < allProjects.length; i++) {
allProjects.forEach((project) => {
  const option = document.createElement('option');
  option.value = project.name;
  option.textContent = project.name;
  select.appendChild(option);
});
// }

// Modal
const taskButton = document.getElementById('showDialog');
const taskDialog = document.getElementById('createTaskDialog');
const closeModalBtn = document.getElementById('closeModal');

taskButton.addEventListener('click', () => {
  taskDialog.showModal();
});

closeModalBtn.addEventListener('click', () => {
  taskDialog.close();
});

// projects list on the side bar
const projectList = document.getElementById('projects-list');
allProjects.forEach((project) => {
  const projectItem = document.createElement('li');
  projectItem.textContent = project.name;
  projectList.appendChild(projectItem);
});

// todo list
function refreshTodoList() {
  const todoList = document.getElementById('todos-list');
  todoList.textContent = '';
  allProjects.forEach((project) => {
    for (let i = 0; i < project.todos.length; i++) {
      const todoItem = document.createElement('li');
      todoItem.textContent = project.todos[i].title;
      todoList.appendChild(todoItem);
    }
  });
}

refreshTodoList();
// main page project-todos
function refreshMainPage() {
  const projectsAndTodos = document.getElementById('projects-todos');
  projectsAndTodos.textContent = '';
  allProjects.forEach((project) => {
    const projectItem = document.createElement('li');
    projectItem.textContent = project.name;
    projectsAndTodos.appendChild(projectItem);
    const todoList = document.createElement('ul');

    for (let i = 0; i < project.todos.length; i++) {
      //     console.log(i + 1 + '. ' + project.todos[i].title);
      const todoItem = document.createElement('li');
      todoItem.textContent = project.todos[i]['title'];
      todoList.appendChild(todoItem);
    }
    projectItem.appendChild(todoList);
  });
}
refreshMainPage();
// Process form input
const taskForm = document.getElementById('add-task-form');

taskForm.addEventListener('submit', function (event) {
  event.preventDefault(); //Prevent default form submission

  // form data
  const formData = new FormData(this);
  const projectName = formData.get('project');
  const todo = formData.get('todo');
  const details = formData.get('details');
  const dueDate = formData.get('duedate');
  const priority = formData.get('priority');

  const projectInProjects = findProject(projectName);

  const addedTodo = new Todo(todo, details, dueDate, priority);
  if (projectInProjects !== undefined) {
    // if project exists
    projectInProjects.todos.push(addedTodo);
  }
  console.log(programming.todos);

  // Reset submitted form
  taskForm.reset();

  // close Modal form
  taskDialog.close();
  refreshTodoList();
  refreshMainPage();
});

function findProject(projectName) {
  return allProjects.find((project) => project.name === projectName);
}
