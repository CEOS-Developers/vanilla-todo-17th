const todoInput = document.querySelector('#inputPlan'),
  todoList = document.querySelector('#todoList'),
  doneList = document.querySelector('#doneList'),
  todoCount = document.querySelector('.todoCount'),
  doneCount = document.querySelector('.doneCount');

//enter을 누르면 input 내용이 to do 섹션으로 넘어감
function enterkey() {
  if (window.event.keyCode == 13) {
    click_addBtn();
  }
}

//+버튼 or enter 버튼을 눌렀을 때, todoList섹션에 input내용이 보여짐
function click_addBtn() {
  var input = todoInput.value;
  var addList = document.createElement('li');
  var text = document.createElement('text');
  var button = document.createElement('button');
  var btnText = document.createTextNode('❎');

  button.appendChild(btnText);
  button.className = 'deleteBtn';
  button.addEventListener('click', () => {
    click_deleteBtn(todoList);
  });

  text.innerHTML = input;
  text.addEventListener('click', () => {
    moveDone(text, button);
  });

  addList.append(text, button);
  addList.className = 'addList';

  if (todoInput.value != '') {
    todoList.appendChild(addList);
    todoInput.value = '';
  } else {
    alert('No item!');
  }
}

//todoList섹션에서 text를 누르면 doneList섹션으로 넘어감
function moveDone(text, button) {
  var moveDoneList = document.createElement('li');
  var moveDoneText = document.createElement('text');
  var moveDoneBtn = document.createElement('button');

  moveDoneText = text;
  moveDoneBtn = button;

  moveDoneText.addEventListener('click', () => {
    moveTodo(moveDoneText, moveDoneBtn);
  });
  moveDoneBtn.addEventListener('click', () => {
    click_deleteBtn(doneList);
  });

  moveDoneList.className = 'doneList';
  moveDoneList.append(moveDoneText, moveDoneBtn);
  doneList.appendChild(moveDoneList);
}

//doneList섹션에서 text를 누르면 todoList섹션으로 넘어감
function moveTodo(text, button) {
  var moveAddList = document.createElement('li');
  var moveTodoText = document.createElement('text');
  var moveTodoBtn = document.createElement('button');

  moveTodoText = text;
  moveTodoBtn = button;

  moveTodoText.addEventListener('click', () => {
    moveDone(moveTodoText, moveTodoBtn);
  });
  moveTodoBtn.addEventListener('click', () => {
    click_deleteBtn(todoList);
  });

  moveAddList.className = 'addList';
  moveAddList.append(moveTodoText, moveTodoBtn);
  todoList.appendChild(moveAddList);
}

//text옆 ❎버튼을 누르면 내용 delete
function click_deleteBtn(listName) {
  const list = event.target.parentElement;
  list.remove();
}
