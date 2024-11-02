import './style.css';

import { Todo } from './todo';
import { Project } from './project';
import { format } from 'date-fns';
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
let allProjects = [defaultProject];
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

// save objects in localStorage
if (!localStorage.getItem('allProjects')) {
  populateLocalStorage();
} else {
  allProjects = JSON.parse(localStorage.getItem('allProjects'));
}

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

// Edit todo
const editButton = document.getElementById('editBtn');
const editTodoDialog = document.getElementById('editTodoDialog');
const closeEditModalBtn = document.getElementById('closeEditModal');

editButton.addEventListener('click', () => {
  editTodoDialog.showModal();
});

closeEditModalBtn.addEventListener('click', () => {
  editTodoDialog.close();
});

const today = format(new Date(), 'yyyyMMdd');

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
      if (project.todos[i].complete === false) {
        const todoItem = document.createElement('li');
        todoItem.textContent = project.todos[i].title;
        todoList.appendChild(todoItem);
      }
    }
  });
}

refreshTodoList();
// main page project-todos
function refreshMainPage() {
  // const projectsAndTodos = document.getElementById('projects-todos');
  const projectsAndTodos = document.getElementById('todaystodos');
  projectsAndTodos.textContent = '';

  const todaysHeader = document.createElement('h1');
  todaysHeader.textContent = `Today's Todos `;
  projectsAndTodos.appendChild(todaysHeader);

  allProjects.forEach((project) => {
    if (project.todos.length !== 0) {
      //skip projects without any todos
      const projectItem = document.createElement('h3');
      projectItem.textContent = project.name;
      projectsAndTodos.appendChild(projectItem);
      const todoItemDiv = document.createElement('div');
      todoItemDiv.classList.add('todo-item');
      for (let i = 0; i < project.todos.length; i++) {
        // console.log(i + 1 + '. ' + project.todos[i].title);
        // const todoItem = document.createElement('li');
        let tempDueDate = format(project.todos[i]['dueDate'], 'yyyyMMdd');
        if (project.todos[i]['complete'] === false && tempDueDate <= today) {
          //Skip completed and not due today todos on the main page
          const todoItemTitle = document.createElement('h4');
          todoItemTitle.textContent = project.todos[i]['title'];
          todoItemDiv.appendChild(todoItemTitle);

          const todoItemDescription = document.createElement('p');
          todoItemDescription.textContent = project.todos[i]['description'];
          todoItemDiv.appendChild(todoItemDescription);

          const todoItemBottomDiv = document.createElement('div');
          todoItemBottomDiv.classList.add('todo-tem-bottom');
          const itemDueByDiv = document.createElement('div');
          itemDueByDiv.classList.add('item-due-by');

          const itemDueBySpanText = document.createElement('span');
          itemDueBySpanText.textContent = `Due by ${format(
            project.todos[i]['dueDate'],
            'dd-MM-yyyy'
          )}`;
          itemDueByDiv.appendChild(itemDueBySpanText);
          todoItemBottomDiv.appendChild(itemDueByDiv);

          const itemPriorityDiv = document.createElement('div');
          itemPriorityDiv.classList.add('item-priority');

          const itemPriorityText = document.createElement('span');
          itemPriorityText.textContent = `Priority ${project.todos[i]['priority']}`;
          itemPriorityDiv.appendChild(itemPriorityText);
          todoItemBottomDiv.appendChild(itemPriorityDiv);

          const todoActionsDiv = document.createElement('div');
          todoActionsDiv.classList.add('todo-actions');

          const itemEditButton = document.createElement('button');
          itemEditButton.classList.add('edit-todo');
          itemEditButton.textContent = 'Edit';
          itemEditButton.addEventListener('click', () => {
            handleEditTodo(project.todos[i]);
          });
          todoActionsDiv.appendChild(itemEditButton);

          const itemDeleteButton = document.createElement('button');
          itemDeleteButton.classList.add('delete-todo');
          itemDeleteButton.textContent = 'Delete';
          itemDeleteButton.addEventListener('click', () => {
            if (
              confirm(
                `Are you sure you want to delete "${project.todos[i]['title']}" ?`
              )
            ) {
              handleDeleteTodo(project.name, project.todos[i]);
            }
          });
          todoActionsDiv.appendChild(itemDeleteButton);

          const itemCompleteButton = document.createElement('button');
          itemCompleteButton.classList.add('complete-todo');
          itemCompleteButton.textContent = 'Mark Completed';
          // Mark todo as completed
          itemCompleteButton.addEventListener('click', () => {
            handleCompleteTodo(project.todos[i]);
            todoItemTitle.classList.add('todo-completed');
            todoItemDescription.classList.add('todo-completed');
          });
          todoActionsDiv.appendChild(itemCompleteButton);
          todoItemBottomDiv.appendChild(todoActionsDiv);
          todoItemDiv.appendChild(todoItemBottomDiv);

          // const todoItemDescription = document.createElement('p');
          // todoItemDescription.textContent = project.todos[i]['description'];
          // projectsAndTodos.appendChild(todoItemDescription);

          // todoItem.textContent = project.todos[i]['title'];
          // todoItem.innerHTML =
          //   project.todos[i]['title'] +
          //   '<p>' +
          //   project.todos[i]['description'] +
          //   '</p>' +
          //   '<b>Due date </b>' +
          //   project.todos[i]['dueDate'] +
          //   '  <b>Priority </b>' +
          //   project.todos[i]['priority'];
          // todoList.appendChild(todoItem);
          // }
          // projectItem.appendChild(todoList);
          projectsAndTodos.appendChild(todoItemDiv);
        }
      }
    }
  });
  refreshUpcomingTodos();
}
refreshMainPage();

