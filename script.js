let todoItemsList = []; //todoList, doneList 모두 포함

const createTodoItem = () => {
  const savedTodoList = localStorage.getItem('todoItemsList'); //로컬에서 가져오기

  todoItemsList = JSON.parse(savedTodoList); //문자열을 객체로 변환

  const todoList = document.getElementById('todo-list');
  const doneList = document.getElementById('done-list');

  todoList.innerHTML = ''; //todo 중복 방지 위한 초기화
  doneList.innerHTML = '';

  countTodo(); //todo, done 개수 count 함수

  todoItemsList.forEach((item) => {
    const todoItem = document.createElement('li');

    const todoItemText = document.createElement('span');
    todoItemText.innerText = item.text;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '✖';
    deleteButton.className = 'delete-button';

    todoItem.appendChild(todoItemText);
    todoItem.appendChild(deleteButton);

    if (!item.isDone) {
      //화면에 그려주기
      todoList.appendChild(todoItem);
    } else {
      doneList.appendChild(todoItem);
    }

    todoItemText.addEventListener('click', toggleTodo); //todo 클릭 시 toggle 함수

    deleteButton.addEventListener('click', removeTodo); //x 버튼 클릭 시 todo 삭제 함수
  });
};

const addTodo = (event) => {
  //todo 추가
  event.preventDefault();
  const inputTodo = {
    text: document.getElementById('input-todo').value,
    id: Date.now(),
    isDone: false,
  };

  if (inputTodo.text) {
    todoItemsList = [...todoItemsList, inputTodo];
    document.getElementById('input-todo').value = ''; //입력 창 초기화
    localStorage.setItem('todoItemsList', JSON.stringify(todoItemsList)); //로컬에 저장
    createTodoItem();
  }
};

const removeTodo = (removeitem) => {
  //todo 삭제
  const removedTodoList = todoItemsList.filter(
    (item) => item.text !== removeitem.target.parentNode.innerText.slice(0, -1)
  );
  todoItemsList = Array.from(removedTodoList); //todoItemsList update
  localStorage.setItem('todoItemsList', JSON.stringify(todoItemsList)); //로컬에 저장
  createTodoItem();
};

const countTodo = () => {
  //todo 개수 count
  const countedTodo = document.getElementById('todo-count');
  const countedDone = document.getElementById('done-count');

  countedTodo.innerText = todoItemsList.filter((item) => !item.isDone).length;
  countedDone.innerText = todoItemsList.filter((item) => item.isDone).length;
};

const toggleTodo = (toggleItem) => {
  //todo와 done 서로 toggle
  const toggledTodo = todoItemsList.find(
    (item) => item.text === toggleItem.target.innerText
  );
  toggledTodo.isDone = !toggledTodo.isDone; //isDone 상태 전환
  localStorage.setItem('todoItemsList', JSON.stringify(todoItemsList)); //로컬에 저장
  createTodoItem();
};

window.onload = createTodoItem();
