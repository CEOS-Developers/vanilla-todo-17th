const todoForm = document.querySelector('.input-box__form');
const todoInput = document.querySelector('.input-box__input');
const todoBtn = document.querySelector('.input-box__btn');

const todoCount = document.querySelector('.todo-box__count');
const todoList = document.querySelector('.todo-box__items');

const doneCount = document.querySelector('.done-box__count');
const doneList = document.querySelector('.done-box__items');

let todoItems = [];
let doneItems = [];

//done 목록 렌더링
const renderDoneList = (doneItems) => {
  doneList.innerHTML = ''; //초기화

  doneItems.forEach((item) => {
    const li = document.createElement('li');
    li.id = item.id;

    const doneText = document.createElement('span');
    doneText.innerText = item.text;
    doneText.id = item.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';

    doneList.appendChild(li);
    li.appendChild(doneText);
    li.appendChild(deleteBtn);
  });
};

//to-do 목록 렌더링
const renderTodoList = (todoItems) => {
  todoList.innerHTML = ''; //초기화

  todoItems.forEach((item) => {
    const li = document.createElement('li');
    li.id = item.id;

    const todoText = document.createElement('span');
    todoText.innerText = item.text;
    todoText.id = item.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';

    todoList.appendChild(li);
    li.appendChild(todoText);
    li.appendChild(deleteBtn);
  });
};

//form 제출해서 to-do 목록에 추가
const addTodo = (e) => {
  e.preventDefault();

  const newTodo = todoInput.value;
  todoInput.value = ''; //초기화
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  todoItems = [...todoItems, newTodoObj];

  renderTodoList(todoItems);
};

const init = () => {
  todoForm.addEventListener('submit', addTodo);
  todoBtn.addEventListener('click', addTodo);
};

init();
