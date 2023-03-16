const todoForm = document.querySelector('.input-box__form');
const todoInput = document.querySelector('.input-box__input');
const todoBtn = document.querySelector('.input-box__btn');

const todoCount = document.querySelector('.todo-box__count');
const todoList = document.querySelector('.todo-box__items');

const doneCount = document.querySelector('.done-box__count');
const doneList = document.querySelector('.done-box__items');

let todoItems = [];
let doneItems = [];

//to-do 목록에 있는 아이템 카운트
const todoCountItems = (todoItems) => {
  const countNum = todoItems.length;
  todoCount.innerText = `(${countNum})`;
};

//done 목록에 있는 아이템 카운트
const doneCountItems = (doneItems) => {
  const countNum = doneItems.length;
  doneCount.innerText = `(${countNum})`;
};

//to-do 목록과 done 목록 간의 아이템 이동
const toggleTodo = (e) => {
  const todoItemsId = todoItems.map((item) => item.id);

  if (todoItemsId.includes(parseInt(e.target.id))) {
    deleteTodo(e);
    doneItems = [...doneItems, { text: e.target.textContent, id: Date.now() }];
    renderDoneList(doneItems);
  } else {
    deleteTodo(e);
    todoItems = [...todoItems, { text: e.target.textContent, id: Date.now() }];
    renderTodoList(todoItems);
  }
};

//아이템 삭제
const deleteTodo = (e) => {
  const li = e.target.parentElement;
  li.remove();

  todoItems = todoItems.filter(
    (item) => item.id !== parseInt(e.target.parentElement.id)
  );
  doneItems = doneItems.filter(
    (item) => item.id !== parseInt(e.target.parentElement.id)
  );

  renderTodoList(todoItems);
  renderDoneList(doneItems);
};

//done 목록 렌더링
const renderDoneList = (doneItems) => {
  doneList.innerHTML = ''; //초기화

  doneItems.forEach((item) => {
    //console.log(item);

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

    doneText.addEventListener('click', toggleTodo);
    deleteBtn.addEventListener('click', deleteTodo);
  });

  doneCountItems(doneItems);
};

//to-do 목록 렌더링
const renderTodoList = (todoItems) => {
  todoList.innerHTML = ''; //초기화

  todoItems.forEach((item) => {
    //console.log(item);

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

    todoText.addEventListener('click', toggleTodo);
    deleteBtn.addEventListener('click', deleteTodo);
  });

  todoCountItems(todoItems);
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
