const todoForm = document.querySelector('.input-box__form');
const todoInput = document.querySelector('.input-box__input');
const todoBtn = document.querySelector('.input-box__btn');

const todoCount = document.querySelector('.todo-box__count');
const todoList = document.querySelector('.todo-box__items');

const doneCount = document.querySelector('.done-box__count');
const doneList = document.querySelector('.done-box__items');

let todoItems = [];
let doneItems = [];

//아이템 수 카운트하는 함수
const countItems = (items, countName) => {
  countName.innerText = `(${items.length})`;
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

//목록 렌더링 함수
const renderList = (items, listName, countName) => {
  listName.innerHTML = ''; //초기화

  items.forEach((item) => {
    const li = document.createElement('li');
    li.id = item.id;
    li.className = 'item-list';

    const itemText = document.createElement('span');
    itemText.innerText = item.text;
    itemText.id = item.id;
    itemText.className = 'item';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';
    deleteBtn.className = 'deletebtn';

    listName.appendChild(li);
    li.appendChild(itemText);
    li.appendChild(deleteBtn);

    itemText.addEventListener('click', toggleTodo);
    deleteBtn.addEventListener('click', deleteTodo);
  });

  countItems(items, countName);
};

//done 목록 렌더링
const renderDoneList = (doneItems) => {
  renderList(doneItems, doneList, doneCount);
};

//to-do 목록 렌더링
const renderTodoList = (todoItems) => {
  renderList(todoItems, todoList, todoCount);
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
