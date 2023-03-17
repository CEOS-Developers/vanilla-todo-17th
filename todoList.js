const todoForm = document.getElementById('input-form');
const todoInput = document.querySelector('#input-form input');
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
  const newTodoObject = {
    id: Date.now(),
    text: newTodo,
  };
  todos.push(newTodoObject);
  saveTodos();

  displayNewTodo(newTodoObject);

  todoInput.value = '';
};

todoForm.addEventListener('submit', handleSubmit);
