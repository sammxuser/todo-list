import './style.css';

import { Todo } from './todo';
import { Project } from './project';

// const newTodo = new Todo(
//   'code app',
//   'continue with the development of todo app',
//   '12-09-2024',
//   1
// );

// const anotherTodo = new Todo(
//   'code Odin',
//   'complete odin course work',
//   '30-09-2024',
//   2
// );

// default project
const defaultProject = new Project('General');
// defaultProject.addTodo = newTodo;
// console.log(defaultProject.todos.length);
// defaultProject.addTodo = anotherTodo;
// console.log(defaultProject.todos);
// console.log((defaultProject.removeTodo = newTodo));
// console.log(defaultProject.todos.length);

// const programming = new Project('programming');
// programming.addTodo = anotherTodo;

// const allProjects = [defaultProject, programming];
const allProjects = [defaultProject];
// const anotherProject = new Project('project 2');

// const todo2 = new Todo(
//   'read a book',
//   'Read 5 pages of book A',
//   '30-09-2024',
//   3
// );
// anotherProject.addTodo = todo2;

// allProjects.push(anotherProject);

// allProjects.forEach((project) => {
//   console.log(project.name);
//   for (let i = 0; i < project.todos.length; i++) {
//     console.log(i + 1 + '. ' + project.todos[i].title);
//   }
// });

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
function refreshProjects() {
  // select options for projects
  const select = document.getElementById('project');
  select.value = '';
  select.textContent = '';
  // for (let i = 0; i < allProjects.length; i++) {
  allProjects.forEach((project) => {
    const option = document.createElement('option');
    option.value = project.name;
    option.textContent = project.name;
    select.appendChild(option);
  });
  // }

  const projectList = document.getElementById('projects-list');
  projectList.textContent = '';
  allProjects.forEach((project) => {
    const projectItem = document.createElement('li');
    const todoCount =
      project.todos.length > 0 ? ' [' + `${project.todos.length}` + ']' : '';
    projectItem.textContent = project.name + todoCount;
    projectList.appendChild(projectItem);
  });
}
refreshProjects();

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
    if (project.todos.length !== 0) {
      //skip projects without any todos
      const projectItem = document.createElement('li');
      projectItem.textContent = project.name;
      projectsAndTodos.appendChild(projectItem);
      const todoList = document.createElement('ul');

      for (let i = 0; i < project.todos.length; i++) {
        //     console.log(i + 1 + '. ' + project.todos[i].title);
        const todoItem = document.createElement('li');
        // todoItem.textContent = project.todos[i]['title'];
        todoItem.innerHTML =
          project.todos[i]['title'] +
          '<p>' +
          project.todos[i]['description'] +
          '</p>' +
          '<b>Due date </b>' +
          project.todos[i]['dueDate'] +
          '  <b>Priority </b>' +
          project.todos[i]['priority'];
        todoList.appendChild(todoItem);
      }
      projectItem.appendChild(todoList);
    }
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

  // Reset submitted form
  taskForm.reset();

  // close Modal form
  taskDialog.close();
  refreshTodoList();
  refreshMainPage();
  refreshProjects();
});

function findProject(projectName) {
  return allProjects.find((project) => project.name === projectName);
}

// new project modal
const newProjectBtn = document.getElementById('createProjectBtn');
const projectDialog = document.getElementById('createprojectdialog');
const closeProjectModal = document.getElementById('closeProjectModal');
const newProjectForm = document.getElementById('add-project-form');

newProjectForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const newProjectName = formData.get('project');

  const project = new Project(newProjectName);
  allProjects.push(project);
  newProjectForm.reset();
  projectDialog.close();
  refreshProjects();
});
newProjectBtn.addEventListener('click', () => {
  projectDialog.showModal();
});

closeProjectModal.addEventListener('click', () => {
  projectDialog.close();
});
