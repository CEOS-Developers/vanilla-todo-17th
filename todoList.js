const todoForm = document.getElementById('input-form');
const todoInput = document.querySelector('#input-form input');
const addTodoButton = document.getElementsByClassName('add-button')[0];
const todoLists = document.querySelector('.todo-lists div');
const doneLists = document.querySelector('.done-lists div');

let todos = [];
let doneTodos = [];

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const saveDoneTodos = () => {
  localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
};

const deleteTodo = (e) => {
  const div = e.target.parentElement;
  const doneTodoObject = {
    id: div.id,
    text: e.target.previousElementSibling.innerText,
  };

  div.remove();

  todos = todos.filter((todo) => todo.id != div.id);
  saveTodos();
  doneTodos = doneTodos.concat(doneTodoObject);
  saveDoneTodos();

  displayDoneTodo(doneTodoObject);
};

const deleteDoneTodo = (e) => {
  const div = e.target.parentElement;

  div.remove();

  doneTodos = doneTodos.filter((todo) => todo.id != div.id);
  saveDoneTodos();
};

const displayNewTodo = (newTodo) => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  const btn = document.createElement('button');
  div.id = newTodo.id;
  span.innerText = newTodo.text;
  btn.innerText = '✔';
  btn.addEventListener('click', deleteTodo);

  div.appendChild(span);
  div.appendChild(btn);
  todoLists.appendChild(div);
};

const displayDoneTodo = (doneTodo) => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  const btn = document.createElement('button');
  div.id = doneTodo.id;
  span.innerText = doneTodo.text;
  btn.innerText = '🗑';
  btn.addEventListener('click', deleteDoneTodo);

  div.appendChild(span);
  div.appendChild(btn);
  doneLists.appendChild(div);
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newTodo = todoInput.value;

  if (newTodo.length !== 0) {
    // 입력 없는 경우 처리
    const newTodoObject = {
      id: Date.now(),
      text: newTodo,
    };

    todos.push(newTodoObject);
    saveTodos();
    displayNewTodo(newTodoObject);
    todoInput.value = '';
  }
};

todoForm.addEventListener('submit', handleSubmit);
addTodoButton.addEventListener('click', handleSubmit);

// localStorage 저장된 기존 todos, doneTodos display
const localTodos = localStorage.getItem('todos');
const localDoneTodos = localStorage.getItem('doneTodos');

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
