class Todo {
  constructor(name) {
    this.name = name;
    this.list = [];
  }
  getNewId() {
    return this.list.length + 1;
  }
  getListItem(id) {
    return this.list.filter((item) => item.id === id)[0];
  }
  addListItem(item) {
    this.list.push(item);
  }
  toggleStatus(id) {
    // status 토글 (todo <-> done)
    const updateArray = this.list.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    this.list = updateArray;
  }
  removeItem(id) {
    this.list.filter((item) => item.id !== id);
  }
}

const ENTER = 'Enter';
const ADD_BUTTON = 'add-button';
const UL = 'UL';

const TODO = false;
const DONE = true;

const myTodoList = new Todo('hyosin');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const inputValue = document.getElementById('input');
const addButton = document.getElementById(ADD_BUTTON);

function removeListUI(e) {
  let parentLi = e.target.parentElement;

  if (parentLi.tagName === UL) {
    parentLi = parentLi.firstChild;
  }
  parentLi.remove();
  e.stopPropagation();
}

function createListUI(id) {
  let curList =
    myTodoList.getListItem(id).status === TODO ? todoList : doneList;

  let li = document.createElement('li');
  li.id = id;

  const text = document.createElement('span');
  text.innerText = myTodoList.getListItem(id).value;

  const deleteButton = document.createElement('span');
  deleteButton.innerText = '❎';

  li.addEventListener('click', toggleTodoItem);
  deleteButton.addEventListener('click', removeListUI);

  li.appendChild(deleteButton);
  li.appendChild(text);
  curList.append(li);
}

function handleInput(e) {
  if (e.key === ENTER || e.target.id === ADD_BUTTON) {
    let id = myTodoList.getNewId();
    if (inputValue.value === '') return;
    let newItem = {
      id: id,
      value: inputValue.value,
      status: TODO,
    };
    myTodoList.addListItem(newItem);
    createListUI(id);

    inputValue.value = '';
  }
}
