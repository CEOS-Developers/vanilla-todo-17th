const todoForm = document.getElementById('input-form');
const todoInput = document.querySelector('#input-form input');
const todoLists = document.querySelector('.todo-lists div');
const doneLists = document.querySelector('.done-lists div');

let todos = [];

const deleteTodo = (e) => {
  const div = e.target.parentElement;
  div.remove();

  todos = todos.filter((todo) => todo.id != div.id);
  localStorage.setItem('todos', JSON.stringify(todos));
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

const handleSubmit = (e) => {
  e.preventDefault();

  const newTodo = todoInput.value;
  const newTodoObject = {
    id: Date.now(),
    text: newTodo,
  };
  todos.push(newTodoObject);
  localStorage.setItem('todos', JSON.stringify(todos));

  displayNewTodo(newTodoObject);

  todoInput.value = '';
};

todoForm.addEventListener('submit', handleSubmit);