// handle editing a todo task
function handleCompleteTodo(todo) {
  todo.complete = true;
  refreshMainPage();
  refreshTodoList();
  refreshCompletedTodos();
  refreshProjects();
  refreshUpcomingTodos();
  populateLocalStorage();
}
// handle editing a todo task
function handleEditTodo(todo) {
  const todoObject = new Todo(
    todo.title,
    todo.description,
    todo.dueDate,
    todo.priority
  );

  const editTodoForm = document.getElementById('edit-todo-form');
  //editTodoForm['edit-project'].value = projectName; //Bug** need to fix ** Value not populating on the select
  editTodoForm['todo'].value = todoObject.title;
  editTodoForm['details'].value = todoObject.description;
  editTodoForm['duedate'].value = todoObject.dueDate;
  editTodoForm['priority'].value = todoObject.priority;
  editTodoDialog.showModal();

  editTodoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const editFormData = new FormData(this);
    // const EditedprojectName = editFormData.get('project');
    const editedTodo = editFormData.get('todo');
    const editedDetails = editFormData.get('details');
    const editedDueDate = editFormData.get('duedate');
    const editedPriority = editFormData.get('priority');

    const editedTodoObject = new Todo(
      editedTodo,
      editedDetails,
      editedDueDate,
      editedPriority
    );

    todo.title = editedTodoObject.title;
    todo.description = editedTodoObject.description;
    todo.dueDate = editedTodoObject.dueDate;
    todo.priority = editedTodoObject.priority;
    refreshMainPage();
    refreshTodoList();
    refreshCompletedTodos();
    refreshProjects();
    editTodoDialog.close();
    refreshUpcomingTodos();
    populateLocalStorage();
  });
}

// refresh completed todos
function refreshCompletedTodos() {
  const completedTodosDiv = document.getElementById('todo-completed');
  completedTodosDiv.classList.add('todo-completed');
  completedTodosDiv.textContent = '';
  allProjects.forEach((project) => {
    for (let i = 0; i < project.todos.length; i++) {
      if (project.todos[i].complete === true) {
        //show only completed todos
        const todoItem = document.createElement('h4');
        todoItem.textContent = project.todos[i].title;
        const todoDetails = document.createElement('p');
        todoDetails.textContent = project.todos[i].description;
        completedTodosDiv.appendChild(todoItem);
        completedTodosDiv.appendChild(todoDetails);
      }
    }
  });
}
refreshCompletedTodos();
// refresh upcoming todos
function refreshUpcomingTodos() {
  const upcomingTodosDiv = document.getElementById('todo-upcoming');
  // completedTodosDiv.classList.add('todo-');
  upcomingTodosDiv.textContent = '';
  allProjects.forEach((project) => {
    for (let i = 0; i < project.todos.length; i++) {
      if (format(project.todos[i]['dueDate'], 'yyyyMMdd') > today) {
        //show only upcoming todos
        const todoItem = document.createElement('h4');
        todoItem.textContent = project.todos[i].title;
        const todoDetails = document.createElement('p');
        todoDetails.textContent = project.todos[i].description;
        const dueBySpan = document.createElement('span');
        const breakParagraph = document.createElement('br');
        todoDetails.appendChild(breakParagraph);
        dueBySpan.textContent = ` Due by ${format(
          project.todos[i].dueDate,
          'dd-MM-yyyy'
        )}`;
        todoDetails.appendChild(dueBySpan);

        const itemEditSpan = document.createElement('span');
        const itemEditButton = document.createElement('button');
        itemEditButton.classList.add('edit-upcoming-todo');
        itemEditButton.textContent = 'Edit';
        itemEditButton.addEventListener('click', () => {
          handleEditTodo(project.todos[i]);
        });
        itemEditSpan.appendChild(itemEditButton);
        todoDetails.appendChild(itemEditSpan);

        upcomingTodosDiv.appendChild(todoItem);
        upcomingTodosDiv.appendChild(todoDetails);
      }
    }
  });
}

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
  const createFlag = formData.get('createFlag');

  const projectInProjects = findProject(projectName);

  const addedTodo = new Todo(todo, details, dueDate, priority);
  if (projectInProjects !== undefined) {
    // if project exists
    if (createFlag === 'true') {
      projectInProjects.todos.push(addedTodo);
      populateLocalStorage();
    }
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
function handleDeleteTodo(projectName, todo) {
  const projectInProjects = findProject(projectName);
  if (projectInProjects !== undefined) {
    projectInProjects.todos = projectInProjects.todos.filter(
      (item) => item !== todo
    );
  }
  refreshMainPage();
  refreshTodoList();
  refreshCompletedTodos();
  refreshProjects();
  refreshUpcomingTodos();
}

function populateLocalStorage() {
  localStorage.setItem('allProjects', JSON.stringify(allProjects));
}
