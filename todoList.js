const todoForm = document.getElementById('input-form');
const todoInput = document.querySelector('#input-form input');

let todos = [];

const handleSubmit = (e) => {
  e.preventDefault();

  const newTodo = todoInput.value;
  const newTodoObject = {
    id: Date.now(),
    text: newTodo,
  };
  todos.push(newTodoObject);
  localStorage.setItem('todos', JSON.stringify(todos));

  todoInput.value = '';
};

todoForm.addEventListener('submit', handleSubmit);
