const todoForm = document.getElementById('inputForm');
const todoInput = document.querySelector('#inputForm input');
const addTodoButton = document.getElementsByClassName('add-button')[0];
const todoLists = document.querySelector('.section-todo .list-container');
const doneLists = document.querySelector('.section-done .list-container');
const numOfTodos = document.getElementById('numOfTodos');
const numOfDones = document.getElementById('numOfDones');

let todos = [];
let doneTodos = [];
const TODOS = 'todos';
const DONETODOS = 'doneTodos';

const displayNum = () => {
  numOfTodos.innerText = todos.length;
  numOfDones.innerText = doneTodos.length;
};

const saveTodos = () => {
  localStorage.setItem(TODOS, JSON.stringify(todos));
};

const saveDoneTodos = () => {
  localStorage.setItem(DONETODOS, JSON.stringify(doneTodos));
};

const removeTodo = (e) => {
  const div = e.target.parentElement;
  const isConfirmed = confirm('이 할 일을 지울까요?');
  if (isConfirmed) {
    div.remove();

    todos = todos.filter((todo) => todo.id != div.id);
    doneTodos = doneTodos.filter((todo) => todo.id != div.id);
    saveTodos();
    saveDoneTodos();
    displayNum();
  } else {
  }
};

const moveToDoneTodo = (e) => {
  const div = e.target.parentElement;
  const isConfirmed = confirm('할 일을 완료하셨나요?');
  if (isConfirmed) {
    const doneTodoObject = {
      id: div.id,
      text: e.target.innerText,
    };

    div.remove();
    displayDoneTodo(doneTodoObject);

    todos = todos.filter((todo) => todo.id != div.id);
    doneTodos = doneTodos.concat(doneTodoObject);
    saveTodos();
    saveDoneTodos();
    displayNum();
  } else {
  }
};

const moveToTodos = (e) => {
  const div = e.target.parentElement;
  const isConfirmed = confirm('할 일 목록으로 옮길까요?');
  if (isConfirmed) {
    const todoObject = {
      id: div.id,
      text: e.target.innerText,
    };

    div.remove();
    displayNewTodo(todoObject);

    doneTodos = doneTodos.filter((todo) => todo.id != div.id);
    todos = todos.concat(todoObject);
    saveTodos();
    saveDoneTodos();
    displayNum();
  } else {
  }
};

const displayNewTodo = (newTodo) => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  const btn = document.createElement('button');
  div.id = newTodo.id;
  span.innerText = newTodo.text;
  btn.innerText = '🗑';
  span.addEventListener('click', moveToDoneTodo);
  btn.addEventListener('click', removeTodo);

  div.append(span, btn);
  todoLists.appendChild(div);
  displayNum();
};

const displayDoneTodo = (doneTodo) => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  const btn = document.createElement('button');
  div.id = doneTodo.id;
  span.innerText = doneTodo.text;
  btn.innerText = '🗑';
  span.addEventListener('click', moveToTodos);
  btn.addEventListener('click', removeTodo);

  div.append(span, btn);
  doneLists.appendChild(div);
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newTodo = todoInput.value;

  if (newTodo.trim()) {
    const newTodoObject = {
      id: Date.now(),
      text: newTodo,
    };

    todos.push(newTodoObject);
    saveTodos();
    displayNewTodo(newTodoObject);
    todoInput.value = '';
    // numOfTodos.innerText = todos.length;
  }
};

todoForm.addEventListener('submit', handleSubmit);
addTodoButton.addEventListener('click', handleSubmit);

// localStorage 저장된 기존 todos, doneTodos display
const localTodos = localStorage.getItem(TODOS);
const localDoneTodos = localStorage.getItem(DONETODOS);

if (localTodos) {
  const savedTodos = JSON.parse(localTodos);
  todos = savedTodos;
  savedTodos.forEach(displayNewTodo);
}
if (localDoneTodos) {
  const savedDoneTodos = JSON.parse(localDoneTodos);
  doneTodos = savedDoneTodos;
  savedDoneTodos.forEach(displayDoneTodo);
}

displayNum();
